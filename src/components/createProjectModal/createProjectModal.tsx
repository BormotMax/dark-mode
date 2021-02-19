import React, { memo, useState } from 'react';
import classnames from 'classnames';
import { useMutation, gql, ApolloQueryResult } from '@apollo/client';

import {
  ProjectsByFreelancerQuery,
  CreateProjectMutation,
  CreateProjectFreelancerMutation,
} from '../../API';
import { ButtonSmall } from '../buttons/buttons';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import { useCurrentUser, useLogger, useFlash, useMountedState } from '../../hooks';
import {
  createProject as createProjectMutation,
  createProjectFreelancer as createProjectFreelancerMutation,
} from '../../graphql/mutations';

interface CreateProjectModalProps {
  close?: () => void;
  refetchData: () => Promise<ApolloQueryResult<ProjectsByFreelancerQuery>>;
}

interface ValidationProps {
  title?: string;
  details?: string;
  company?: string;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = memo(({ close, refetchData }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [company, setCompany] = useState('');
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});

  const { currentUser } = useCurrentUser();
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const getIsMounted = useMountedState();

  function validate() {
    const temp: ValidationProps = {};

    if (!title.trim()) temp.title = 'error';
    if (!details.trim()) temp.details = 'error';

    return temp;
  }

  const freelancerID = currentUser.attributes.sub;
  const createProjectInput = {
    company: company.trim(),
    owner: freelancerID,
    title: title.trim(),
    details: details.trim(),
  };
  const [createProject, { data: createdProject }] = useMutation<CreateProjectMutation>(
    gql(createProjectMutation),
    {
      variables: { input: createProjectInput },
      onError: (error) => {
        logger.error(
          'CreateProjectModal: error creating Project',
          { error, input: createProjectInput },
        );
      },
    },
  );

  const projectID = createdProject?.createProject?.id;
  const createProjectFreelancerInput = { freelancerID, projectID, isInitialContact: true };
  const [createProjectFreelancer] = useMutation<CreateProjectFreelancerMutation>(
    gql(createProjectFreelancerMutation),
    {
      variables: { input: createProjectFreelancerInput },
      onError: (error) => {
        logger.error(
          'CreateProjectModal: error creating ProjectFreelancer',
          { error, input: createProjectFreelancerInput },
        );
      },
    },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setInvalids({});
    setSaving(true);

    const validation = validate();

    if (Object.keys(validation).length > 0) {
      setInvalids(validation);
      setSaving(false);
      return;
    }

    try {
      await createProject();
      await createProjectFreelancer();
      await refetchData();
    } catch {
      setFlash("Something went wrong. We're looking into it");
    } finally {
      if (getIsMounted()) {
        setSaving(false);
      }
      close();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title" className="label">
          Project Title
        </label>
        <div className="control">
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTitle(title.trim())}
            name="title"
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
            onBlur={() => setDetails(details.trim())}
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
            onBlur={() => setCompany(company.trim())}
            required
            name="company"
            className={classnames('input', { 'is-danger': invalids.company })}
            type="text"
            maxLength={48}
          />
        </div>
      </div>
      <div className={modalStyles.save}>
        <ButtonSmall text="Save" isSaving={isSaving} />
      </div>
    </form>
  );
});

CreateProjectModal.displayName = 'CreateProjectModal';
