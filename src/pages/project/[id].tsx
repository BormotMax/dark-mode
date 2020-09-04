import Head from 'next/head';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from '../styles/project.module.scss';
// import { TabGroup, NotesTab, QuotesTab, FilesTab } from '../../components/tabs';
import { WithAuthentication, RouteType } from '../../components/withAuthentication';
import { ProjectHeader, HeaderColor, HeaderTabColor } from '../../components/projectHeader';
// import { QuoteProgress } from '../../components/quote';
import { getProject } from '../../graphql/queries';
import { Project, Comment as CommentType, Quote as QuoteType, AuthProps, User } from '../../types/custom';
import { client as gqlClient, unauthClient } from '../_app';
import { GetProjectQuery } from '../../API';
import { useFlash } from '../../hooks';
import { CommentWrapper, NewComment } from '../../components/comment';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { onCreateComment } from '../../graphql/subscriptions';

const ProjectPage: React.FC<AuthProps> = ({ currentUser }) => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [viewerId] = useState(currentUser?.username || localStorage.getItem('viewerId'));
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useFlash();

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
        setComments(result?.comments?.items || []);
      } catch (err) {
        setFlash('There was an error retreiving your Hire Page info. Please contact support.');
      } finally {
        setLoading(false);
      }

      try {
        const subscriptionResult = unauthClient.subscribe({ query: gql(onCreateComment) });
        subscriptionResult.subscribe({
          next: (comment) => {
            setComments((existingComments) => [...existingComments, comment.data.onCreateComment]);
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    execute();
  }, []);

  if (!viewerId) return <div>Not authorized</div>;
  if (loading) return null;
  if (!project) return <div>Not found</div>;

  const { details, client, freelancer, createdAt, quotes: qs } = project as Project;

  let viewer: User;
  if (viewerId === client.id) {
    viewer = client;
  } else if (viewerId === freelancer.id) {
    viewer = freelancer;
  }
  if (!viewer) return <div>Not authorized</div>;
  // const quotes = (qs?.items || []) as Array<QuoteType>;
  // const comments = (cs?.items || []) as Array<CommentType>;

  return (
    <div className={styles.page}>
      <div className="flash-message">{flash}</div>
      <Head>
        <title>Continuum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.body} container is-desktop`}>
        <ProjectHeader headerText={client.company} tabColor={HeaderTabColor.PURPLE} headerColor={HeaderColor.GRAY} />
        <div className={`${styles.columns} columns`}>
          {/* <div className={classnames(styles.leftColumn, styles.column, 'column', 'is-two-thirds-desktop')}> */}
          <div className={classnames(styles.leftColumn, styles.column, 'column')}>
            <div className={styles.container}>
              <div className="mbm">
                <span className="header-2-lg">First Contact from {client.name}</span>
                <img className="vat mls" src="/wave.png" alt="hello" />
                <div>
                  <div className="header-2-md">Message</div>
                  <div className={classnames('text-2', 'mbm', styles.message)}>{details}</div>
                </div>
                <div className="text-slate">Submitted {new Date(createdAt).toDateString()}</div>
              </div>
              <div className={styles.comments}>
                <div className={styles.header}>
                  <div>Comments</div>
                  <div className={styles.line} />
                </div>
                <div>
                  {comments.filter(Boolean).map((c) => (
                    <CommentWrapper key={c.id} comment={c} viewerId={viewerId} />
                  ))}
                  <NewComment name={viewer.name} avatarUrl={gravatarUrl(viewer.email)} projectID={id as string} creatorID={viewer.id} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className={classnames('column', styles.column, styles.rightColumn)}>
                    <div className={styles.container}>
                      <TabGroup names={['QUOTES', 'NOTES', 'FILES']}>
                        <QuotesTab quotes={quotes} />
                        <NotesTab />
                        <FilesTab files={files} />
                      </TabGroup>
                      <div className={styles.projectProgressHeader}>PROJECT PROGRESS</div>
                      {quotes.filter(Boolean).map((quote, i) => (
                        <QuoteProgress key={quote.id} i={i + 1} quote={quote} />
                      ))}
                    </div>
                  </div> */}
        </div>
      </main>
    </div>
  );
};

export default WithAuthentication(ProjectPage, { routeType: RouteType.NO_REDIRECT });
