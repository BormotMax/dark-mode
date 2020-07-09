import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import styles from '../styles/project.module.scss';
import { data, files } from '../../mockData/project';
import {
  TabGroup, NotesTab, QuotesTab, FilesTab,
} from '../../components/tabs';
import { WithAuthentication } from '../../components/withAuthentication';
import { FirstContact } from '../../components/firstContact';
import { Comments } from '../../components/comments';
import { Footer } from '../../components/footer';
import { ProjectHeader } from '../../components/projectHeader';
import { QuoteProgress } from '../../components/quote';
import { getProject } from '../../graphql/queries';
import { GetProjectQuery } from '../../API';
import { Project, Comment, Quote as QuoteType } from '../../types/custom';

const ProjectPage: React.FC = () => {
  const [project, setProject] = useState<Project>(null);
  const [errors, setErrors] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const executeQuery = async () => {
      try {
        const result = (await API.graphql(graphqlOperation(getProject, { id }))) as GraphQLResult<GetProjectQuery>;
        setProject(result.data?.getProject);
      } catch (err) {
        setErrors(err);
      }
    };

    executeQuery();
  }, []);

  if (errors) {
    return <div>There was an error</div>;
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  const {
    initialContact, client, createdAt, comments: cs, quotes: qs,
  } = project;

  // todo: add sort order to quotes query
  const quotes = (qs?.items || []) as Array<QuoteType>;
  const comments = (cs?.items || []) as Array<Comment>;

  return (
    <div className={styles.page}>
      <Head>
        <title>Continuum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.body} container is-desktop`}>
        <ProjectHeader headerText={data.company.name} avatar="/avatar.jpg" />
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
    </div>
  );
};

export default WithAuthentication(ProjectPage);
