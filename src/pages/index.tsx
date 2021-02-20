import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Link from 'next/link';

import { useFlash } from '../hooks';
import LandingLogo from '../components/svgIcons/LandingLogo';
import { SIGN_UP_WITH_CIRCLE } from '../helpers/constants';

import styles from './styles/index.module.scss';

const SIGN_IN = 'sign-in';

const Home: React.FC = () => {
  const router = useRouter();
  const { confirmed } = router.query;
  const { setFlash } = useFlash();

  useEffect(() => {
    if (confirmed === 'true') {
      setFlash('Subscription confirmed! Expect some great emails headed your way very soon.');
    }
  }, [confirmed, setFlash]);

  return (
    <div className={styles.gradientContainer}>
      <div className={classnames(styles.content, styles.containerFluid)}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              <img
                src="landing/planet1.png"
                className={styles.planetFirst}
                alt="the planet with 'Continuum' colors gradient fill"
              />
              <img
                src="landing/planet2.png"
                className={styles.planetSecond}
                alt="the planet with 'Continuum' colors gradient fill (secondary)"
              />
              <div className={styles.logoWrapper}>
                <LandingLogo />
                <p>
                  <Link href={SIGN_IN}>
                    <a href={SIGN_IN}>Sign In</a>
                  </Link>
                </p>
              </div>
              <div className={styles.cont}>
                <div className={styles.futureWork}>
                  <h1>the future of work</h1>
                  <p>
                    Continuum is the all-in-one platform for collaborative freelance work.
                    <br />
                    Manage conversations, projects, & payments in one place.
                  </p>
                </div>
                <div className={styles.springLaunching}>
                  <p>
                    Continuum is launching in spring 2021. Create an account <br />
                    today and get free access to our community until 30 days <br />
                    after launch. No credit card required.
                  </p>

                  <Link href={SIGN_UP_WITH_CIRCLE}>
                    <a href={SIGN_UP_WITH_CIRCLE} className={styles.btnStart}>
                      <button type="button">Start your free trial</button>
                    </a>
                  </Link>
                </div>
                <img src="landing/People.png" className={styles.people} alt="People" />
                <ul>
                  <li>
                    <a href="https://www.instagram.com/continuumworks/">
                      <img src="landing/instagram.png" alt="instagram logo" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/continuumworks/">
                      <img src="landing/twitter.png" alt="twitter logo" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/continuumworks">
                      <img src="landing/linkedin.png" alt="linkedin logo" />
                    </a>
                  </li>
                </ul>
                <p className={styles.copyright}>© 2020 Continuum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
