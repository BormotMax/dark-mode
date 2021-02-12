import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { faSackDollar, faTimes, faUserAstronaut } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { Storage } from 'aws-amplify';

import { v4 as uuid } from 'uuid';
import { ButtonSmall } from '../buttons/buttons';
import { AvatarUpload } from '../avatarUpload';
import { isClickOrEnter } from '../../helpers/util';
import { useCurrentUser, useFlash, useLogger } from '../../hooks';
import { GetUserQuery, UpdateUserInput } from '../../API';
import { client } from '../../pages/_app';
import { updateUser } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';
import { User } from '../../types/custom';
import { STRIPE_API_URL } from '../../helpers/constants';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { Protected } from '../protected/protected';
import { Features } from '../../permissions';

import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import styles from './settings.module.scss';

interface SettingsProps {
  close?: () => void;
}

enum StripeStatus {
  ERROR,
  NOT_STARTED,
  INCOMPLETE,
  COMPLETED,
  CHARGES_DISABLED
}

enum Tab {
  Profile = 'Profile',
  Payments = 'Payments'
}

type ValidationProps = {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  taxID?: string;
  address?: string;
};

const initialState = {
  id: '',
  name: '',
  title: '',
  email: '',
  phone: '',
  taxID: '',
  address: '',
  avatar: {},
};

