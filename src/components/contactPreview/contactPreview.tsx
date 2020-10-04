import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { useState } from 'react';
import serialize from 'form-serialize';
import gql from 'graphql-tag';
import { v4 as uuid } from 'uuid';
import { User } from '../../types/custom';
import { Avatar } from '../avatar/avatar';
import styles from './contactPreview.module.scss';
import { InPlaceModal } from '../inPlaceModal/inPlaceModal';
import { ButtonSmall } from '../buttons/buttons';
import Unchecked from '../../img/unchecked.svg';
import Checked from '../../img/checkmark.svg';
import { useLogger, useFlash } from '../../hooks';
import { client } from '../../pages/_app';
import { getUser } from '../../graphql/queries';
import { GetUserQuery, UserRole, CreateUserMutation } from '../../API';
import { createUser, createProjectClient } from '../../graphql/mutations';

interface ContactPreviewProps {
  users: User[];
  projectID: string;
  refreshUsers: Function;
}

export const ContactPreview: React.FC<ContactPreviewProps> = ({ users, projectID, refreshUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddPersonModal = (e) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      e.stopPropagation();
      setIsModalOpen(true);
    }
  };

  const closeAddPersonModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={classnames(styles.addPerson)}>
        <span role="button" tabIndex={0} onKeyDown={openAddPersonModal} onClick={openAddPersonModal}>
          <FontAwesomeIcon color="#595959" icon={faUserPlus} />
          <InPlaceModal isOpen={isModalOpen} close={closeAddPersonModal}>
            <ModalContent close={() => setIsModalOpen(false)} projectID={projectID} refreshUsers={refreshUsers} users={users} />
          </InPlaceModal>
        </span>
      </div>
      {users
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((u) => (
          <div key={u.id} className={classnames(styles.contactPreview)}>
            <Avatar email={u.email} />
            <div>
              {u.name}, <span className={classnames(styles.title)}>Creative Director</span>
            </div>
          </div>
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
  close: Function;
  projectID: string;
  refreshUsers: Function;
  users: User[];
}

const ModalContent = ({ close, projectID, refreshUsers, users }) => {
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();
  const { setFlash } = useFlash();

  function validate({ name, email, userType }: ValidationProps) {
    const temp: ValidationProps = {};
    if (!name) temp.name = 'error';
    if (!email) temp.email = 'error';
    if (!userType) temp.userType = 'error';
    return temp;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalids({});
    setSaving(true);

    const { form } = e.target;
    const formData = serialize(form as HTMLFormElement, { hash: true });
    const { name, email, userType } = formData;
    const validation = validate(formData);

    if (Object.keys(validation).length) {
      setInvalids(validation);
      setSaving(false);
      return;
    }

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
    const signedOutAuthToken = existingClient?.signedOutAuthToken || uuid();

    // If there wasn't an existing User record with this email, create one.
    if (!existingClient) {
      const createUserInput = { id: email, name, email, role: UserRole.CLIENT, signedOutAuthToken };
      try {
        const { data }: { data: CreateUserMutation } = await client.mutate({
          mutation: gql(createUser),
          variables: { input: createUserInput },
        });

        existingClient = data.createUser;
      } catch (error) {
        logger.error('HireMeModal: error creating User', { error, input: createUserInput });
        setFlash("Something went wrong. We're looking into it");
        close();
        return;
      }
    }

    if (userType === UserRole.CLIENT && !users.find((u) => u.id === existingClient.id)) {
      // Create the M:M joining record associating a client with a project
      const createProjectClientInput = { clientID: existingClient.id, projectID };
      try {
        await client.mutate({
          mutation: gql(createProjectClient),
          variables: { input: createProjectClientInput },
        });
      } catch (error) {
        logger.error('HireMeModal: error creating ProjectClient', { error, input: createProjectClientInput });
      }
    } else if (userType === UserRole.FREELANCER) {
      // todo: make sure the freelancer isn't already added to this project
      // We're not ready for this. Does the freelancer need an existing account?
      // Create the M:M joining record associating a freelancer with a project
      // const createProjectFreelancerInput = { freelancerID, projectID };
      // try {
      //   await client.mutate({
      //     mutation: gql(createProjectFreelancer),
      //     variables: { input: createProjectFreelancerInput },
      //   });
      // } catch (error) {
      //   logger.error('HireMeModal: error creating ProjectFreelancer', { error, input: createProjectFreelancerInput });
      // }
    }

    refreshUsers();
    close();
  }

  return (
    <form className={classnames(styles.addPersonModal)} onSubmit={(e) => handleSubmit(e)}>
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <div className="control">
          <input name="name" className={classnames('input', { 'is-danger': invalids.name })} type="text" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="title" className="label">
          Title
        </label>
        <div className="control">
          <input name="title" className={classnames('input', { 'is-danger': invalids.title })} type="text" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control">
          <input required name="email" className={classnames('input', { 'is-danger': invalids.email })} type="email" maxLength={48} />
        </div>
      </div>
      <div className={classnames(styles.radioGroup, 'control')}>
        <label className={classnames(styles.radio, 'radio')}>
          <input type="radio" name="userType" value={UserRole.CLIENT} />
          <span className={classnames(styles.checkmarks)}>
            <span className={classnames(styles.unchecked)}>
              <Unchecked />
            </span>
            <span className={classnames(styles.checked)}>
              <Checked />
            </span>
          </span>
          Client&apos;s Team
        </label>
        <label className={classnames(styles.radio, 'radio')}>
          <input type="radio" name="userType" value={UserRole.FREELANCER} disabled />
          <span className={classnames(styles.checkmarks)}>
            <span className={classnames(styles.unchecked)}>
              <Unchecked />
            </span>
            <span className={classnames(styles.checked)}>
              <Checked />
            </span>
          </span>
          My Team
        </label>
      </div>
      <div className={styles.save}>
        <ButtonSmall text="Save" isSaving={isSaving} onClick={handleSubmit} />
      </div>
    </form>
  );
};
