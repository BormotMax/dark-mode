import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { faCheckCircle, faCircle } from '@fortawesome/pro-solid-svg-icons';
import axios from 'axios';

import { ProjectClient, User } from '../../types/custom';
import { Avatar } from '../avatar/avatar';
import { InPlaceModal, InPlaceModalVariants } from '../inPlaceModal';
import { ButtonSmall } from '../buttons/buttons';
import { useLogger, useFlash } from '../../hooks';
import { unauthClient as client } from '../../pages/_app';
import { getUser } from '../../graphql/queries';
import { GetUserQuery, UserRole, CreateUserMutation } from '../../API';
import { createUser, createProjectClient, updateUser } from '../../graphql/mutations';

import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';

interface ContactPreviewProps {
  users: ProjectClient[];
  projectID: string;
  refreshUsers: () => void;
  currentUser: User;
}

export const ContactPreview: React.FC<ContactPreviewProps> = ({ currentUser, users, projectID, refreshUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div className={classnames(modalStyles.addNew)}>
        <InPlaceModal variant={InPlaceModalVariants.BLOCK} button={<FontAwesomeIcon color="#3C78FB" icon={faUserPlus} />}>
          <ModalContent projectID={projectID} refreshUsers={refreshUsers} users={users} currentUser={currentUser} />
        </InPlaceModal>
      </div>
      {users
        .sort((a, b) => a.user.name.localeCompare(b.user.name))
        .map((projectMember) => (
          <InPlaceModal
            variant={InPlaceModalVariants.BLOCK}
            key={projectMember.id}
            button={
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  setSelectedUser(projectMember);
                }}
                onClick={(e) => {
                  setSelectedUser(projectMember);
                }}
                key={projectMember.user.id}
                className={classnames(modalStyles.modalPill)}
              >
                <div className={classnames(modalStyles.icon)}>
                  <Avatar width={32} height={32} email={projectMember.user.email} name={projectMember.user.name} />
                </div>
                <div>
                  {projectMember.user.name}
                  {projectMember.user.title && ', '}
                  <span className={classnames(modalStyles.title)}>{projectMember.user.title}</span>
                </div>
              </div>
            }
          >
            <ModalContent
              projectID={projectID}
              refreshUsers={refreshUsers}
              users={users}
              selectedUser={selectedUser}
              currentUser={currentUser}
            />
          </InPlaceModal>
        ))}
    </>
  );
};

interface ValidationProps {
  name?: string;
  email?: string;
  title?: string;
  userType?: string;
}

interface ModalContentProps {
  projectID: string;
  refreshUsers: () => void;
  users: ProjectClient[];
  selectedUser?: ProjectClient;
  close?: () => void;
  currentUser: User;
}

