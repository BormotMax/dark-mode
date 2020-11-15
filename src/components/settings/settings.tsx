import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { faSackDollar, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import styles from './settings.module.scss';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import { ButtonSmall } from '../buttons/buttons';
import { isClickOrEnter } from '../../helpers/util';
import { useCurrentUser, useFlash, useLogger } from '../../hooks';
import { GetUserQuery, UpdateUserInput } from '../../API';
import { client } from '../../pages/_app';
import { updateUser } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';
import { User } from '../../types/custom';

const STRIPE_API_URL = 'https://enigmatic-sierra-62634.herokuapp.com';
// const STRIPE_API_URL = 'http://localhost:8080';

interface SettingsProps {
  close?: Function
}

enum StripeStatus {
  ERROR,
  NOT_STARTED,
  INCOMPLETE,
  COMPLETED,
  CHARGES_DISABLED
}

export const Settings: React.FC<SettingsProps> = ({ close }) => {
  const { currentUser } = useCurrentUser();
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stripeStatus, setStripeStatus] = useState(StripeStatus.NOT_STARTED);
  const [existingAccountID, setExistingAccountID] = useState(null);

  useEffect(() => {
    const execute = async () => {
      setIsLoading(true);
      const userID = currentUser?.attributes?.sub;
      if (!userID) {
        logger.error('Settings: No user in settings menu');
        router.push('/signIn');
        return;
      }

      let getUserResponse;
      const getUserInput = { id: userID };
      try {
        getUserResponse = await client.query({
          query: gql(getUser),
          variables: getUserInput,
        });
      } catch (error) {
        logger.error('Settings: error while finding current User', { error, input: { input: getUserInput } });
        setStripeStatus(StripeStatus.ERROR);
        setFlash("Something went wrong. We're looking into it");
        setIsLoading(false);
        return;
      }

      const user: User = (getUserResponse.data as GetUserQuery)?.getUser;

      if (!user) {
        logger.error('Settings: no User found', { input: { input: getUserInput } });
        setStripeStatus(StripeStatus.ERROR);
        setFlash("Something went wrong. We're looking into it");
        setIsLoading(false);
        return;
      }

      if (!user?.stripeAccountID) {
        setStripeStatus(StripeStatus.NOT_STARTED);
      } else {
        try {
          const { data } = await axios.get(`${STRIPE_API_URL}/account/${user.stripeAccountID}`, { withCredentials: true });
          const { charges_enabled: chargesEnabled, details_submitted: detailsSubmitted } = data;

          if (!detailsSubmitted) {
            setStripeStatus(StripeStatus.INCOMPLETE);
          } else if (chargesEnabled) {
            setStripeStatus(StripeStatus.COMPLETED);
          } else {
            setStripeStatus(StripeStatus.CHARGES_DISABLED);
          }

          setExistingAccountID(user.stripeAccountID);
        } catch (error) {
          setStripeStatus(StripeStatus.NOT_STARTED);
        }
      }
      setIsLoading(false);
    };

    execute();
  }, []);

  const connectToStripe = async (isRefresh = false) => {
    setIsSaving(true);
    const userID = currentUser?.attributes?.sub;
    let stripeAccountID: string;
    let stripeOnboardingUrl: string;

    const onboardUrl = isRefresh ? `${STRIPE_API_URL}/onboard-user/refresh` : `${STRIPE_API_URL}/onboard-user`;
    const body = isRefresh ? { accountID: existingAccountID } : {};

    try {
      const { data } = await axios.post(onboardUrl, body, { withCredentials: true });
      const { url, accountID } = data;
      stripeAccountID = accountID;
      stripeOnboardingUrl = url;
    } catch (error) {
      logger.error('Error onboarding to Stripe', { error, input: { userID } });
      setFlash('Error onboarding to Stripe. Please try again later.');
      setIsSaving(false);
      return;
    }

    const updateUserInput: UpdateUserInput = { id: userID, stripeAccountID };
    try {
      await client.mutate({
        mutation: gql(updateUser),
        variables: { input: updateUserInput },
      });
    } catch (error) {
      logger.error('Settings: error updating User stripeAccountID', { error, input: updateUserInput });
      setFlash('Error onboarding to Stripe. Please try again later.');
      setIsSaving(false);
      return;
    }

    window.location.href = stripeOnboardingUrl;
  };

  const closeModal = (event) => {
    if (isClickOrEnter(event)) {
      close();
    }
  };

  const chooseStatusIndicator = () => {
    if (isLoading) return <div className={classnames(styles.stripeStatus, styles.white)}>Loading...</div>;
    switch (stripeStatus) {
      case StripeStatus.NOT_STARTED:
        return <ButtonSmall
          text="Connect with Stripe"
          onClick={connectToStripe}
          isSaving={isSaving}
        />;
      case StripeStatus.INCOMPLETE:
        return <ButtonSmall
          text="Continue connecting with Stripe"
          onClick={() => connectToStripe(true)}
          isSaving={isSaving}
        />;
      case StripeStatus.COMPLETED:
        return <div className={classnames(styles.stripeStatus, styles.green)}>You are connected with Stripe</div>;
      case StripeStatus.CHARGES_DISABLED:
        return <div className={classnames(styles.stripeStatus, styles.yellow)}>Connected with Stripe, but charges are disabled</div>;
      case StripeStatus.ERROR:
      default:
        return <div className={classnames(styles.stripeStatus, styles.red)}>Please check back later</div>;
    }
  };

  return (
    <div className={classnames(styles.settings, modalStyles.modalWithHeaderContent)}>
      <div className={classnames(modalStyles.header, styles.header)}>Settings
        <div onClick={closeModal} role="button" onKeyDown={closeModal} tabIndex={0}>
          <FontAwesomeIcon color="#595959" icon={faTimes} />
        </div>
      </div>
      <div className={classnames(modalStyles.body, styles.body, 'columns')}>
        <div className={classnames(styles.left, 'column', 'is-narrow')}>
          <button type="button">
            <FontAwesomeIcon icon={faSackDollar} />
            Payments
          </button>
        </div>
        <div className={classnames(styles.right, 'column')}>
          <div>Connect your payment gateway</div>
          {chooseStatusIndicator()}
        </div>
      </div>
    </div>
  );
};
