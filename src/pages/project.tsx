import Head from 'next/head';
import styles from './styles/project.module.scss';
import { data, quotes, files } from '../mockData/project';
import {
  TabGroup, NotesTab, QuotesTab, FilesTab,
} from '../components/tabs';
import { WithAuthentication } from '../components/withAuthentication';
import { FirstContact } from '../components/firstContact';
import { Comments } from '../components/comments';
import { Footer } from '../components/footer';
import { ProjectHeader } from '../components/projectHeader';
import { Quote } from '../components/quote';

const Project: React.FC = () => (
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
            <FirstContact name={data.client.name} message={data.notes} submittedAt={data.submittedAt} />
            <Comments comments={data.comments} />
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
            {quotes.map((quote, i) => (
              <Quote key={i} i={i + 1} quote={quote} />
            ))}
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default WithAuthentication(Project);
