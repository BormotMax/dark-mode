import React, { useEffect, useRef, useState, memo } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import gql from 'graphql-tag';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import { useFlash, useLogger } from '../hooks';
import { createDomainSlug } from '../graphql/mutations';
import { getDomainSlug } from '../graphql/queries';
import { GetDomainSlugQuery } from '../API';
import { DomainSlug } from '../types/custom';
import LandingLogo from '../components/svgIcons/LandingLogo';

import { unauthClient } from './_app';
import styles from './styles/index.module.scss';

const Home: React.FC = () => {
  const router = useRouter();
  const { confirmed } = router.query;
  const { setFlash } = useFlash();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const { logger } = useLogger();

  useEffect(() => {
    if (confirmed === 'true') {
      setFlash('Subscription confirmed! Expect some great emails headed your way very soon.');
    }
  }, [confirmed, setFlash]);

  const usernameIsValid = () => {
    const re = /^[a-z0-9-]+$/;
    return username.match(re);
  };

  const checkUsername = async (uname) => {
    const getDomainSlugInput = { slug: uname };
    try {
      const getDomainSlugResult: { data: GetDomainSlugQuery } = await unauthClient.query({
        query: gql(getDomainSlug),
        variables: getDomainSlugInput,
      });

      const getDomainSlugResponse: DomainSlug = getDomainSlugResult?.data?.getDomainSlug;

      if (getDomainSlugResponse) {
        setIsUsernameAvailable(false);
        setIsSaving(false);
        return false;
      }

      setIsUsernameAvailable(true);
      setIsSaving(false);
      return true;
    } catch (error) {
      setIsUsernameAvailable(false);
      setIsSaving(false);
      return false;
    }
  };

  const checkUsernameDebounce = useRef(debounce((q) => checkUsername(q), 300)).current;

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) {
      return;
    }

    if (!isUsernameAvailable) {
      setFlash('Username not available. Please try again.');
      return;
    }

    const isAvailable = await checkUsername(username);

    if (!isAvailable) {
      setFlash('Username not available. Please try again.');
      return;
    }

    try {
      await axios.post('https://api.convertkit.com/v3/forms/1777455/subscribe', {
        api_key: 'bzukDnUnHD-Me1JmG3Og_g',
        email,
      });

      setFlash('Success! Now check your email to confirm your subscription.');
      setUsername('');
      setEmail('');
    } catch (error) {
      setFlash("Something went wrong. We're looking into it");
    }

    const createDomainSlugInput = {
      freelancerID: uuid(),
      pendingEmail: email,
      slug: username,
    };

    try {
      const createDomainSlugResponse = await unauthClient.mutate({
        mutation: gql(createDomainSlug),
        variables: { input: createDomainSlugInput },
      });

      const newSlug = createDomainSlugResponse?.data?.createDomainSlug?.slug;
      if (!newSlug) {
        throw new Error();
      }
    } catch (error) {
      setFlash("Something went wrong. We're looking into it");
      logger.error('Index page: error creating slug.', { error, createDomainSlugInput });
    } finally {
      setIsSaving(false);
    }
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value = '' } = {} } = event;
    setUsername(value.toLowerCase());
    checkUsernameDebounce(value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value = '' } = {} } = event;
    setEmail(value);
  };

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
                <p>Landing 2021 <span role="img" aria-label="unicorn">🦄</span> </p>
              </div>
              <div className={styles.cont}>
                <h1>the future of work</h1>
                <p>
                  Continuum is the all-in-one platform for collaborative freelance work.
                  <br />
                  Manage conversations, projects, & payments in one place.
                </p>
                <form onSubmit={submitForm}>
                  <p>Reserve your username now</p>
                  <input
                    pattern="^[a-z0-9-]+$"
                    value={username}
                    onChange={onUsernameChange}
                    type="text"
                    placeholder="Username (a-z, 0-9, dashes)"
                    className={classnames({ [styles.red]: username !== '' && (isUsernameAvailable === false || !usernameIsValid()) })}
                    required
                  />
                  <div className={styles.emailWrapper}>
                    <input
                      value={email}
                      onChange={onEmailChange}
                      type="email"
                      required
                      placeholder="Enter your email"
                    />
                    <button
                      disabled={isSaving}
                      type="submit"
                    >
                      Next
                    </button>
                  </div>
                </form>
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

export default memo(Home);
