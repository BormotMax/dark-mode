import { useState, useEffect } from 'react';
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
    <PageLayoutOne page={Page.PROJECTS}>
      <div className={classnames('column', 'is-7', styles.projects)}>
        {!projects.length ? (
          <div>You don&apos;t have any projects yet.</div>
        ) : (
          <>
            {projects.map((p: Project) => (
              <div key={p.id}>
                <Link href="/project/[id]" as={`/project/${p.id}`}>
                  <a href={`/project/${p.id}`}>
                    <Comment name={p.client.name} avatarUrl={gravatarUrl(p.client.email)} backgroundColor="#f4f3ee">
                      <div className={classnames(styles.projectName)}>{p.client.company}</div>
                    </Comment>
                  </a>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </PageLayoutOne>
  );
};

export default WithAuthentication(ProjectsPage, { routeType: RouteType.SIGNED_IN, allowedRoles: [Role.FREELANCER] });
