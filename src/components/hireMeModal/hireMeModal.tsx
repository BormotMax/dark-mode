import classnames from 'classnames';
import { useState } from 'react';
import styles from './hireMeModal.module.scss';
import { Comment } from '../comment';
import { OvalButtonSmall } from '../buttons/buttons';

const HireMeModalForm = () => {
  const [isSaving, setSaving] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaving(false);
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
                <input name="name" className="input" type="text" maxLength={48} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="company" className="label">
                Company
              </label>
              <div className="control">
                <input name="company" className="input" type="text" maxLength={48} />
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
                <input name="email" className="input" type="text" maxLength={48} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="phone" className="label">
                Phone #
              </label>
              <div className="control">
                <input name="email" className="input" type="phone" />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label htmlFor="details" className="label">
            Project Details
          </label>
          <div className="control">
            <textarea name="details" maxLength={800} rows={6} className="textarea" />
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
  avatarUrl?: string;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({ freelancerName, avatarUrl }) => (
  <div className={styles.hireMeModal}>
    <div className="header-2-lg">Hello There!</div>
    <Comment isMine={false} name={freelancerName} avatarUrl={avatarUrl}>
      <div>{commentContent}</div>
    </Comment>
    <Comment>
      <HireMeModalForm />
    </Comment>
  </div>
);
