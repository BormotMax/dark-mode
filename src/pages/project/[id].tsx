import Head from 'next/head';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import styles from '../styles/project.module.scss';
import { data as mockData, files } from '../../mockData/project';
import {
  TabGroup, NotesTab, QuotesTab, FilesTab,
} from '../../components/tabs';
import { WithAuthentication, RouteType } from '../../components/withAuthentication';
import { FirstContact } from '../../components/firstContact';
import { Comments } from '../../components/comments';
import { Footer } from '../../components/footer';
import { ProjectHeader } from '../../components/projectHeader';
import { QuoteProgress } from '../../components/quote';
import { getProject } from '../../graphql/queries';
import { Project, Comment, Quote as QuoteType } from '../../types/custom';

const ProjectPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.page}>
      <Head>
        <title>Continuum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Query query={gql(getProject)} variables={{ id }}>
        {({ loading, data, error }: QueryResult) => {
          if (loading) return <div>loading...</div>;
          if (error) return <div>{error.message}</div>;
          if (!data.getProject) return <div>Not found</div>;

          const {
            initialContact, client, createdAt, comments: cs, quotes: qs,
          } = data.getProject as Project;

          const quotes = (qs?.items || []) as Array<QuoteType>;
          const comments = (cs?.items || []) as Array<Comment>;

          return (
            <>
              <main className={`${styles.body} container is-desktop`}>
                <ProjectHeader headerText={mockData.company.name} avatar="/avatar.jpg" />
                <div className={`${styles.columns} columns`}>
                  <div className={`${styles.leftColumn} column is-two-thirds-desktop`}>
                    <div className={styles.container}>
                      <FirstContact name={client?.name} message={initialContact?.message} submittedAt={new Date(createdAt)} />
                      <Comments comments={comments} />
                    </div>
                  </div>
                  <div className="column">
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
                  </div>
                </div>
              </main>
              <Footer />
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default WithAuthentication(ProjectPage, { routeType: RouteType.SIGNED_IN });
