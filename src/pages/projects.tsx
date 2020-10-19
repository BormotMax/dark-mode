import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import classnames from 'classnames';
import { client } from './_app';
import { ProjectsByFreelancerQuery } from '../API';
import { projectsByFreelancer } from '../graphql/queries';
import { useFlash, useLogger } from '../hooks';
import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { AuthProps, Project } from '../types/custom';
import { PageLayoutOne } from '../components/pageLayoutOne';
import { Comment } from '../components/comment';
import { gravatarUrl } from '../helpers/gravatarUrl';
import styles from './styles/projects.module.scss';
import { Page } from '../components/nav/nav';
import { ButtonSmall } from '../components/buttons/buttons';
import { InPlaceModal } from '../components/inPlaceModal';
import { CreateProjectModal } from '../components/createProjectModal';

const ProjectsPage: React.FC<AuthProps> = ({ currentUser }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setFlash } = useFlash();
  const { logger } = useLogger();

  useEffect(() => {
    const execute = async () => {
      const projectsByFreelancerInput = { freelancerID: currentUser.attributes.sub };
      try {
        const { data }: { data: ProjectsByFreelancerQuery } = await client.query({
          query: gql(projectsByFreelancer),
          variables: projectsByFreelancerInput,
        });

        setProjects(data.projectsByFreelancer.items);
      } catch (error) {
        setFlash("There was an error retrieving your projects. We're looking into it");
        logger.error('Projects: error retrieving projects', { error, input: projectsByFreelancerInput });
      } finally {
        setLoading(false);
      }
    };
    execute();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <PageLayoutOne
      page={Page.PROJECTS}
      headerText="Projects > All Projects"
      headerButton={
        <InPlaceModal button={<ButtonSmall text="New Project" />}>
          <CreateProjectModal />
        </InPlaceModal>
      }
    >
      <div className={classnames('column', 'is-7', styles.projects)}>
        {!projects.length ? (
          <div>You don&apos;t have any projects yet.</div>
        ) : (
          <>
            {projects.map((p: Project) => (
              <Link key={p.id} href="/project/[id]" as={`/project/${p.id}`}>
                <a href={`/project/${p.id}`}>
                  <div className={classnames(styles.comment)}>
                    <div className={styles.header}>
                      {/* todo: click to change title */}
                      <div>{p.title || p.clients.items.find((i) => i.isInitialContact)?.user.name || 'Title'}</div>
                    </div>
                    <div className={classnames(styles.commentContent)}>{p.details || 'Client contact'}</div>
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

export default WithAuthentication(ProjectsPage, { routeType: RouteType.SIGNED_IN, allowedRoles: [Role.FREELANCER] });
