/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { debounce } from 'lodash';
import gql from 'graphql-tag';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import styles from './styles/index.module.scss';
import { useFlash, useLogger } from '../hooks';
import { unauthClient } from './_app';
import { createDomainSlug } from '../graphql/mutations';
import { getDomainSlug } from '../graphql/queries';
import { GetDomainSlugQuery } from '../API';
import { DomainSlug } from '../types/custom';

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
  }, [confirmed]);

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

  const checkUsernameDBounce = useRef(debounce((q) => checkUsername(q), 300)).current;

  const submitForm = async (e) => {
    e.preventDefault();
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

  const onUsernameChange = ({ target }) => {
    const { value } = target;
    setUsername(value.toLowerCase());
  };

  return (
    <div className={styles.home}>
      <div className={styles.foroverflowhidden}>
        <div className={styles.maindiv}>
          <img src="Ned.png" className={styles.Ned} alt="" />
          <img src="Valentina.png" className={styles.Valentina} alt="" />
          <img src="Ronald.png" className={styles.Ronald} alt="" />

          <span className={styles.highlight} />
          <h2>Continuum is The platform for</h2>
          <h1>THE FUTURE of WORK</h1>
          <h3>Landing 2021 🦄</h3>

          <p>The all-in-one collaborative platform for solo creators and crews to run a thriving freelance business.</p>

          <form onSubmit={submitForm}>
            <p>Hey, why not reserve your username now</p>
            <div className={styles.inputarea}>
              <input
                pattern="^[a-z0-9-]+$"
                value={username}
                onChange={(e) => { onUsernameChange(e); checkUsernameDBounce(e.target.value); }}
                className={classnames(styles.block,
                  {
                    [styles.green]: isUsernameAvailable && usernameIsValid(),
                    [styles.red]: username !== '' && (isUsernameAvailable === false || !usernameIsValid()),
                  })}
                type="text"
                placeholder="Username (a-z, 0-9, dashes)"
                required
              />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Enter your email" />
              <button
                disabled={isSaving}
                type="submit"
              >Next <span className={styles.hendb}>☝🏽</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