const ModalContent: React.FC<ModalContentProps> = ({ close, projectID, refreshUsers, users, selectedUser, currentUser }) => {
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const [name, setName] = useState(selectedUser?.user?.name || '');
  const [title, setTitle] = useState(selectedUser?.user.title || '');
  const [email, setEmail] = useState(selectedUser?.user?.email || '');
  const [userType, setUserType] = useState(selectedUser?.user.role || UserRole.CLIENT); // todo: remove CLIENT hardcode

  const isFormValid = useMemo(() => (
    name.trim().length > 0 && title.trim().length > 0 && email.trim().length > 0
  ), [name, title, email]);

  function validate() {
    const temp: ValidationProps = {};
    if (!name) temp.name = 'error';
    if (!email) temp.email = 'error';
    if (!userType) temp.userType = 'error';
    return temp;
  }

  const createProjectMember = async () => {
    if (userType === UserRole.FREELANCER) return; // TODO: handle adding freelancers

    // Check if there is an existing user with this email. The primary (id) key's value is the client's email.
    let getUserResponse;
    const getUserInput = { id: email };
    try {
      getUserResponse = await client.query({
        query: gql(getUser),
        variables: getUserInput,
      });
    } catch (error) {
      logger.error('ContactPreviewModalContent: error while finding existing user', { error, input: { email, input: getUserInput } });
      setFlash("Something went wrong. We're looking into it");
      close();
      return;
    }

    let existingClient: User = (getUserResponse.data as GetUserQuery)?.getUser;

    // todo: if the user is a freelancer
    // - and they have an account, we will find it before this form is submitted
    // make the association with the project, and send the email
    // no need to fill out name or image.
    // - and they don't have an account, send an email. don't create a user object,
    // one will get created when they sign up. Do create an association, but use a
    // field pending email. Then, when they sign up, update the association with their id.

    const signedOutAuthToken = existingClient?.signedOutAuthToken || uuid();

    // If there wasn't an existing User record with this email, create one.
    if (!existingClient) {
      const createUserInput = { id: email, name, email, title, role: UserRole.CLIENT, signedOutAuthToken };
      try {
        const { data }: { data: CreateUserMutation } = await client.mutate({
          mutation: gql(createUser),
          variables: { input: createUserInput },
        });

        existingClient = data.createUser;
      } catch (error) {
        logger.error('ContactPreviewModalContent: error creating User', { error, input: createUserInput });
        setFlash("Something went wrong. We're looking into it");
        close();
        return;
      }
    }

    if (userType === UserRole.CLIENT && !users.map((u) => u.user).find((u) => u.id === existingClient.id)) {
      // Create the M:M joining record associating a client with a project
      const createProjectClientInput = { clientID: existingClient.id, projectID };
      try {
        await client.mutate({
          mutation: gql(createProjectClient),
          variables: { input: createProjectClientInput },
        });
      } catch (error) {
        logger.error('ContactPreviewModalContent: error creating ProjectClient', { error, input: createProjectClientInput });
      }

      const newProjectMemberEmailInput = {
        freelancerEmail: currentUser.email,
        freelancerName: currentUser.name,
        clientEmail: email,
        clientName: name,
        projectUrl: `https://continuum.works/project/${projectID}?token=${signedOutAuthToken}`,
        type: 'NEW_CLIENT_CONTACT_CLIENT',
      };

      try {
        axios.post('/api/sendEmail', newProjectMemberEmailInput);
      } catch (error) {
        logger.error('ContactPreview: error sending email to new project member', { error, input: newProjectMemberEmailInput });
      }
    }
  };

  const updateProjectMember = async () => {
    // only allow updating name, email is the PK
    // can't update name if this is a freelancer (that's done in profile or somewhere else)

    if (selectedUser.user.role === UserRole.CLIENT) {
      const updateUserInput = { id: selectedUser.user.id, name, title };

      try {
        await client.mutate({
          mutation: gql(updateUser),
          variables: { input: updateUserInput },
        });
      } catch (error) {
        logger.error('ContactPreviewModalContent: error updating User', { error, input: updateUserInput });
        setFlash("Something went wrong. We're looking into it");
      }
    }

    // if (selectedUser.user.role === UserRole.CLIENT) {
    //   const updateProjectClientInput = { id: selectedUser.id };
    //   try {
    //     await client.mutate({
    //       mutation: gql(updateProjectClient),
    //       variables: { input: updateProjectClientInput },
    //     });
    //   } catch (error) {
    //     logger.error('ContactPreviewModalContent: error updating ProjectClient', { error, input: updateProjectClientInput });
    //     setFlash("Something went wrong. We're looking into it");
    //   }
    // } else if (selectedUser.user.role === UserRole.FREELANCER) {
    // todo: change this to update association. can only update title
    // const createProjectFreelancerInput = { freelancerID, projectID };
    // try {
    //   await client.mutate({
    //     mutation: gql(createProjectFreelancer),
    //     variables: { input: createProjectFreelancerInput },
    //   });
    // } catch (error) {
    //   logger.error('HireMeModal: error updating ProjectFreelancer', { error, input: createProjectFreelancerInput });
    // }
    // }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalids({});
    setSaving(true);

    const validation = validate();

    if (Object.keys(validation).length) {
      setInvalids(validation);
      setSaving(false);
      return;
    }

    if (selectedUser) {
      await updateProjectMember();
    } else {
      await createProjectMember();
    }

    await refreshUsers();
    close();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <div className="control">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => setName(e.target.value.trim())}
            name="name"
            className={classnames('input', { 'is-danger': invalids.name })}
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="title" className="label">
          Title
        </label>
        <div className="control">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => setTitle(e.target.value.trim())}
            name="title"
            className={classnames('input', { 'is-danger': invalids.title })}
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmail(e.target.value.trim())}
            required
            disabled={!!selectedUser}
            name="email"
            className={classnames('input', { 'is-danger': invalids.email })}
            type="email"
            maxLength={48}
          />
        </div>
      </div>
      <div className={classnames(modalStyles.radioGroup, 'control')}>
        <label className={classnames(modalStyles.radio, 'radio', { [modalStyles.disabledCheckmarks]: !!selectedUser })}>
          <input
            disabled={!!selectedUser}
            onChange={(e) => setUserType(UserRole[e.target.value])}
            type="radio"
            value={UserRole.CLIENT}
            checked={userType === UserRole.CLIENT}
            name="userType"
          />
          <span className={classnames(modalStyles.checkmarks)}>
            <span className={classnames(modalStyles.unchecked)}>
              <FontAwesomeIcon color="#E0E0E0" icon={faCircle} />
            </span>
            <span className={classnames(modalStyles.checked)}>
              <FontAwesomeIcon color="#3C78FB" icon={faCheckCircle} />
            </span>
          </span>
          <div>Client&apos;s Team</div>
        </label>
        <label className={classnames(modalStyles.radio, 'radio', modalStyles.disabledCheckmarks)}>
          <input
            disabled
            onChange={(e) => setUserType(UserRole[e.target.value])}
            type="radio"
            value={UserRole.FREELANCER}
            checked={userType === UserRole.FREELANCER}
            name="userType"
          />
          <span className={classnames(modalStyles.checkmarks)}>
            <span className={classnames(modalStyles.unchecked)}>
              <FontAwesomeIcon color="#E0E0E0" icon={faCircle} />
            </span>
            <span className={classnames(modalStyles.checked)}>
              <FontAwesomeIcon color="#3C78FB" icon={faCheckCircle} />
            </span>
          </span>
          My Team
        </label>
      </div>
      <div className={modalStyles.save}>
        <ButtonSmall text="Save" isSaving={isSaving} disabled={!isFormValid} />
      </div>
    </form>
  );
};
