import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { faCheckCircle, faCircle } from '@fortawesome/pro-solid-svg-icons';
import axios from 'axios';
import { Storage } from 'aws-amplify';

import { ProjectClient, ProjectFreelancer, User } from '../../types/custom';
import { Avatar } from '../avatar/avatar';
import { InPlaceModal, InPlaceModalVariants } from '../inPlaceModal';
import { ButtonSmall } from '../buttons/buttons';
import { AvatarUpload } from '../avatarUpload';
import { useLogger, useFlash, useDebounce } from '../../hooks';
import { unauthClient as client } from '../../pages/_app';
import { listUsers, usersByEmail } from '../../graphql/queries';
import { UserRole, CreateUserMutation, UsersByEmailQuery, ListUsersQuery } from '../../API';
import { createUser, createProjectClient, createProjectFreelancer, updateUser } from '../../graphql/mutations';
import { Role } from '../withAuthentication';
import { Protected } from '../protected/protected';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';

import styles from './contactPreview.module.scss';

interface ContactPreviewProps {
  users: [ProjectClient | ProjectFreelancer];
  projectID: string;
  refreshUsers: () => void;
  currentUser: User;
}

export const ContactPreview: React.FC<ContactPreviewProps> = ({
  currentUser,
  users: usersProp,
  projectID,
  refreshUsers,
}) => {
  // filter users for non-registered freelancers association
  const users = useMemo(() => usersProp.filter((item) => Boolean(item.user)), [usersProp]);
  const sortedProjectMembers = useMemo(() => users.sort(
    (a, b) => a?.user?.name?.localeCompare(b?.user?.name),
  ), [users]);
  const [selectedUser, setSelectedUser] = useState(null);

  const onSelectUser = (projectMember: ProjectClient | ProjectFreelancer) => () => {
    setSelectedUser(projectMember);
  };

  return (
    <>
      <div className={classnames(modalStyles.addNew)}>
        <InPlaceModal variant={InPlaceModalVariants.BLOCK} button={<FontAwesomeIcon color="#3C78FB" icon={faUserPlus} />}>
          <ModalContent
            projectID={projectID}
            refreshUsers={refreshUsers}
            users={users as [ProjectClient | ProjectFreelancer]}
            currentUser={currentUser}
          />
        </InPlaceModal>
      </div>
      <div className={styles.membersWrapper}>
        {sortedProjectMembers.map((projectMember) => (
          <InPlaceModal
            variant={InPlaceModalVariants.FIXED_PLACED}
            key={projectMember.id}
            button={
              <div
                role="button"
                tabIndex={0}
                onKeyDown={onSelectUser(projectMember)}
                onClick={onSelectUser(projectMember)}
                key={projectMember.user.id}
                className={classnames(modalStyles.modalPill, styles.memberPill)}
              >
                <div className={classnames(modalStyles.icon)}>
                  <Avatar
                    width={32}
                    height={32}
                    s3key={projectMember.user?.avatar?.key ?? ''}
                    email={projectMember.user.email}
                    name={projectMember.user.name}
                  />
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
              users={users as [ProjectClient | ProjectFreelancer]}
              selectedUser={selectedUser}
              currentUser={currentUser}
            />
          </InPlaceModal>
        ))}
      </div>
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
  users: [ProjectClient | ProjectFreelancer];
  selectedUser?: ProjectClient | ProjectFreelancer;
  close?: () => void;
  currentUser: User;
}

const ModalContent: React.FC<ModalContentProps> = ({
  close,
  projectID,
  refreshUsers,
  users,
  selectedUser,
  currentUser,
}) => {
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const [userAvatar, setUserAvatar] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: selectedUser?.user?.name,
    email: selectedUser?.user?.email,
    title: selectedUser?.user?.title,
  });
  const [fileInputValues, setFileInputValues] = useState(null);
  const [userType, setUserType] = useState(selectedUser?.user?.role || UserRole.CLIENT); // todo: remove CLIENT hardcode

  const onChangeUserType = useCallback((event) => {
    if (selectedUser) return;
    setUserType(UserRole[event.target.value]);
  }, [selectedUser]);

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { name, value } = {} } = event;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onBlurInput = useCallback((event: React.FocusEvent<HTMLInputElement>): void => {
    const { target: { name, value } = {} } = event;
    if (name === 'name') {
      setIsVisible(false);
    }
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  }, []);

  const onSuggestionUserClick = (user) => (e) => {
    if (e.key && e.key !== 'Enter') {
      return;
    }
    setFormValues((prevState) => ({
      ...prevState,
      name: user?.name,
      email: user?.email,
      title: user?.title,
      ...(selectedUser ? {} : { userType: user?.role || UserRole.CLIENT }),
    }));
    setIsVisible(false);
  };

  const debouncedSearchTerm = useDebounce(formValues.name, 600);

  const loadUsersList = async (value) => {
    let usersListResponse;
    const input = { filter: { name: { contains: value } } };
    try {
      usersListResponse = await client.query({
        query: gql(listUsers),
        variables: input,
      });
    } catch (error) {
      logger.error('ContactPreviewModalContent: error while finding users by name', { error });
      setFlash("Something went wrong. We're looking into it");
    }
    const foundedUsers = (usersListResponse?.data as ListUsersQuery)?.listUsers?.items ?? [];
    setSuggestedUsers(foundedUsers);
    setTimeout(() => {
      setIsVisible(foundedUsers.length > 0);
    }, 100);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      loadUsersList(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleChangeUserName = (event) => {
    const { value } = event.target;
    setFormValues((prevState) => ({ ...prevState, name: value }));
    setIsVisible(value.length > 0);
  };

  const isFormValid = useMemo(() => (
    formValues?.name?.trim()?.length > 0 && formValues?.title?.trim()?.length > 0 && formValues?.email?.trim()?.length > 0
  ), [formValues.name, formValues.title, formValues.email]);

  function validate() {
    const temp: ValidationProps = {};
    if (!formValues.name) temp.name = 'error';
    if (!formValues.email) temp.email = 'error';
    if (!userType) temp.userType = 'error';
    return temp;
  }

  const createOrUpdateAvatar = async () => {
    const key = selectedUser?.user?.avatar?.key ?? '';
    let updateAvatar = { key, tag: 'avatar' };
    if (fileInputValues) {
      if (key) {
        try {
          await Storage.remove(key);
        } catch (error) {
          logger.error('ContactPreviewModalContent: error deleting user avatar from s3', { error, input: key });
        }
      }

      const s3Key = `${uuid()}${fileInputValues.name}`;

      try {
        await Storage.put(s3Key, fileInputValues);
      } catch (error) {
        logger.error('ContactPreviewModalContent: error adding user avatar to s3', { error, input: s3Key });
      }
      updateAvatar = { ...updateAvatar, key: s3Key };
    }
    return updateAvatar;
  };

  const createProjectMember = async () => {
    // Check if there is an existing user with this email. The primary (id) key's value is the client's email.
    let getUserResponse;
    const getUserInput = { email: formValues.email };
    try {
      getUserResponse = await client.query({
        query: gql(usersByEmail),
        variables: getUserInput,
      });
    } catch (error) {
      logger.error('ContactPreviewModalContent: error while finding existing user', { error, input: getUserInput });
      setFlash("Something went wrong. We're looking into it");
      close();
      return;
    }

    let existingClient = (getUserResponse.data as UsersByEmailQuery)?.usersByEmail.items.filter((u) => u.role === userType)?.[0];

    const signedOutAuthToken = existingClient?.signedOutAuthToken || uuid();

    // If there wasn't an existing User record with this email, create one. (Client only)
    if (!existingClient && userType === UserRole.CLIENT) {
      const createAvatar = await createOrUpdateAvatar();
      const createUserInput = {
        id: formValues.email,
        name: formValues.name,
        email: formValues.email,
        avatar: createAvatar,
        title: formValues.title,
        role: UserRole.CLIENT,
        signedOutAuthToken,
      };
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

    let existingConnection = false;

    if (userType === UserRole.CLIENT) {
      existingConnection = !!users.find((u) => (u as ProjectClient).clientID === existingClient.id);
    } else if (userType === UserRole.FREELANCER) {
      existingConnection = !!users.find((u) => (u as ProjectFreelancer).pendingEmail === formValues.email);
    }

    if (existingConnection) {
      return;
    }

    // Create the M:M joining record associating a client or freelancer with a project
    const projectMutation = userType === UserRole.CLIENT ? createProjectClient : createProjectFreelancer;
    const createProjectConnectionInput = {
      [userType === UserRole.CLIENT ? 'clientID' : 'freelancerID']: existingClient ? existingClient.id : uuid(),
      ...(userType === UserRole.FREELANCER && !existingClient && { pendingEmail: formValues.email }),
      projectID,
    };

    try {
      await client.mutate({
        mutation: gql(projectMutation),
        variables: { input: createProjectConnectionInput },
      });
    } catch (error) {
      logger.error(
        `ContactPreviewModalContent: error creating Project${userType === UserRole.CLIENT ? 'Client' : 'Freelancer'}`,
        { error, input: createProjectConnectionInput },
      );
    }

    const projectUrl = userType === UserRole.CLIENT
      ? `https://continuum.works/project/${projectID}?token=${signedOutAuthToken}`
      : `https://continuum.works/project/${projectID}`;

    const newProjectMemberEmailInput = {
      freelancerEmail: currentUser.email,
      freelancerName: currentUser.name,
      clientEmail: formValues.email,
      clientName: formValues.name,
      projectUrl,
      type: 'NEW_CLIENT_CONTACT_CLIENT',
    };

    try {
      setFlash("We've sent an invitation to this project space.");
      axios.post('/api/sendEmail', newProjectMemberEmailInput);
    } catch (error) {
      logger.error('ContactPreview: error sending email to new project member', { error, input: newProjectMemberEmailInput });
    }
  };

  const updateProjectMember = async () => {
    // only allow updating name, email is the PK
    // can't update name if this is a freelancer (that's done in profile or somewhere else)

    const updateAvatar = await createOrUpdateAvatar();

    const updateUserInput = {
      id: selectedUser?.user?.id,
      name: formValues.name,
      avatar: updateAvatar,
      title: formValues.title,
    };

    try {
      await client.mutate({
        mutation: gql(updateUser),
        variables: { input: updateUserInput },
      });
    } catch (error) {
      logger.error('ContactPreviewModalContent: error updating User', { error, input: updateUserInput });
      setFlash("Something went wrong. We're looking into it");
    }
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

  useEffect(() => {
    if (selectedUser?.user?.avatar?.key) {
      const { key } = selectedUser?.user?.avatar;
      try {
        Storage.get(key).then((image: string) => {
          setUserAvatar(image);
        });
      } catch (error) {
        logger.error('HirePageEditor: error retrieving s3 image.', { error, input: key });
      }
    }
  }, [selectedUser]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={modalStyles.avatarContainer}>
        {userType === UserRole.CLIENT && (
          <AvatarUpload
            avatarName="avatar"
            onChange={setFileInputValues}
            image={userAvatar}
          />
        )}
      </div>
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <div className={classnames(styles.nameInputContainer, 'control')}>
          <input
            required
            value={formValues.name}
            onChange={handleChangeUserName}
            onBlur={onBlurInput}
            name="name"
            className={classnames('input', { 'is-danger': invalids.name })}
            type="text"
          />
          {isVisible && (
            <div className={styles.autoSuggestContainer}>
              {suggestedUsers.map((user) => (
                <div
                  tabIndex={0}
                  key={user.id}
                  role="button"
                  onClick={onSuggestionUserClick(user)}
                  onKeyDown={onSuggestionUserClick(user)}
                  className={styles.autoSuggestItem}
                >
                  <Avatar email={user.email} s3key={user.avatar?.key} width={24} height={24} className={styles.avatar} />
                  {user.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="title" className="label">
          Title
        </label>
        <div className="control">
          <input
            value={formValues.title}
            onChange={onChangeInput}
            onBlur={onBlurInput}
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
            value={formValues.email}
            onChange={onChangeInput}
            onBlur={onBlurInput}
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
            onChange={onChangeUserType}
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
        <Protected roles={[Role.FREELANCER]}>
          <label className={classnames(modalStyles.radio, 'radio', { [modalStyles.disabledCheckmarks]: !!selectedUser })}>
            <input
              disabled={!!selectedUser}
              onChange={onChangeUserType}
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
        </Protected>
      </div>
      <div className={modalStyles.save}>
        <ButtonSmall text="Save" isSaving={isSaving} disabled={!isFormValid} />
      </div>
    </form>
  );
};
