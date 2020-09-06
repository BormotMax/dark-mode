import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { faComments } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/project.module.scss';
import { TabGroup } from '../../components/tabs';
import { WithAuthentication, RouteType, Role } from '../../components/withAuthentication';
import { getProject } from '../../graphql/queries';
import { Project, Comment as CommentType, AuthProps, User } from '../../types/custom';
import { unauthClient } from '../_app';
import { GetProjectQuery } from '../../API';
import { useFlash, useDelayedFlash } from '../../hooks';
import { CommentWrapper, NewComment } from '../../components/comment';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { onCreateComment } from '../../graphql/subscriptions';
import { ContactDetails } from '../../components/contactDetails/contactDetails';
import { SideNav } from '../../components/sideNav/sideNav';
import { Protected } from '../../components/protected/protected';

const ProjectPage: React.FC<AuthProps> = ({ currentUser }) => {
  const router = useRouter();
  const { id, token } = router.query;
  const [project, setProject] = useState(null);
  const [viewerId, setViewerId] = useState(currentUser?.attributes?.sub || token || localStorage.getItem('viewerId'));
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useFlash();
  const [delayedFlash] = useDelayedFlash();

  useEffect(() => {
    setViewerId(currentUser?.attributes?.sub || token || localStorage.getItem('viewerId'));
    if (token) {
      localStorage.setItem('viewerId', token as string);
    }
  }, [currentUser]);

  useEffect(() => {
    const execute = async () => {
      let result;
      try {
        const res: { data: GetProjectQuery } = await unauthClient.query({
          query: gql(getProject),
          variables: { id },
        });

        result = res.data?.getProject;
        setProject(result);
      } catch (err) {
        setFlash('There was an error retreiving your Hire Page info. Please contact support.');
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
      } catch (err) {
        console.log(err);
      }
    };
    execute();
  }, []);

  if (!viewerId) Router.push('/signIn');
  if (loading) return null;
  if (!project) return <div>Not found</div>;

  const { details, client, freelancer, createdAt, comments: cs } = project as Project;

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
      <Head>
        <title>Continuum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <aside className={classnames(styles.sideNav, 'is-hidden-touch')}>
        <Protected roles={[Role.FREELANCER]}>
          <SideNav />
        </Protected>
      </aside>
      <main className={`${styles.body} container is-desktop`}>
        {/* <ProjectHeader headerColor={HeaderColor.GRAY} /> */}
        <div className={`${styles.columns} columns`}>
          <div className={classnames(styles.leftColumn, styles.column, 'column', 'is-two-thirds-desktop')}>
            <div className={styles.container}>
              <div className="mbm">
                <h1 className={classnames('h1', styles.header)}>{client.company}</h1>
                <div>
                  <div className="header-2-md">
                    <FontAwesomeIcon size="1x" color="#1D35579" icon={faComments} />
                    &nbsp; Conversation
                  </div>
                  {/* <div className={classnames('text-2', 'mbm', styles.message)}>{details}</div> */}
                </div>
                {/* <div className="text-slate">Submitted {new Date(createdAt).toDateString()}</div> */}
              </div>
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
          <div className={classnames('column', styles.column, styles.rightColumn)}>
            <div className={styles.container}>
              <TabGroup names={['People']}>
                <ContactDetails user={client} />
              </TabGroup>
              {/* <div className={styles.projectProgressHeader}>PROJECT PROGRESS</div> */}
              {/* {quotes.filter(Boolean).map((quote, i) => ( */}
              {/* <QuoteProgress key={quote.id} i={i + 1} quote={quote} /> */}
              {/* ))} */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WithAuthentication(ProjectPage, { routeType: RouteType.NO_REDIRECT });