export const Settings: React.FC<SettingsProps> = ({ close }) => {
  const { currentUser, signOut } = useCurrentUser();
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [tab, setTab] = useState(Tab.Profile);
  const [isLoading, setIsLoading] = useState(true);
  const [stripeStatus, setStripeStatus] = useState(StripeStatus.NOT_STARTED);
  const [existingAccountID, setExistingAccountID] = useState(null);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const [userAvatar, setUserAvatar] = useState('');
  const [avatarInputValues, setAvatarInputValues] = useState(null);
  const [valuesFields, setValuesFields] = useState<Record<string, any>>(initialState);

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { target: { name, value } = {} } = event;
    setValuesFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, [setValuesFields]);

  const onBlurInput = useCallback((event: React.FocusEvent<HTMLInputElement>): void => {
    const { target: { name, value } = {} } = event;
    setValuesFields((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  }, [setValuesFields]);

  useEffect(() => {
    const execute = async () => {
      setIsLoading(true);
      const userID = currentUser?.attributes?.sub;
      if (!userID) {
        logger.error('Settings: No user in settings menu');
        router.push('/sign-in');
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

      if (user?.avatar?.key) {
        const { key } = user?.avatar;
        try {
          const image: any = await Storage.get(key);
          setUserAvatar(image);
        } catch (error) {
          logger.error('Settings: error retrieving s3 image.', { error, input: key });
        }
      }

      if (user) {
        setValuesFields((prevState) => ({
          ...prevState,
          id: user?.id ?? '',
          name: user?.name ?? '',
          title: user?.title ?? '',
          email: user?.email ?? '',
          phone: user?.phone ?? '',
          taxID: user?.taxID ?? '',
          address: user?.address ?? '',
          avatar: user?.avatar ?? {},
        }));
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

  function validate() {
    const temp: ValidationProps = {};
    if (!valuesFields.name) temp.name = 'error';
    if (!valuesFields.email) temp.email = 'error';
    return temp;
  }

  const createOrUpdateAvatar = async () => {
    const key = valuesFields.avatar?.key ?? '';
    let updateAvatar = { key, tag: 'avatar' };
    if (avatarInputValues) {
      if (key) {
        try {
          await Storage.remove(key);
        } catch (error) {
          logger.error('Settings: error deleting user avatar from s3', { error, input: key });
        }
      }

      const s3Key = `${uuid()}${avatarInputValues.name}`;

      try {
        await Storage.put(s3Key, avatarInputValues);
      } catch (error) {
        logger.error('Settings: error adding user avatar to s3', { error, input: s3Key });
      }
      updateAvatar = { ...updateAvatar, key: s3Key };
    }
    return updateAvatar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalids({});
    setIsSaving(true);

    const validation = validate();

    if (Object.keys(validation).length) {
      setInvalids(validation);
      setIsSaving(false);
    }

    const updatedAvatar = await createOrUpdateAvatar();

    const updateUserInput = {
      id: valuesFields?.id,
      name: valuesFields?.name,
      title: valuesFields?.title ?? '',
      email: valuesFields?.email,
      avatar: updatedAvatar,
      phone: valuesFields?.phone ?? '',
      taxID: valuesFields?.taxID ?? '',
      address: valuesFields?.address ?? '',
    };

    try {
      await client.mutate({
        mutation: gql(updateUser),
        variables: { input: updateUserInput },
      });
      setFlash('Your profile settings successfully updated');
    } catch (error) {
      logger.error('Settings: error updating User', { error, input: updateUserInput });
      setFlash("Something went wrong. We're looking into it");
    } finally {
      setIsSaving(false);
    }
  };

  const resetPassword = () => {
    signOut('/forgot-password');
  };

  const chooseStatusIndicator = () => {
    if (isLoading) return <div className={classnames(styles.stripeStatus, styles.white)}>Loading...</div>;
    switch (stripeStatus) {
      case StripeStatus.NOT_STARTED:
        return <ButtonSmall
          text="Connect with Stripe"
          onClick={() => connectToStripe(false)}
          isSaving={isSaving}
          className={styles.paymentButton}
        />;
      case StripeStatus.INCOMPLETE:
        return <ButtonSmall
          text="Continue connecting with Stripe"
          onClick={() => connectToStripe(true)}
          isSaving={isSaving}
          className={styles.paymentButton}
        />;
      case StripeStatus.COMPLETED:
        return <div className={classnames(styles.stripeStatus, styles.green)}>You are connected with Stripe</div>;
      case StripeStatus.CHARGES_DISABLED:
        return <div className={classnames(styles.stripeStatus, styles.yellow)}>Your connection is being established</div>;
      case StripeStatus.ERROR:
      default:
        return <div className={classnames(styles.stripeStatus, styles.red)}>Please check back later</div>;
    }
  };

  return (
    <div className={classnames(styles.settings, modalStyles.modalWithHeaderContent)}>
      <div className={classnames(modalStyles.header, styles.header)}>
        Settings
        <div
          className={styles.buttonResetStyle}
          onClick={closeModal}
          role="button"
          onKeyDown={closeModal}
          tabIndex={0}
        >
          <FontAwesomeIcon color="#595959" icon={faTimes} />
        </div>
      </div>
      <div className={classnames(modalStyles.body, styles.body, 'columns')}>
        <div className={classnames(styles.left, 'column', 'is-narrow')}>
          <button
            onClick={() => setTab(Tab.Profile)}
            className={classnames({ [styles.current]: tab === Tab.Profile })}
            type="button"
          >
            <FontAwesomeIcon icon={faUserAstronaut} />
            Profile
          </button>
          <Protected feature={Features.Payments}>
            <button
              onClick={() => setTab(Tab.Payments)}
              type="button"
              className={classnames({ [styles.current]: tab === Tab.Payments })}
            >
              <FontAwesomeIcon icon={faSackDollar} />
              Payments
            </button>
          </Protected>
        </div>
        <div className={classnames(styles.right, 'column')}>
          {tab === Tab.Profile && (
            <form onSubmit={handleSubmit} style={{ height: '100%' }}>
              <div className={styles.profileSettingsWrapper}>
                <AvatarUpload
                  avatarName="avatar"
                  onChange={setAvatarInputValues}
                  image={userAvatar || (currentUser.attributes.email ? gravatarUrl(currentUser.attributes.email) : null)}
                  className={styles.avatarContainer}
                />
                <div className={classnames(styles.inputsContainer)}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="name" className={classnames('label', styles.label)}>
                      Name
                    </label>
                    <div className="control">
                      <input
                        required
                        disabled={false}
                        value={valuesFields.name}
                        onChange={onChangeInput}
                        onBlur={onBlurInput}
                        name="name"
                        className={classnames('input', { 'is-danger': invalids.name })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="title" className={classnames('label', styles.label)}>
                      Title
                    </label>
                    <div className="control">
                      <input
                        required
                        disabled={false}
                        value={valuesFields.title}
                        onChange={onChangeInput}
                        onBlur={onBlurInput}
                        name="title"
                        className={classnames('input', { 'is-danger': invalids.title })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="email" className={classnames('label', styles.label)}>
                      Email
                    </label>
                    <div className="control">
                      <input
                        required
                        disabled={false}
                        value={valuesFields.email}
                        onChange={onChangeInput}
                        onBlur={onBlurInput}
                        name="email"
                        className={classnames('input', { 'is-danger': invalids.email })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="phone" className={classnames('label', styles.label)}>
                      Phone
                    </label>
                    <div className="control">
                      <input
                        required
                        disabled={false}
                        value={valuesFields.phone}
                        onChange={onChangeInput}
                        onBlur={onBlurInput}
                        name="phone"
                        className={classnames('input', { 'is-danger': invalids.phone })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="taxID" className={classnames('label', styles.label)}>
                      Tax ID #
                    </label>
                    <div className="control">
                      <input
                        disabled={false}
                        value={valuesFields.taxID}
                        onChange={onChangeInput}
                        onBlur={onBlurInput}
                        name="taxID"
                        className={classnames('input', { 'is-danger': invalids.taxID })}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="address" className={classnames('label', styles.label)}>
                      Address
                    </label>
                    <div className="control">
                      <textarea
                        onChange={onChangeInput}
                        value={valuesFields.address}
                        name="address"
                        className={classnames('textarea', styles.textarea)}
                      />
                    </div>
                  </div>
                  <div className={styles.buttonsBlock}>
                    <div
                      role="button"
                      onClick={resetPassword}
                      className={classnames(styles.resetPassword, 'btn-small', 'btn-invert')}
                    >
                      Reset password
                    </div>
                    <ButtonSmall
                      text="Save"
                      onClick={() => null}
                      isSaving={isSaving}
                      className={styles.saveButton}
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
          {tab === Tab.Payments && (
            <>
              <div>Connect your payment gateway</div>
              {chooseStatusIndicator()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
