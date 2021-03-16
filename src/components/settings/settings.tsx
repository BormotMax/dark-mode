import React, { useCallback, useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import { faSackDollar, faXmark, faUserAstronaut } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import md5 from 'md5';
import { useQuery, gql } from '@apollo/client';

import Button from '../button';
import { AvatarUpload } from '../avatarUpload';
import { isClickOrEnter } from '../../helpers/util';
import { createOrUpdateAvatar } from '../../helpers/s3';
import { useAsync, useCurrentUser, useFlash, useLogger, useMountedState, useStorageLink } from '../../hooks';
import { GetUserQuery, UpdateUserInput } from '../../API';
import { client } from '../../pages/_app';
import { updateUser } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';
import { S3Avatar, MouseOrKeyboardEvent } from '../../types/custom';
import { STRIPE_API_URL } from '../../helpers/constants';
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

type Fields = {
  id: string,
  name: string,
  title: string,
  email: string,
  phone: string,
  taxID: string,
  address: string,
  avatar: S3Avatar | Record<string, string>,
};

type StripeInfoResponse = {
  charges_enabled: boolean,
  details_submitted: boolean,
};

type StripeOnBoardResponse = {
  url: string,
  accountID: string,
};

const DEFAULT_GRAVATAR = 'https%3A%2F%2Fcontinuum-resources.s3.amazonaws.com%2FblankAvatar.jpg';

const initialState = {
  id: '',
  name: '',
  title: '',
  email: '',
  phone: '',
  taxID: '',
  address: '',
  avatar: { key: '' },
};

export const Settings: React.FC<SettingsProps> = ({ close }) => {
  const { currentUser, signOut } = useCurrentUser();
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const router = useRouter();
  const getIsMounted = useMountedState();

  const [isSaving, setIsSavingState] = useState(false);
  const [tab, setTab] = useState(Tab.Profile);
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const [newAvatarFile, setNewAvatarFile] = useState<File>(null);
  const [valuesFields, setValuesFields] = useState<Fields>(initialState);

  const userID = currentUser?.attributes?.sub;

  const closeWindow = () => {
    close();
  };

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

  useEffect(
    () => {
      if (!userID) {
        logger.error('Settings: No user in settings menu');
        router.push('/sign-in')
          .catch(() => {
            logger.error('error when redirecting to /sign-in');
          });
      }
    },
    [],
  );

  const { data: { getUser: userInfo } = {}, loading: isLoading } = useQuery<GetUserQuery>(
    gql(getUser),
    {
      variables: { id: userID },
      onCompleted(data) {
        const user = data.getUser;
        if (!user) {
          logger.error('Settings: no User found', { input: { id: userID } });
          setFlash("Something went wrong. We're looking into it");
        }
        if (!getIsMounted()) return;
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
      },
      onError(error) {
        if (!getIsMounted()) return;
        logger.error('Settings: error while finding current User', { error, input: { id: userID } });
        setFlash("Something went wrong. We're looking into it");
      },
    },
  );

  const { value: userAvatar, loading: userAvatarIsLoading } = useStorageLink(
    valuesFields.avatar.key,
    [valuesFields.avatar.key],
  );

  const { value: stripeAccountStatus } = useAsync(
    async () => {
      if (!userInfo) {
        return StripeStatus.ERROR;
      }
      if (!userInfo.stripeAccountID) {
        return StripeStatus.NOT_STARTED;
      }
      try {
        const { data } = await axios.get<StripeInfoResponse>(
          `${STRIPE_API_URL}/account/${userInfo.stripeAccountID}`,
          { withCredentials: true },
        );

        const {
          charges_enabled: chargesEnabled,
          details_submitted: detailsSubmitted,
        } = data;
        if (!detailsSubmitted) {
          return StripeStatus.INCOMPLETE;
        } if (chargesEnabled) {
          return StripeStatus.COMPLETED;
        }
        return StripeStatus.CHARGES_DISABLED;
      } catch {
        return StripeStatus.NOT_STARTED;
      }
    },
    [userInfo],
  );

  const setIsSaving = (value: boolean) => {
    if (!getIsMounted()) return;
    setIsSavingState(value);
  };

  const continueWithStripe = () => {
    window.open('https://connect.stripe.com/setup/s/ty02aUVDSnGF');
  };

  const connectToStripe = async (isRefresh = false) => {
    setIsSaving(true);
    let stripeAccountID: string;
    let stripeOnboardingUrl: string;

    const onboardUrl = isRefresh ? `${STRIPE_API_URL}/onboard-user/refresh` : `${STRIPE_API_URL}/onboard-user`;
    const body = isRefresh ? { accountID: userInfo.stripeAccountID } : {};

    try {
      const { data } = await axios.post<StripeOnBoardResponse>(onboardUrl, body, { withCredentials: true });
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInvalids({});
    setIsSaving(true);

    const validation = validate();

    if (Object.keys(validation).length) {
      setInvalids(validation);
      setIsSaving(false);
    }

    const avatarS3Key = valuesFields.avatar?.key ?? '';
    let avatar = { key: avatarS3Key, tag: 'avatar' };

    // update avatar
    if (newAvatarFile) {
      avatar = await createOrUpdateAvatar({
        key: avatarS3Key,
        name: newAvatarFile.name,
        file: newAvatarFile,
        page: 'Settings',
        logger,
      });
    }

    const updateUserInput = {
      id: valuesFields?.id,
      name: valuesFields?.name,
      title: valuesFields?.title ?? '',
      email: valuesFields?.email,
      avatar,
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
      if (getIsMounted()) {
        setIsSaving(false);
      }
    }
  };

  const resetPassword = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    signOut('/forgot-password').catch(() => {
      logger.error('error when redirecting to /forgot-password');
    });
  };

  const chooseStatusIndicator = () => {
    if (isLoading) return <div className={classnames(styles.stripeStatus, styles.white)}>Loading...</div>;
    switch (stripeAccountStatus) {
      case StripeStatus.NOT_STARTED:
        return <Button
                inverted
                onClick={() => continueWithStripe()}
                isLoading={isSaving}
                className={styles.paymentButton}
              >
                Continue Connecting with Stripe
              </Button>;
      case StripeStatus.INCOMPLETE:
        return <Button
                inverted
                onClick={() => connectToStripe()}
                isLoading={isSaving}
                className={styles.paymentButton}
              >
                Continue Connecting with Stripe
              </Button>;
      case StripeStatus.COMPLETED:
        return <div className={classnames(styles.stripeStatus, styles.green)}>You are connected with Stripe</div>;
      case StripeStatus.CHARGES_DISABLED:
        return <div className={classnames(styles.stripeStatus, styles.yellow)}>Your connection is being established</div>;
      case StripeStatus.ERROR:
      default:
        return <div className={classnames(styles.stripeStatus, styles.red)}>Please check back later</div>;
    }
  };

  const userAvatarImage = useMemo(
    () => {
      if (isLoading || userAvatarIsLoading || userAvatar) {
        return userAvatar;
      }
      if (currentUser.attributes.email) {
        return `https://www.gravatar.com/avatar/${md5(currentUser.attributes.email)}?d=${DEFAULT_GRAVATAR}`;
      }
      return null;
    },
    [isLoading, userAvatarIsLoading, userAvatar, currentUser.attributes.email],
  );

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
          <FontAwesomeIcon color="#595959" icon={faXmark} />
        </div>
      </div>
      <div className={classnames(modalStyles.body, styles.body, 'columns')}>
        <div className={classnames(styles.left, 'column', 'is-narrow')}>
          <div className={styles.buttons_container}>
            <Button
              inverted={tab === Tab.Profile}
              onClick={() => setTab(Tab.Profile)}
              icon={<FontAwesomeIcon icon={faUserAstronaut} />}
            >
              Profile
            </Button>
            <Protected feature={Features.Payments}>
              <Button
                inverted={tab === Tab.Payments}
                onClick={() => setTab(Tab.Payments)}
                icon={<FontAwesomeIcon icon={faSackDollar} />}
              >
                Payment
              </Button>
            </Protected>
          </div>
          {
            tab === Tab.Profile ?
              <Button
                onClick={(event) => resetPassword(event)}
              >
                Reset Password
              </Button>
              : null
          }
        </div>
        <div className={classnames(styles.right, 'column')}>
          {tab === Tab.Profile && (
            <form onSubmit={handleSubmit} style={{ height: '100%' }}>
              <div className={styles.profileSettingsWrapper}>
                <AvatarUpload
                  avatarName="avatar"
                  isLoading={isLoading || userAvatarIsLoading}
                  onChange={setNewAvatarFile}
                  image={userAvatarImage}
                  className={styles.avatarContainer}
                />
                <div className={styles.inputsContainer}>
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
                    <Button
                      onClick={() => closeWindow()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSaving}
                      inverted
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          {tab === Tab.Payments && (
            <>
              <div className={styles.connect}>Connect your payment gateway</div>
              {chooseStatusIndicator()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
