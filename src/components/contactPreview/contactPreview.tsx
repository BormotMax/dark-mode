import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { faCircleCheck, faCircle } from '@fortawesome/pro-solid-svg-icons';
import axios from 'axios';
import Storage from '@aws-amplify/storage';
import { useQuery, gql } from '@apollo/client';
import { ApolloQueryResult } from '@apollo/client/core/types';
import Modal from '../modal';

import { ProjectClient, ProjectFreelancer, User } from '../../types/custom';
import { Avatar } from '../avatar/avatar';
import { InPlaceModal, InPlaceModalVariants } from '../inPlaceModal';
import { ButtonSmall } from '../buttons/buttons';
import { AvatarUpload } from '../avatarUpload';
import { useLogger, useFlash, useDebounce, useAsync } from '../../hooks';
import { unauthClient as client } from '../../pages/_app';
import { listUsers, usersByEmail } from '../../graphql/queries';
import { UserRole, CreateUserMutation, UsersByEmailQuery, ListUsersQuery, DeleteProjectClientInput } from '../../API';
import { createUser, createProjectClient, createProjectFreelancer, updateUser, deleteProjectClient } from '../../graphql/mutations';
import { Protected } from '../protected/protected';
import { isClickOrEnter, getDatasetValue } from '../../helpers/util';
import { Features } from '../../permissions';
import { createOrUpdateAvatar } from '../../helpers/s3';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import Button from '../button';

import styles from './contactPreview.module.scss';
import { DeletePersonModal } from './deletePersonModal';

interface ContactPreviewProps {
  users: [ProjectClient | ProjectFreelancer];
  projectID: string;
  refreshUsers: () => Promise<void>;
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
            addUser={true}
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
              addUser={false}
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
  refreshUsers: () => Promise<void>;
  users: [ProjectClient | ProjectFreelancer];
  selectedUser?: ProjectClient | ProjectFreelancer;
  close?: () => void;
  currentUser: User;
  addUser?: boolean;
}

