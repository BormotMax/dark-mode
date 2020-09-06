import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import { client } from './_app';
import { ProjectsByFreelancerQuery } from '../API';
import { projectsByFreelancer } from '../graphql/queries';
import { useFlash } from '../hooks';
import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';

const ProjectsPage: React.FC<AuthProps> = ({ currentUser }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useFlash(null);

  useEffect(() => {
    const execute = async () => {
      try {
        const { data }: { data: ProjectsByFreelancerQuery } = await client.query({
          query: gql(projectsByFreelancer),
          variables: { freelancerID: currentUser.attributes.sub },
        });

        setProjects(data.projectsByFreelancer.items);
      } catch (err) {
        setFlash('There was an error retreiving your Hire Page info. Please contact support.');
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
