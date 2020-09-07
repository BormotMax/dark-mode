import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import { client } from './_app';
import { ProjectsByFreelancerQuery } from '../API';
import { projectsByFreelancer } from '../graphql/queries';
import { useFlash, useLogger } from '../hooks';
import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';

const ProjectsPage: React.FC<AuthProps> = ({ currentUser }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useFlash(null);
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
    <div>
      <div className="flash-message">{flash}</div>
      <>
        {projects.map((p) => (
          <div key={p.id}>
            <Link href="/project/[id]" as={`/project/${p.id}`}>
              <a href={`/project/${p.id}`}>{p.id}</a>
            </Link>
          </div>
        ))}
      </>
    </div>
  );
};

export default WithAuthentication(ProjectsPage, { routeType: RouteType.SIGNED_IN, allowedRoles: [Role.FREELANCER] });
