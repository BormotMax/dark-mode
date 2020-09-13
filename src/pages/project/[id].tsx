import Router, { useRouter } from 'next/router';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from '../styles/project.module.scss';
import { TabGroup } from '../../components/tabs';
import { WithAuthentication, RouteType, Role } from '../../components/withAuthentication';
import { getProject } from '../../graphql/queries';
import { Project, Comment as CommentType, AuthProps, User } from '../../types/custom';
import { unauthClient } from '../_app';
import { GetProjectQuery } from '../../API';
import { useFlash, useDelayedFlash, useLogger } from '../../hooks';
import { CommentWrapper, NewComment } from '../../components/comment';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { onCreateComment } from '../../graphql/subscriptions';
import { ContactDetails } from '../../components/contactDetails/contactDetails';
import { SideNav } from '../../components/sideNav/sideNav';
import { Protected } from '../../components/protected/protected';
import { Header } from '../../components/header';

const ProjectPage: React.FC<AuthProps> = ({ currentUser }) => {
  const router = useRouter();
  const { id, token } = router.query;
  const [project, setProject] = useState(null);
  const [viewerId, setViewerId] = useState(currentUser?.attributes?.sub || token || localStorage.getItem('viewerId'));
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useFlash();
  const [delayedFlash] = useDelayedFlash();
  const { logger } = useLogger();

  useEffect(() => {
    setViewerId(currentUser?.attributes?.sub || token || localStorage.getItem('viewerId'));
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

  if (!viewerId) Router.push('/signIn');
  if (loading) return null;
  if (!project) return <div>Not found</div>;

  const { client, freelancer, comments: cs } = project as Project;

  let viewer: User;
  // todo: allow signed in freelancer to view page if they're signedout token matches
  if (viewerId === client.signedOutAuthToken) {
    viewer = client;
  } else if (viewerId === freelancer.id) {
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
    <div className={styles.page}>
      <div className="flash-message">{flash || delayedFlash}</div>
      <Header headerText={client.company} />
      <main className={`${styles.body} container is-desktop`}>
        <div className={`${styles.columns} columns`}>
          <div className={classnames('column', 'is-narrow', styles.navColumn, 'is-hidden-touch')}>
            <div className={styles.container}>
              <Protected roles={[Role.FREELANCER]}>
                <SideNav />
              </Protected>
            </div>
          </div>
          <div className={classnames(styles.leftColumn, styles.column, 'column')}>
            <div className={styles.container}>
              <div className={styles.comments}>
                <div>
                  {comments.filter(Boolean).map((c) => (
                    <CommentWrapper key={c.id} comment={c} viewerId={viewerId as string} />
                  ))}
                  <NewComment name={viewer.name} avatarUrl={gravatarUrl(viewer.email)} projectID={id as string} creatorID={viewer.id} />
                </div>
              </div>
            </div>
          </div>
          <div className={classnames('column', 'is-narrow', styles.column, styles.rightColumn)}>
            <div className={styles.container}>
              <TabGroup names={['People']}>
                <ContactDetails user={client} />
              </TabGroup>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WithAuthentication(ProjectPage, { routeType: RouteType.NO_REDIRECT });
