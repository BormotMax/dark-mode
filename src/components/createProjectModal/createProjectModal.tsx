import React, { memo, useState } from 'react';
import { useMutation, gql, ApolloQueryResult } from '@apollo/client';

import {
  ProjectsByFreelancerQuery,
  CreateProjectMutation,
  CreateProjectFreelancerMutation,
} from '../../API';
import { useCurrentUser, useLogger, useFlash } from '../../hooks';
import {
  createProject as createProjectMutation,
  createProjectFreelancer as createProjectFreelancerMutation,
} from '../../graphql/mutations';
import { Input, TextArea } from '../input';
import Button from '../button';
import { isClickOrEnter } from '../../helpers/util';
import { MouseOrKeyboardEvent } from '../../types/custom';

import styles from './createProjectModal.module.scss';

type CreateProjectModalProps = {
  refetchData: () => Promise<ApolloQueryResult<ProjectsByFreelancerQuery>>,
  closeModal: () => void,
};

type ValidationProps = {
  title?: string,
  details?: string,
  company?: string,
};

type Inputs = {
  title: string,
  details: string,
  company: string,
};

enum InputNames {
  TITLE = 'title',
  DETAILS = 'details',
  COMPANY = 'company',
}

const CreateProjectModal = ({ refetchData, closeModal }: CreateProjectModalProps): JSX.Element => {
  const [values, setValues] = useState<Inputs>({
    title: '',
    details: '',
    company: '',
  });
  const [isSaving, setSaving] = useState(false);
  const [invalids, setInvalids] = useState<ValidationProps>({});

  const { currentUser } = useCurrentUser();
  const { logger } = useLogger();
  const { setFlash } = useFlash();

  const { title, details, company } = values;

  function validate() {
    const temp: ValidationProps = {};

    if (!title.trim()) temp.title = 'error';
    if (!details.trim()) temp.details = 'error';
    if (!company.trim()) temp.company = 'error';

    return temp;
  }

  const freelancerID = currentUser?.attributes?.sub;
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

    const validation = validate();

    if (Object.keys(validation).length > 0) {
      setInvalids(validation);
      setSaving(false);
      return;
    }

    try {
      setSaving(true);
      await createProject();
      await createProjectFreelancer();
      await refetchData();
    } catch {
      setFlash("Something went wrong. We're looking into it");
    } finally {
      closeModal();
      setSaving(false);
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };
  const onBlurInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value.trim() }));
  };
  const onClickCancel = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    closeModal();
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.title}>New Project</div>
      <Input
        placeholder="e.g. UX/UI for iOS app"
        label="Name"
        value={title}
        onChange={onChangeInput}
        onBlur={onBlurInput}
        name={InputNames.TITLE}
        isInvalid={Boolean(invalids.title)}
        type="text"
      />
      <TextArea
        height={96}
        placeholder="description"
        label="Project Description"
        value={details}
        onChange={onChangeInput}
        onBlur={onBlurInput}
        name={InputNames.DETAILS}
        isInvalid={Boolean(invalids.details)}
        type="text"
      />
      <Input
        placeholder="company name"
        label="Company"
        value={company}
        onChange={onChangeInput}
        onBlur={onBlurInput}
        name={InputNames.COMPANY}
        isInvalid={Boolean(invalids.company)}
        type="text"
        maxLength={48}
      />
      <div className={styles.control}>
        <Button onClick={onClickCancel}>Cancel</Button>
        <Button type="submit" inverted isLoading={isSaving}>Save</Button>
      </div>
    </form>
  );
};

export default memo(CreateProjectModal);
