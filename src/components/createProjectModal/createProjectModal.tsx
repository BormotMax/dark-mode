import React, { useState } from 'react';
import classnames from 'classnames';
import { ButtonSmall } from '../buttons/buttons';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';

interface CreateProjectModalProps {}

interface ValidationProps {
  title?: string;
  details?: string;
  company?: string;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [company, setCompany] = useState('');
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});

  function validate() {
    const temp: ValidationProps = {};

    if (!title) temp.title = 'error';
    if (!details) temp.details = 'error';

    return temp;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvalids({});
    setSaving(true);

    const validation = validate();

    if (Object.keys(validation).length) {
      setInvalids(validation);
      setSaving(false);
      return;
    }

    // todo: create a new project
    console.log(title, details, company);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="field">
        <label htmlFor="title" className="label">
          Project Title
        </label>
        <div className="control">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="name"
            className={classnames('input', { 'is-danger': invalids.title })}
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="details" className="label">
          Project Description
        </label>
        <div className="control">
          <textarea
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            name="details"
            className={classnames('input', { 'is-danger': invalids.details }, 'textarea')}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="company" className="label">
          Company
        </label>
        <div className="control">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            name="company"
            className={classnames('input', { 'is-danger': invalids.company })}
            type="text"
            maxLength={48}
          />
        </div>
      </div>
      <div className={modalStyles.save}>
        <ButtonSmall text="Save" isSaving={isSaving} onClick={handleSubmit} />
      </div>
    </form>
  );
};
