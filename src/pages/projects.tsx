import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useQuery, gql } from '@apollo/client';
import { faCirclePlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePopper } from 'react-popper';

import { ListProjectFreelancersQuery, ModelSortDirection, ProjectsByFreelancerQuery } from '../API';
import { projectsByFreelancer, listProjectFreelancers } from '../graphql/queries';
import { useFlash, useLogger } from '../hooks';
import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { AuthProps, Page } from '../types/custom';
import PageLayout from '../components/pageLayout';
import CreateProjectModal from '../components/createProjectModal';
import { updateProjectFreelancer } from '../graphql/mutations';
import { getProjectTitle } from '../helpers/util';
import Button from '../components/button';
import Modal from '../components/modal';

import { client } from './_app';
import styles from './styles/projects.module.scss';

const ProjectsPage: React.FC<AuthProps> = ({ currentUser }) => {
  const { setFlash } = useFlash();
  const { logger } = useLogger();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const referenceElementRef = useRef<HTMLButtonElement>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElementRef.current,
    popperElement,
    {
      placement: 'bottom-end',
      modifiers: [{
        name: 'offset',
        options: { offset: [0, 17] },
      }],
    },
  );

  const currentUserId = currentUser?.attributes?.sub;
  const currentUserEmail = currentUser?.attributes?.email;

  const getProjectsVariables = {
    freelancerID: currentUser.attributes.sub,
    sortDirection: ModelSortDirection.DESC,
  };

  const {
    data: projectsByFreelancerData,
    refetch: refetchProjects,
    loading = true,
  } = useQuery<ProjectsByFreelancerQuery>(
    gql(projectsByFreelancer),
    {
      variables: getProjectsVariables,
      onError: (error) => {
        setFlash("There was an error retrieving your projects. We're looking into it");
        logger.error('Projects: error retrieving projects', {
          error,
          input: getProjectsVariables,
        });
      },
    },
  );
  const projects = useMemo(
    () => {
      const { items: fetchedProjects } = projectsByFreelancerData?.projectsByFreelancer ?? {};
      if (Array.isArray(fetchedProjects)) {
        return fetchedProjects.map((projectMeta) => projectMeta.project).filter(Boolean);
      }
      return [];
    },
    [projectsByFreelancerData],
  );

  // update all project freelancer associations for current user
  const updateProjectFreelancerAssociation = async () => {
    try {
      const projectsList = await client.query<ListProjectFreelancersQuery>({ query: gql(listProjectFreelancers) });
      const freelancers = projectsList?.data?.listProjectFreelancers?.items;
      const pendingEmailFreelancers = freelancers.filter((f) => f.pendingEmail === currentUserEmail);

      if (!pendingEmailFreelancers.length) return;

      const updateProjectFreelancerInput = {
        id: null,
        freelancerID: currentUserId,
        pendingEmail: null,
      };
      try {
        await Promise.all(pendingEmailFreelancers.map((projectFreelancer) => {
          updateProjectFreelancerInput.id = projectFreelancer.id;
          return client.mutate({
            mutation: gql(updateProjectFreelancer),
            variables: { input: updateProjectFreelancerInput },
          });
        }));
      } catch (error) {
        logger.error('ProjectFreelancerUpdate: error retrieving Project.', {
          error,
          input: updateProjectFreelancerInput,
        });
      }
    } catch (error) {
      logger.error('ProjectFreelancer: error retrieving Project.', { error, input: '' });
    }
  };

  useEffect(() => {
    const execute = async () => {
      await updateProjectFreelancerAssociation();
    };
    execute();
  }, []);

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const haveNoProjects = !loading && !projects.length;

  return (
    <PageLayout page={Page.PROJECTS}>
      <div className={styles.projects}>
        <div className={styles.createProjectButton}>
          <Button
            ref={referenceElementRef}
            onClick={openModal}
            height={40}
            color="black"
            icon={(
              <FontAwesomeIcon
                icon={faCirclePlus}
                fontSize="18px"
                color="black"
              />
            )}
          >
            New Project
          </Button>
          <Modal
            closeOnBackdropClick={false}
            closeModal={closeModal}
            isOpen={modalIsOpen}
            ref={setPopperElement}
            popperStyles={popperStyles.popper}
            popperAttributes={attributes.popper}
          >
            <CreateProjectModal closeModal={closeModal} refetchData={refetchProjects} />
          </Modal>
        </div>
        {haveNoProjects ? (
          <div className={classnames(styles.projectCardRoot, styles.noProjectsPlug)}>You have no projects</div>
        ) : (
          <div className={styles.projectsList}>
            {projects.map((project) => (
              <Link key={project.id} href="/projects/[id]" as={`/projects/${project.id}`}>
                <a>
                  <div className={classnames(styles.projectCardRoot, styles.projectCard)}>
                    <div className={styles.title}>
                      {getProjectTitle(project)}
                    </div>
                    <div className={styles.details}>{project.details || 'New Project'}</div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default WithAuthentication(
  React.memo(ProjectsPage),
  {
    routeType: RouteType.SIGNED_IN,
    allowedRoles: [Role.FREELANCER],
  },
);