const ModalContent: React.FC<ModalContentProps> = ({
  close,
  projectID,
  refreshUsers,
  users,
  selectedUser,
  currentUser,
  addUser,
}) => {
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const widthModalWindow = '399px';
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const [selectedSuggestedUser, setSelectedSuggestedUser] = useState<User>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: selectedUser?.user?.name || '',
    email: selectedUser?.user?.email || '',
    title: selectedUser?.user?.title || '',
  });
  const [newClientAvatar, setNewClientAvatar] = useState<File>(null);
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

  const switchDeleteModal = (isOpen: boolean) => {
    setOpenDeleteModal(isOpen);
  };

  const onBlurInput = useCallback((event: React.FocusEvent<HTMLInputElement>): void => {
    const { target: { name, value } = {} } = event;

    const anchor = getDatasetValue(event.relatedTarget, 'anchor');
    if (anchor !== 'suggestedUser') {
      setIsVisible(false);
    }

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  }, []);

  const onSuggestionUserClick = (user) => (event: React.MouseEvent<EventTarget> | React.KeyboardEvent<EventTarget>) => {
    if (!isClickOrEnter(event)) return;
    setSelectedSuggestedUser(user);
    setFormValues((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || '',
      title: user?.title || '',
      ...(selectedUser ? {} : { userType: user?.role || UserRole.CLIENT }),
    }));
    setIsVisible(false);
  };

  const debouncedSearchTerm = useDebounce(formValues.name, 600);

  const { data: listUsersResponse } = useQuery<ListUsersQuery>(
    gql(listUsers),
    {
      skip: !debouncedSearchTerm,
      variables: { filter: { name: { contains: debouncedSearchTerm } } },
      onError(error) {
        logger.error('ContactPreviewModalContent: error while finding users by name', { error });
        setFlash("Something went wrong. We're looking into it");
      },
    },
  );
  const suggestedUsers = useMemo(
    () => listUsersResponse?.listUsers.items || [],
    [listUsersResponse],
  );

  useEffect(
    () => {
      const foundedUserAlreadySelected = suggestedUsers.length === 1
        && suggestedUsers[0]?.email === formValues?.email;

      if (!foundedUserAlreadySelected) {
        setIsVisible(suggestedUsers.length > 0);
      }
    },
    [suggestedUsers, formValues],
  );

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

  const createProjectMember = async () => {
    // Check if there is an existing user with this email. The primary (id) key's value is the client's email.
    let getUserResponse: ApolloQueryResult<UsersByEmailQuery>;
    const getUserInput = { email: formValues.email };

    try {
      getUserResponse = await client.query<UsersByEmailQuery>({
        query: gql(usersByEmail),
        variables: getUserInput,
      });
    } catch (error) {
      logger.error('ContactPreviewModalContent: error while finding existing user', { error, input: getUserInput });
      setFlash("Something went wrong. We're looking into it");
      close();
      return;
    }

    let existingClient = getUserResponse.data.usersByEmail?.items
      ?.filter((user) => user.role === userType)?.[0];
    const signedOutAuthToken = existingClient?.signedOutAuthToken || uuid();

    // If there wasn't an existing User record with this email, create one. (Client only)
    if (!existingClient && userType === UserRole.CLIENT) {
      const avatarS3Key = selectedUser?.user?.avatar?.key ?? '';
      let avatar = { key: avatarS3Key, tag: 'avatar' };

      // update avatar
      if (newClientAvatar) {
        avatar = await createOrUpdateAvatar({
          key: avatarS3Key,
          name: newClientAvatar.name,
          file: newClientAvatar,
          page: 'ContactPreview',
          logger,
        });
      }

      const createUserInput = {
        id: formValues.email,
        name: formValues.name,
        email: formValues.email,
        avatar,
        title: formValues.title,
        role: UserRole.CLIENT,
        signedOutAuthToken,
      };
      try {
        const { data } = await client.mutate<CreateUserMutation>({
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
      ? `https://continuum.works/projects/${projectID}?token=${signedOutAuthToken}`
      : `https://continuum.works/projects/${projectID}`;

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
      await axios.post('/api/sendEmail', newProjectMemberEmailInput);
    } catch (error) {
      logger.error('ContactPreview: error sending email to new project member', { error, input: newProjectMemberEmailInput });
    }
  };

  const deleteProjectMember = async () => {
    setOpenDeleteModal(false);
    close();

    const deleteUserInput: DeleteProjectClientInput = { id: selectedUser.id };
    try {
      await client.mutate({
        mutation: gql(deleteProjectClient),
        variables: { input: deleteUserInput },
      });
      await refreshUsers();
    } catch (error) {
      logger.error('ContactPreviewModalContent: error deleting User', { error, input: deleteUserInput });
      setFlash("Something went wrong. We're looking into it");
    }
  };

  const updateProjectMember = async () => {
    // only allow updating name, email is the PK
    // can't update name if this is a freelancer (that's done in profile or somewhere else)

    const avatarS3Key = selectedUser?.user?.avatar?.key ?? '';
    let avatar = { key: avatarS3Key, tag: 'avatar' };

    // update avatar
    if (newClientAvatar) {
      avatar = await createOrUpdateAvatar({
        key: avatarS3Key,
        name: newClientAvatar.name,
        file: newClientAvatar,
        page: 'ContactPreview',
        logger,
      });
    }

    const updateUserInput = {
      id: selectedUser?.user?.id,
      name: formValues.name,
      avatar,
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

  const { value: userAvatar } = useAsync(
    async () => {
      const avatarS3key = selectedSuggestedUser?.avatar?.key;
      if (!avatarS3key) {
        return '';
      }
      try {
        const s3Image = await Storage.get(avatarS3key);
        if (typeof s3Image === 'string') {
          return s3Image;
        }
        return '';
      } catch (error) {
        logger.error('HirePageEditor: error retrieving s3 image.', { error, input: avatarS3key });
        return '';
      }
    },
    [selectedSuggestedUser, logger],
  );

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className={modalStyles.avatarContainer}>
        {userType === UserRole.CLIENT && (
          <AvatarUpload
            avatarName="avatar"
            onChange={setNewClientAvatar}
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
                  data-anchor="suggestedUser"
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
        <div className={classnames(styles.nameInputContainer, 'control')}>
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
        <div className={classnames(styles.nameInputContainer, 'control')}>
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
              <FontAwesomeIcon color="#3C78FB" icon={faCircleCheck} />
            </span>
          </span>
          <div>Client&apos;s Team</div>
        </label>
        <Protected feature={Features.CheckRoleFreelancer}>
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
                <FontAwesomeIcon color="#3C78FB" icon={faCircleCheck} />
              </span>
            </span>
            My Team
          </label>
        </Protected>
      </div>
      {
        addUser
          ?
            <div className={modalStyles.save}>
              <ButtonSmall text="Save" isSaving={isSaving} disabled={!isFormValid} />
            </div>
          :
            <div className={modalStyles.change}>
              <Button
                icon={<FontAwesomeIcon color="white" icon={faTrash} />}
                onClick={() => switchDeleteModal(true)}
                className={styles.deleteButton}
              >
                Delete
              </Button>
              <Button
                isLoading={isSaving}
                disabled={!isFormValid}
                type="submit"
                inverted
              >
                Save
              </Button>
            </div>
      }
    </form>
      <Modal
        isOpen={openDeleteModal}
        closeModal={() => switchDeleteModal(false)}
        maxWidth={widthModalWindow}
      >
        <DeletePersonModal
          closeModal={() => switchDeleteModal(false)}
          deletePerson={deleteProjectMember}
          userName={selectedUser ? selectedUser.user.name : ''}
        />
      </Modal>
    </>
  );
};
