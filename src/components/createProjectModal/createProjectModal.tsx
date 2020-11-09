import React, { useState } from 'react';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { ButtonSmall } from '../buttons/buttons';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import { client } from '../../pages/_app';
import { useCurrentUser, useLogger, useFlash } from '../../hooks';
import { createProject, createProjectFreelancer } from '../../graphql/mutations';

interface CreateProjectModalProps {
  close?: Function;
  refetchData: Function;
}

interface ValidationProps {
  title?: string;
  details?: string;
  company?: string;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ close, refetchData }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [company, setCompany] = useState('');
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { currentUser } = useCurrentUser();
  const { logger } = useLogger();
  const { setFlash } = useFlash();

  function validate() {
    const temp: ValidationProps = {};

    if (!title) temp.title = 'error';
    if (!details) temp.details = 'error';

    return temp;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalids({});
    setSaving(true);

    const validation = validate();

    if (Object.keys(validation).length) {
      setInvalids(validation);
      setSaving(false);
      return;
    }

    // Create a project
    let createProjectResponse;
    const freelancerID = currentUser.attributes.sub;
    const createProjectInput = { company, owner: freelancerID, title, details };
    try {
      createProjectResponse = await client.mutate({
        mutation: gql(createProject),
        variables: { input: createProjectInput },
      });
    } catch (error) {
      logger.error('CreateProjectModal: error creating Project', { error, input: createProjectInput });
      setFlash("Something went wrong. We're looking into it");
      close();
      return;
    }

    // Create the M:M joining record associating a freelancer with a project
    const projectID = createProjectResponse.data.createProject.id;
    const createProjectFreelancerInput = { freelancerID, projectID, isInitialContact: true };
    try {
      await client.mutate({
        mutation: gql(createProjectFreelancer),
        variables: { input: createProjectFreelancerInput },
      });
    } catch (error) {
      logger.error('CreateProjectModal: error creating ProjectFreelancer', { error, input: createProjectFreelancerInput });
      setFlash("Something went wrong. We're looking into it");
    }

    close();
    refetchData();
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
            className={classnames('textarea', { 'is-danger': invalids.details })}
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
