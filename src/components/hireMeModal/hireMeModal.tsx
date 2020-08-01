import classnames from 'classnames';
import { useState } from 'react';
import axios from 'axios';
import serialize from 'form-serialize';
import styles from './hireMeModal.module.scss';
import { Comment } from '../comment';
import { OvalButtonSmall } from '../buttons/buttons';

interface HireMeModalFormProps {
  handleClose: Function;
  freelancerEmail: string;
}

interface ValidationProps {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  details?: string;
}

const HireMeModalForm: React.FC<HireMeModalFormProps> = ({ handleClose, freelancerEmail }) => {
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});

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
    setSaving(true);
    setInvalids({});
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
      await axios.post('/api/sendEmail', {
        to: freelancerEmail,
        name,
        company,
        email,
        phone,
        details,
      });

      form.reset();
      handleClose();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={classnames('text-1')}>
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
  avatarUrl?: string;
  handleClose: Function;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({ freelancerName, freelancerEmail, avatarUrl, handleClose }) => (
  <div className={styles.hireMeModal}>
    <div className="header-2-lg">Hello There!</div>
    <Comment isMine={false} name={freelancerName} avatarUrl={avatarUrl}>
      <div>{commentContent}</div>
    </Comment>
    <Comment>
      <HireMeModalForm freelancerEmail={freelancerEmail} handleClose={handleClose} />
    </Comment>
  </div>
);
