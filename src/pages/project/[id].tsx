import Router, { useRouter } from 'next/router';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { TabGroup } from '../../components/tabs';
import { WithAuthentication, RouteType } from '../../components/withAuthentication';
import { getProject } from '../../graphql/queries';
import { Project, Comment as CommentType, AuthProps, User } from '../../types/custom';
import { unauthClient } from '../_app';
import { GetProjectQuery } from '../../API';
import { useFlash, useLogger } from '../../hooks';
import { CommentWrapper, NewComment } from '../../components/comment';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { onCreateComment } from '../../graphql/subscriptions';
import { ContactDetails } from '../../components/contactDetails/contactDetails';
import { PageLayoutOne } from '../../components/pageLayoutOne';

const ProjectPage: React.FC<AuthProps> = ({ currentUser }) => {
  const router = useRouter();
  const { id, token } = router.query;
  const [project, setProject] = useState(null);
  const [viewerId, setViewerId] = useState(token || localStorage.getItem('viewerId'));
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useFlash();
  const { logger } = useLogger();
  const currentUserId = currentUser?.attributes?.sub;

  useEffect(() => {
    setViewerId(token || localStorage.getItem('viewerId'));
    if (token) {
      localStorage.setItem('viewerId', token as string);
    }
  }, [currentUser]);

  useEffect(() => {
    const execute = async () => {
      const getProjectInput = { id };
      try {
        const getProjectResult: { data: GetProjectQuery } = await unauthClient.query({
          query: gql(getProject),
          variables: getProjectInput,
        });

        const p: Project = getProjectResult.data?.getProject;
        setProject(p);
      } catch (error) {
        setFlash("There was an error retrieving this project. We're looking into it.");
        logger.error('Project: error retrieving Project.', { error, input: getProjectInput });
      } finally {
        setLoading(false);
      }

      try {
        const subscriptionResult = unauthClient.subscribe({ query: gql(onCreateComment) });
        subscriptionResult.subscribe({
          next: (comment) => {
            setProject((p) => {
              if (comment.data.onCreateComment.projectID !== p.id) {
                return p;
              }
              return { ...p, comments: { ...p.comments, items: [...p.comments.items, comment.data.onCreateComment] } };
            });
          },
        });
      } catch (error) {
        setFlash('Messaging may be unavailable. Try reloading the page.');
        logger.error('Project: error subscribing to onCreateComment', { error });
      }
    };
    execute();
  }, []);

  if (!viewerId && !currentUserId) Router.push('/signIn');
  if (loading) return null;
  if (!project) return <div>Not found</div>;

  const { client, freelancer, comments: cs } = project as Project;

  let viewer: User;
  // the viewer could be an authenticated Freelancer, but in this case they are acting as a Client User
  if (viewerId && viewerId === client.signedOutAuthToken) {
    viewer = client;
  } else if (currentUserId && currentUserId === freelancer.id) {
    viewer = freelancer;
  }
  if (!viewer) {
    Router.push('/signIn');
    return null;
  }

  // eslint-disable-next-line arrow-body-style
  const comments = (cs?.items || []).sort((e1, e2) => {
    return new Date(e1.createdAt).getTime() - new Date(e2.createdAt).getTime();
  }) as Array<CommentType>;

  return (
    <PageLayoutOne headerText={client.company}>
      <div className="flash-message">{flash}</div>
      <div className={classnames('column')}>
        {comments.filter(Boolean).map((c) => (
          <CommentWrapper key={c.id} comment={c} viewerId={viewerId as string} />
        ))}
        <NewComment name={viewer.name} avatarUrl={gravatarUrl(viewer.email)} projectID={id as string} creatorID={viewer.id} />
      </div>
      <div className={classnames('column', 'is-narrow')}>
        <TabGroup names={['People']}>
          <ContactDetails user={client} />
        </TabGroup>
      </div>
    </PageLayoutOne>
  );
};

export default WithAuthentication(ProjectPage, { routeType: RouteType.NO_REDIRECT });
