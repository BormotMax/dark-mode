import React, { useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useQuery, gql } from '@apollo/client';

import { ModelSortDirection, ProjectsByFreelancerQuery } from '../API';
import { projectsByFreelancer, listProjectFreelancers } from '../graphql/queries';
import { useFlash, useLogger } from '../hooks';
import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { AuthProps, Project, ProjectFreelancer } from '../types/custom';
import { PageLayoutOne } from '../components/pageLayoutOne';
import { Page } from '../components/nav/nav';
import { ButtonSmall } from '../components/buttons/buttons';
import { InPlaceModal } from '../components/inPlaceModal';
import { CreateProjectModal } from '../components/createProjectModal';
import { updateProjectFreelancer } from '../graphql/mutations';

import { client } from './_app';
import styles from './styles/projects.module.scss';

const ProjectsPage: React.FC<AuthProps> = ({ currentUser }) => {
  const { setFlash } = useFlash();
  const { logger } = useLogger();
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
      return fetchedProjects?.map((projectMeta) => projectMeta.project) || [];
    },
    [projectsByFreelancerData],
  );

  // update all project freelancer associations for current user
  const updateProjectFreelancerAssociation = async () => {
    try {
      const projectsList = await client.query({ query: gql(listProjectFreelancers) });

      const freelancers = (projectsList?.data)?.listProjectFreelancers?.items as ProjectFreelancer[];
      const pendingEmailFreelancers = freelancers.filter((f) => f.pendingEmail === currentUserEmail);

      if (!pendingEmailFreelancers.length) return;

      let updateProjectFreelancerInput;
      try {
        await Promise.all(pendingEmailFreelancers.map((projectFreelancer) => {
          updateProjectFreelancerInput = { id: projectFreelancer.id, freelancerID: currentUserId, pendingEmail: null };
          return client.mutate({
            mutation: gql(updateProjectFreelancer),
            variables: { input: updateProjectFreelancerInput },
          });
        }));
      } catch (error) {
        logger.error('ProjectFreelancerUpdate: error retrieving Project.', { error, input: updateProjectFreelancerInput });
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

  const haveNoProjects = !loading && !projects.length;

  return (
    <PageLayoutOne
      page={Page.PROJECTS}
      headerText="All Projects"
      headerContainer={styles.headerWidth}
      headerButton={
        <InPlaceModal button={<ButtonSmall text="New Project" />}>
          <CreateProjectModal refetchData={refetchProjects} />
        </InPlaceModal>
      }
    >
      <div className={classnames('column', styles.projects)}>
        {haveNoProjects ? (
          <div>You don&apos;t have any projects yet.</div>
        ) : (
          <>
            {projects.filter(Boolean).map((p: Project) => (
              <Link key={p.id} href="/project/[id]" as={`/project/${p.id}`}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  <div className={styles.comment}>
                    <div className={styles.header}>
                      {/* todo: click to change title */}
                      <div>{p.title || p.clients.items.find((i) => i.isInitialContact)?.user.name || 'Title'}</div>
                    </div>
                    <div className={styles.commentContent}>{p.details || 'New Project'}</div>
                  </div>
                </a>
              </Link>
            ))}
          </>
        )}
      </div>
    </PageLayoutOne>
  );
};

export default WithAuthentication(
  memo(ProjectsPage),
  { routeType: RouteType.SIGNED_IN, allowedRoles: [Role.FREELANCER] },
);
