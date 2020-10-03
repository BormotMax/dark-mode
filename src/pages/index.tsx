/* eslint-disable jsx-a11y/accessible-emoji */
import Link from 'next/link';
import classnames from 'classnames';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';
import { Footer } from '../components/footer';
import styles from './styles/index.module.scss';
import Logo from '../img/homeLogo.svg';

const Home: React.FC<AuthProps> = ({ currentUser, signOut }) => {
  const handleSignOutClick = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      signOut();
    }
  };

  return (
    <div className={styles.home}>
      <div className={classnames('container')}>
        <div className={styles.upperContainer}>
          <nav className={styles.navbar} role="navigation">
            <div className={styles.logo}>
              <Logo />
              Continuum
            </div>
            <div className={styles.rightNav}>
              {!currentUser && (
                <Link href="/signIn">
                  <a href="/signIn" className={classnames(styles.navItem)}>
                    Sign&nbsp;In
                  </a>
                </Link>
              )}
              {currentUser && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a role="button" tabIndex={0} onKeyDown={handleSignOutClick} onClick={handleSignOutClick} className={styles.navItem}>
                  Log&nbsp;Out
                </a>
              )}
              {!currentUser && (
                <Link href="/signUp">
                  <a href="/signUp" className={classnames(styles.ctaButtonAnchor)}>
                    <button tabIndex={-1} type="button" className={classnames(styles.ctaButton)}>
                      Try Continuum for Free
                    </button>
                  </a>
                </Link>
              )}
            </div>
          </nav>
          <div className={styles.headerAndBody}>
            <img src="/home.png" alt="home-page" />
            <div className={styles.header}>Continuum Works</div>
            <div className={styles.body}>The all-in-one platform for solo entrepreneurs to run a thriving freelance business</div>
          </div>
        </div>
        <div className={styles.freelancersWrapper}>
          <div className={styles.highlight}>
            Made with <FontAwesomeIcon size="1x" icon={faHeart} /> for Freelance Creatives
          </div>
          <div className={styles.freelancers}>
            {[...Array(12)].map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className={classnames(styles.freelancerTypeContainer)}>
                <img src={`/Freelancer-${i}.png`} alt="freelancer type" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.upperLayoverHeader}>
          With <u>all</u> the tools you need to
          <i> flourish </i>
          as a freelancer
        </div>
        <div className={styles.upperLayoverSubHeader}>Be up and in business in 5 minutes</div>
        <div className={classnames(styles.featureGrid)}>
          <GridItem
            header="Conversations"
            body="Engage quickly and meaningfully with people interested in your work. Paste our conversation widget code in your site or use your Hire Page."
          />
          <GridItem
            header="Project Management"
            body="Text-message-style project management with conversations, files, quotes, invoices and payments all in one thread."
          />
          <GridItem
            header="CRM"
            body="Stay on top of sales with our visual CRM to see site visitors, conversations, quotes, invoices and payments."
          />
          <GridItem
            header="Quotes"
            body="Generate easy quotes that present inline to your clients to accept. Receive a deposit payment upon acceptance."
          />
          <GridItem
            header="Invoice & Payments"
            body="Create tasks and track time to generate invoices and receive payments in the Continuum project space."
          />
          <GridItem
            header="Hire Page"
            body="Use our supasimple form to generate a Hire Page to show your best work and convert visitors to clients."
          />
        </div>
        <Feature
          imageSrc="/hirePageExample.png"
          header="Put your best work forward"
          content={
            <span>
              Make more money using meaningful metrics designed to be easy to understand, relevant, and
              <i> actionable</i>
              .
              <br />
              <br />
              Track and visualize your sales funnel:
            </span>
          }
          bullets={['👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors']}
        />
        <Feature
          reverse
          imageSrc="/hirePageExample.png"
          header="Start a conversation"
          content={
            <span>
              Start a meaningful conversation with someone who is interested in your work, at the moment they are interested. Get optional
              instant notifications when a conversation has started.
            </span>
          }
          bullets={[
            '👋 Catch prospects while hot',
            '👋 Quickly establish trust',
            '👋 Conversations, quotes & invoices stream to a single project space',
            '👋 Close more deals, faster',
          ]}
        />
        <Feature
          imageSrc="/hirePageExample.png"
          header="Project Management"
          content={
            <span>
              Make more money using meaningful metrics designed to be easy to understand, relevant, and
              <i> actionable</i>
              .
              <br />
              <br />
              Track and visualize your sales funnel:s
            </span>
          }
          bullets={['👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors']}
        />
        <Feature
          reverse
          imageSrc="/hirePageExample.png"
          header="Quotes"
          content={
            <span>
              Make more money using meaningful metrics designed to be easy to understand, relevant, and
              <i> actionable</i>
              .
              <br />
              <br />
              Track and visualize your sales funnel:s
            </span>
          }
          bullets={['👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors']}
        />
        <Feature
          imageSrc="/hirePageExample.png"
          header="Invoices & Payments"
          content={
            <span>
              Make more money using meaningful metrics designed to be easy to understand, relevant, and
              <i> actionable</i>
              .
              <br />
              <br />
              Track and visualize your sales funnel:s
            </span>
          }
          bullets={['👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors']}
        />
        <Feature
          reverse
          imageSrc="/hirePageExample.png"
          header="CRM"
          content={
            <span>
              Make more money using meaningful metrics designed to be easy to understand, relevant, and
              <i> actionable</i>
              .
              <br />
              <br />
              Track and visualize your sales funnel:s
            </span>
          }
          bullets={['👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors', '👋 Page visitors']}
        />
      </div>
      <Footer />
    </div>
  );
};

export default WithAuthentication(Home, { routeType: RouteType.NO_REDIRECT });

const GridItem = ({ header, body }) => (
  <div className={classnames(styles.gridItem)}>
    <div>
      <div className={classnames(styles.gridItemHeader)}>{header}</div>
      <div>{body}</div>
    </div>
  </div>
);

const Feature = ({ imageSrc, header, content, bullets, reverse = false }) => (
  <div className={classnames(styles.feature, 'columns', 'is-desktop')}>
    {!reverse && (
      <div className={classnames('column', styles.imageColumnWrapper)}>
        <img src={imageSrc} alt="feature" />
      </div>
    )}
    <div className="column">
      <div className={classnames(styles.textColumnWrapper)}>
        <div className={classnames(styles.textColumn)}>
          <div className={styles.rightColumnHeader}>{header}</div>
          <div className={styles.rightColumnBody}>{content}</div>
          {bullets.map((b) => (
            <div key={b}>{b}</div>
          ))}
        </div>
      </div>
    </div>
    {reverse && (
      <div className={classnames('column', styles.imageColumnWrapper)}>
        <img src={imageSrc} alt="feature" />
      </div>
    )}
  </div>
);
