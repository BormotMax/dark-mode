import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import Auth from '@aws-amplify/auth';
import classnames from 'classnames';

import ForgotPassword from '../img/forgotPassword.svg';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';
import { GoogleAuthButton } from '../components/googleAuthButton';
import { useLogger, useFlash } from '../hooks';
import AuthLogo from '../components/svgIcons/AuthLogo';

import styles from './styles/signIn.module.scss';
import pageStyles from './styles/authPage.module.scss';

interface ValidationProps {
  email?: string;
  password?: string;
}

const FORGOT_PASSWORD = '/forgot-password';

const SignIn: React.FC<AuthProps> = ({ signIn }) => {
  const [isPasswordShowing, setPasswordShowing] = useState(false);
  const [isRequestPending, setRequestPending] = useState(false);
  const [valuesFields, setValuesFields] = useState<Record<string, string>>({ email: '', password: '' });
  const { setFlash } = useFlash();
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { target: { name, value } = {} } = event;
      setValuesFields((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }, [setValuesFields],
  );

  const onBlurInput = useCallback((event: React.FocusEvent<HTMLInputElement>): void => {
    const { target: { name, value } = {} } = event;
    setValuesFields((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  }, [setValuesFields]);

  function validate({ email, password }: ValidationProps) {
    const temp: ValidationProps = {};
    if (!email) temp.email = 'error';
    if (!password) temp.password = 'error';
    return temp;
  }

  async function handleGoogleSignInClick(e: MouseEvent) {
    e.preventDefault();
    setFlash('');
    setInvalids({});

    const federatedSignInInput = { provider: 'Google' };
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await Auth.federatedSignIn(federatedSignInInput);
    } catch (error) {
      setFlash(error.message);
      logger.error('SignIn: error in Auth.federatedSignIn', { error, input: federatedSignInInput });
    }
  }

  async function handleSignInClick() {
    setRequestPending(true);
    setFlash('');
    setInvalids({});

    const { email, password } = valuesFields;
    const validation = validate(valuesFields);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    try {
      const isConfirmed = await signIn(email, password);
      // If the user is confirmed, withAuthentication HOC will redirect to /projects
      // and the following lines won't be executed
      if (!isConfirmed) {
        setFlash('');
        setRequestPending(false);
      }
    } catch (error) {
      setFlash(error.message);
      logger.error('SignIn: error signing in', { error, input: { email } });
      setRequestPending(false);

      if (error.code === 'UserNotConfirmedException') {
        setFlash('');
      } else if (error.code === 'PasswordResetRequiredException') {
        Router.push('/forgot-password');
      }
    }
  }

  function handleEyeballClick(e: any) {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setPasswordShowing(!isPasswordShowing);
    }
  }

  return (
    <div className={styles.container}>
      <div className={classnames(pageStyles.logoWrapper, pageStyles.logoMarginLarge)}>
        <Link href="/">
          <a>
            <AuthLogo />
          </a>
        </Link>
      </div>
      <div className={styles.title}>Welcome back to Continuum!</div>
      <div className={styles.body}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email-input" className={styles.labelInput}>
            Name
          </label>
          <input
            id="email-input"
            name="email"
            value={valuesFields.email}
            onChange={onChangeInput}
            onBlur={onBlurInput}
            type="email"
            placeholder="Email"
            className={classnames(
              pageStyles.inputBlock,
              { [pageStyles[invalids.password]]: invalids.password },
            )}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="email-input" className={styles.labelInput}>
            Password
          </label>
          <input
            name="password"
            value={valuesFields.password}
            onChange={onChangeInput}
            onBlur={onBlurInput}
            type={isPasswordShowing ? 'text' : 'password'}
            placeholder="Password"
            className={classnames(
              pageStyles.inputBlock,
              { [pageStyles[invalids.password]]: invalids.password },
            )}
          />
          <div tabIndex={0} role="button" className={styles.eyeIconWrapper} onKeyDown={handleEyeballClick} onClick={handleEyeballClick}>
            {isPasswordShowing ? (
              <FontAwesomeIcon color="#BDBDBD" tabIndex={0} icon={faEyeSlash} size="1x" />
            ) : (
              <FontAwesomeIcon color="#BDBDBD" tabIndex={0} icon={faEye} size="1x" />
            )}
          </div>
        </div>
        <div className={styles.forgotPassword}>
          <Link href={FORGOT_PASSWORD}>
            <a href={FORGOT_PASSWORD}>
              <ForgotPassword />
            </a>
          </Link>
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          onClick={handleSignInClick}
          className={classnames(
            { 'is-loading': isRequestPending },
            'defaultButton',
            styles.signInButton,
          )}
        >
          Sign In
        </button>
        <div className={styles.optionsDivider}>
          <div className={styles.divider} />
          <div className={styles.optionText}>or</div>
          <div className={styles.divider} />
        </div>
        <GoogleAuthButton onClick={handleGoogleSignInClick as any}>Sign In with Google</GoogleAuthButton>
        <div>
          No account?{' '}
          <Link href="/sign-up">
            <a>Sign Up</a>
          </Link>
        </div>
      </div>
      <div className={pageStyles.footer} />
    </div>
  );
};

export default WithAuthentication(SignIn, { routeType: RouteType.SIGNED_OUT });
