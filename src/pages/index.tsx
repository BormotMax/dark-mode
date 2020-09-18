import Link from 'next/link';
import classnames from 'classnames';
import {
  faFireAlt,
  faHandshake,
  faFunnelDollar,
  faCommentsAlt,
  faRocket,
  faFileInvoice,
  faFileInvoiceDollar,
  faPersonSign,
} from '@fortawesome/pro-light-svg-icons';
import { faCubes, faHeart } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';
import { Footer } from '../components/footer';
import styles from './styles/index.module.scss';
import Logo from '../img/homeLogo.svg';

const Home: React.FC<AuthProps> = ({ currentUser, signOut }) => {
  const handleSignOutClick = (e) => {
    if ((e as any).keyCode === undefined || (e as any).keyCode === 13) {
      signOut();
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.upperContainer}>
        <div className={classnames('container')}>
          <nav className={styles.navbar} role="navigation">
            <div className={styles.logo}>
              <Logo />
            </div>
            <div className={styles.rightNav}>
              {/* <Link href="/howItWorks">
                <a href="/howItWorks" className={styles.navItem}>
                  How&nbsp;it&nbsp;Works
                </a>
              </Link> */}
              {/* <Link href="/pricing">
                <a href="/pricing" className={styles.navItem}>
                  Plans&nbsp;&&nbsp;Pricing
                </a>
              </Link> */}
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
                  <a className="is-hidden-mobile" href="/signUp">
                    <button type="button" className={classnames(styles.ctaButton)}>
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
            <div className={styles.body}>
              The all-in-one collaboration tool for freelancers and their clients. Specialized for the needs of freelancers&#8212;not teams.
            </div>
            <div className={styles.ctas}>
              {!currentUser && (
                <Link href="/signUp">
                  <a href="/signUp">
                    <button type="button" className={classnames(styles.ctaButton, 'is-hidden-tablet')}>
                      Try Continuum for Free
                    </button>
                  </a>
                </Link>
              )}
            </div>
          </div>
          <span className={styles.highlight}>
            Made with <FontAwesomeIcon size="1x" icon={faHeart} /> for Freelance Creatives
          </span>
        </div>
      </div>

      <div className={styles.middleContainer}>
        <div className={classnames('container')}>
          <div className={styles.freelancers}>
            {[...Array(6)].map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i + 12} className={classnames(styles.freelancerTypeContainer)}>
                <img src={`/Freelancer-${i + 12}.png`} alt="freelancer type" />
              </div>
            ))}
            {[...Array(3)].map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i + 6} className={classnames(styles.freelancerTypeContainer, styles.freelancerTypeContainer__tabletLarge)}>
                <img src={`/Freelancer-${i + 6}.png`} alt="freelancer type" />
              </div>
            ))}
            {[...Array(3)].map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i + 9} className={classnames(styles.freelancerTypeContainer, styles.freelancerTypeContainer__tablet)}>
                <img src={`/Freelancer-${i + 9}.png`} alt="freelancer type" />
              </div>
            ))}
          </div>
          <div className={styles.upperLayover}>
            <div className="inner">
              <div className={styles.upperLayoverHeader}>
                With <u>all</u> the tools you need to
                <i> flourish </i>
                as a freelancer
              </div>
              <div className={styles.upperLayoverSubHeader}>Be up and in business in 5 minutes</div>
              <div className={classnames(styles.featureGrid)}>
                <GridItem
                  header="Conversations"
                  body="Engage quickly and meaningfully with people interested in your work."
                  icon={faCommentsAlt}
                />
                <GridItem
                  header="Project Management"
                  body="Text-message-style project management with conversations, files, quotes, invoices and payments all in one thread."
                  icon={faRocket}
                />
                <GridItem
                  header="CRM"
                  body="Stay on top of sales with our visual CRM to see site visitors, conversations and conversations to quotes, invoices and payments."
                  icon={faFunnelDollar}
                />
                <GridItem
                  header="Quotes"
                  body="Generate easy quotes that present inline to your clients to accept. Receive a deposit payment upon acceptance."
                  icon={faFileInvoice}
                />
                <GridItem
                  header="Invoice & Payments"
                  body="Create tasks and track time to generate invoices and receive payments in the Continuum project space."
                  icon={faFileInvoiceDollar}
                />
                <GridItem
                  header="Hire Page"
                  body="Paste our conversation code into your own website, or use our supasimple form to generate a Hire Page to show your best work and convert visitors to clients."
                  icon={faPersonSign}
                />
              </div>
              <div className="columns is-desktop">
                <div className="column is-7">
                  <img src="/hirePageExample.png" alt="hire page example" />
                </div>
                <div className="column">
                  <div className={styles.rightColumnHeader}>
                    Hang out your shingle with your
                    <b> Hire </b>
                    page.
                  </div>
                  <div className={styles.rightColumnBody}>
                    Continuum provides meaningful metrics designed to be easy to understand, relevant, and
                    <i> actionable</i>
                    .
                    <br />
                    <br />
                    Track and visualize your sales funnel:
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <img src="/iconBullet-2.png" alt="page visitors" />
                    </div>
                    <div className={styles.bulletText}>Page visitors</div>
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <img src="/iconBullet-5.png" alt="bounce rate" />
                    </div>
                    <div>Bounce Rate</div>
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <img src="/iconBullet-4.png" alt="conversations" />
                    </div>
                    <div>Conversations</div>
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <img src="/iconBullet-3.png" alt="quotes sent" />
                    </div>
                    <div>Quotes sent</div>
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <img src="/iconBullet-1.png" alt="closed sales" />
                    </div>
                    <div>Closed Sales</div>
                  </div>
                </div>
              </div>
              <div className={styles.tab}>Start a Conversation</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <div className={classnames('container')}>
          <div className={styles.lowerLayover}>
            <div className="inner">
              <div className="columns is-desktop">
                <div className="column">
                  <div className={styles.rightColumnHeader}>Contact forms are pass‌&eacute;.</div>
                  <div className={styles.rightColumnBody}>
                    Start a meaningful conversation with someone who is interested in your work, at the moment they are interested. Get
                    optional instant notifications when a conversation has started.
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <FontAwesomeIcon size="2x" icon={faFireAlt} />
                    </div>
                    <div className={styles.bulletText}>Catch prospects while hot</div>
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <FontAwesomeIcon size="2x" icon={faHandshake} />
                    </div>
                    <div>Quickly establish trust</div>
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <FontAwesomeIcon size="2x" icon={faCubes} />
                    </div>
                    <div>Conversations, quotes and invoices all stream to a single project space</div>
                  </div>
                  <div className={styles.iconBulletPoint}>
                    <div className={styles.iconContainer}>
                      <FontAwesomeIcon size="2x" icon={faFunnelDollar} />
                    </div>
                    <div>Close more deals, faster</div>
                  </div>
                </div>
                <div className="column is-7">
                  <img src="/contactFormExample.png" alt="hire page preview" />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WithAuthentication(Home, { routeType: RouteType.NO_REDIRECT });

const GridItem = ({ header, body, icon }) => (
  <div className={classnames(styles.gridItem)}>
    <div className={classnames(styles.gridItemIcon)}>
      <FontAwesomeIcon size="3x" color="#e0e0e0" icon={icon} />
    </div>
    <div>
      <div className={classnames(styles.gridItemHeader)}>{header}</div>
      <div>{body}</div>
    </div>
  </div>
);
