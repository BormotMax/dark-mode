import classnames from 'classnames';
import { useState } from 'react';
import axios from 'axios';
import serialize from 'form-serialize';
import gql from 'graphql-tag';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import styles from './hireMeModal.module.scss';
import { Comment } from '../comment';
import { ButtonSmall } from '../buttons/buttons';
import { UserRole, GetUserQuery, CreateUserMutation } from '../../API';
import { createUser, createProject, createComment, createProjectClient, createProjectFreelancer } from '../../graphql/mutations';
import { unauthClient as client } from '../../pages/_app';
import { getUser } from '../../graphql/queries';
import { User } from '../../types/custom';
import { useCurrentUser, useLogger, useFlash } from '../../hooks';

const commentContent = 'Thank you for your interest in the work I do. Please tell me a bit more about yourself and your project. Thanks!';

interface HireMeModalProps {
  freelancerName: string;
  freelancerEmail: string;
  freelancerID: string;
  avatarUrl?: string;
  handleClose: Function;
}

interface ValidationProps {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  details?: string;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({ freelancerEmail, freelancerName, freelancerID, avatarUrl }) => {
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { logger } = useLogger();
  const { setFlash, setDelayedFlash } = useFlash();

  function validate({ name, email, phone, details }: ValidationProps) {
    const temp: ValidationProps = {};

    if (!name) temp.name = 'error';
    if (!email) temp.email = 'error';
    if (!phone) temp.phone = 'error';
    if (!details) temp.details = 'error';

    return temp;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalids({});

    if (currentUser?.attributes?.sub) {
      setFlash("You can't contact a freelancer while signed in as a freelancer.");
      return;
    }

    setSaving(true);
    const { form } = e.target;
    const formData = serialize(form as HTMLFormElement, { hash: true });
    const { name, company, email, phone, details } = formData;
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
      logger.error('HireMeModal: error ', { error, input: { email, input: getUserInput } });
      setFlash("Something went wrong. We're looking into it");
      setSaving(false);
      return;
    }

    let existingClient: User = (getUserResponse.data as GetUserQuery)?.getUser;
    const signedOutAuthToken = existingClient?.signedOutAuthToken || uuid();

    // If there wasn't an existing User record with this email, create one.
    if (!existingClient) {
      const createUserInput = { id: email, name, company, email, phone, role: UserRole.CLIENT, signedOutAuthToken };
      try {
        const { data }: { data: CreateUserMutation } = await client.mutate({
          mutation: gql(createUser),
          variables: { input: createUserInput },
        });

        existingClient = data.createUser;
      } catch (error) {
        logger.error('HireMeModal: error creating User', { error, input: createUserInput });
        setFlash("Something went wrong. We're looking into it");
        setSaving(false);
        return;
      }
    }

    // Create a project
    let createProjectResponse;
    const createProjectInput = { company, owner: freelancerID };
    try {
      createProjectResponse = await client.mutate({
        mutation: gql(createProject),
        variables: { input: createProjectInput },
      });
    } catch (error) {
      logger.error('HireMeModal: error creating Project', { error, input: createProjectInput });
      setFlash("Something went wrong. We're looking into it");
      setSaving(false);
      return;
    }

    const projectID = createProjectResponse.data.createProject.id;
    const createCommentInput = { projectID, content: details, creatorID: existingClient.id };
    try {
      // Create a comment from the text in the details input. The same text is also stored in project.details
      await client.mutate({
        mutation: gql(createComment),
        variables: { input: createCommentInput },
      });
    } catch (error) {
      logger.error('HireMeModal: error creating Comment', { error, input: createCommentInput });
    }

    // Create the M:M joining record associating a client with a project
    const createProjectClientInput = { clientID: existingClient.id, projectID, isInitialContact: true };
    try {
      await client.mutate({
        mutation: gql(createProjectClient),
        variables: { input: createProjectClientInput },
      });
    } catch (error) {
      logger.error('HireMeModal: error creating ProjectClient', { error, input: createProjectClientInput });
    }

    // Create the M:M joining record associating a freelancer with a project
    const createProjectFreelancerInput = { freelancerID, projectID, isInitialContact: true };
    try {
      await client.mutate({
        mutation: gql(createProjectFreelancer),
        variables: { input: createProjectFreelancerInput },
      });
    } catch (error) {
      logger.error('HireMeModal: error creating ProjectFreelancer', { error, input: createProjectFreelancerInput });
    }

    const freelancerEmailInput = {
      freelancerEmail,
      freelancerName,
      clientName: name,
      clientEmail: existingClient.email,
      projectUrl: `https://continuum.works/project/${projectID}`,
      type: 'NEW_CLIENT_CONTACT_FREELANCER',
    };

    try {
      await axios.post('/api/sendEmail', freelancerEmailInput);
    } catch (error) {
      logger.error('HireMeModal: error sending email to freelancer', { error, input: freelancerEmailInput });
    }

    const clientEmailInput = {
      freelancerEmail,
      clientEmail: existingClient.email,
      clientName: name,
      projectUrl: `https://continuum.works/project/${projectID}?token=${signedOutAuthToken}`,
      type: 'NEW_CLIENT_CONTACT_CLIENT',
    };

    try {
      await axios.post('/api/sendEmail', clientEmailInput);
    } catch (error) {
      logger.error('HireMeModal: error sending email to client', { error, input: clientEmailInput });
    }

    setDelayedFlash(`Thank you! ${freelancerName} will get back to you shortly.`);
    router.push(`/project/[id]?token=${signedOutAuthToken}`, `/project/${projectID}`, { shallow: true }).then(() => window.scrollTo(0, 0));
  }

  return (
    <div className={styles.hireMeModal}>
      <img src="/wave.png" alt="hello" />
      <h1 className="h1 vat">Hello There!</h1>
      <Comment isMine={false} name={freelancerName} avatarUrl={avatarUrl} backgroundColor="#ffffff" commentColor="#F5F8FF">
        <div>{commentContent}</div>
      </Comment>
      <Comment backgroundColor="#ffffff" commentColor="#FAF8F7">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                  <div className="control">
                    <input name="name" className={classnames('input', { 'is-danger': invalids.name })} type="text" maxLength={48} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="company" className="label">
                    Company
                  </label>
                  <div className="control">
                    <input name="company" className={classnames('input', { 'is-danger': invalids.company })} type="text" maxLength={48} />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <div className="control">
                    <input
                      required
                      name="email"
                      className={classnames('input', { 'is-danger': invalids.email })}
                      type="email"
                      maxLength={48}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="phone" className="label">
                    Phone #
                  </label>
                  <div className="control">
                    <input name="phone" className={classnames('input', { 'is-danger': invalids.phone })} type="tel" />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="details" className="label">
                Project Details
              </label>
              <div className="control">
                <textarea name="details" maxLength={800} rows={6} className={classnames('textarea', { 'is-danger': invalids.details })} />
              </div>
            </div>
          </div>
          <div className={styles.reply}>
            <ButtonSmall text="Reply" isSaving={isSaving} onClick={handleSubmit} />
          </div>
        </form>
      </Comment>
    </div>
  );
};
