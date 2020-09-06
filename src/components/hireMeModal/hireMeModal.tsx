import classnames from 'classnames';
import { useState } from 'react';
import axios from 'axios';
import serialize from 'form-serialize';
import gql from 'graphql-tag';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import styles from './hireMeModal.module.scss';
import { Comment } from '../comment';
import { OvalButtonSmall } from '../buttons/buttons';
import { UserRole, GetUserQuery } from '../../API';
import { createUser, createProject } from '../../graphql/mutations';
import { unauthClient as client } from '../../pages/_app';
import { getUser } from '../../graphql/queries';
import { User } from '../../types/custom';
import { useCurrentUser } from '../../hooks';

interface HireMeModalFormProps {
  handleClose: Function;
  freelancerEmail: string;
  freelancerID: string;
  setFlash: Function;
  setDelayedFlash: Function;
  freelancerName: string;
}

interface ValidationProps {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  details?: string;
}

const HireMeModalForm: React.FC<HireMeModalFormProps> = ({
  handleClose,
  freelancerEmail,
  freelancerName,
  freelancerID,
  setFlash,
  setDelayedFlash,
}) => {
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  function validate({ name, company, email, phone, details }: ValidationProps) {
    const temp: ValidationProps = {};

    if (!name) temp.name = 'error';
    if (!company) temp.company = 'error';
    if (!email) temp.email = 'error';
    if (!phone) temp.phone = 'error';
    if (!details) temp.details = 'error';

    return temp;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setInvalids({});

    if (currentUser?.attributes?.sub === freelancerID) {
      setFlash("You can't contact yourself. Please log out first.");
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

    try {
      const getUserResponse = await client.query({
        query: gql(getUser),
        variables: { id: email },
      });

      const existingClient: User = (getUserResponse.data as GetUserQuery)?.getUser;
      const signedOutAuthToken = existingClient?.signedOutAuthToken || uuid();

      if (!existingClient) {
        await client.mutate({
          mutation: gql(createUser),
          variables: { input: { id: email, name, company, email, phone, role: UserRole.CLIENT, signedOutAuthToken } },
        });
      }

      const createProjectResponse = await client.mutate({
        mutation: gql(createProject),
        variables: { input: { freelancerID, clientID: email, details } },
      });

      // await axios.post('/api/sendEmail', {
      //   to: freelancerEmail,
      //   name,
      //   company,
      //   email,
      //   phone,
      //   details,
      // });

      setDelayedFlash(`Thank you! ${freelancerName} will get back to you shortly.`);

      router
        .push(`/project/[id]?token=${signedOutAuthToken}`, `/project/${createProjectResponse.data.createProject.id}`, { shallow: true })
        .then(() => window.scrollTo(0, 0));
    } catch (err) {
      console.log(err);
      setFlash(err.message);
      setSaving(false);
    }
  }

  return (
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
                <input required name="email" className={classnames('input', { 'is-danger': invalids.email })} type="email" maxLength={48} />
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
        <OvalButtonSmall text="Reply" isSaving={isSaving} onClick={handleSubmit} />
      </div>
    </form>
  );
};

const commentContent = 'Thank you for your interest in the work I do. Please tell me a bit more about yourself and your project. Thanks!';

interface HireMeModalProps {
  freelancerName: string;
  freelancerEmail: string;
  freelancerID: string;
  avatarUrl?: string;
  handleClose: Function;
  setFlash: Function;
  setDelayedFlash: Function;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({
  freelancerName,
  freelancerEmail,
  freelancerID,
  avatarUrl,
  handleClose,
  setFlash,
  setDelayedFlash,
}) => (
  <div className={styles.hireMeModal}>
    <img src="/wave.png" alt="hello" />
    <h1 className="h1 vat">Hello There!</h1>
    <Comment isMine={false} name={freelancerName} avatarUrl={avatarUrl}>
      <div>{commentContent}</div>
    </Comment>
    <Comment>
      <HireMeModalForm
        freelancerEmail={freelancerEmail}
        freelancerID={freelancerID}
        handleClose={handleClose}
        freelancerName={freelancerName}
        setFlash={setFlash}
        setDelayedFlash={setDelayedFlash}
      />
    </Comment>
  </div>
);
