import React, { useState } from 'react';
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
import { UpdateUserInput } from '../../API';
import { client } from '../../pages/_app';
import { updateUser } from '../../graphql/mutations';

interface SettingsProps {
  close?: Function
}

export const Settings: React.FC<SettingsProps> = ({ close }) => {
  const { currentUser } = useCurrentUser();
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const connectToStripe = async () => {
    setIsSaving(true);
    const userID = currentUser?.attributes?.sub;
    if (!userID) {
      logger.error('Settings: No user in settings menu');
      router.push('/signIn');
      return;
    }

    let stripeAccountID: string;
    let stripeOnboardingUrl: string;
    try {
      const { data } = await axios.post('http://ec2-3-86-189-230.compute-1.amazonaws.com:3001/onboard-user', {}, { withCredentials: true });
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
          <ButtonSmall text="Connect with Stripe" onClick={connectToStripe} isSaving={isSaving} />
        </div>
      </div>
    </div>
  );
};
