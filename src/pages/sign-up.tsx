import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import Auth from '@aws-amplify/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import { ConfirmSignUp } from '../components/confirmSignUp';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import EmailIcon from '../img/email.svg';
import NameIcon from '../img/name.svg';
import { GoogleAuthButton } from '../components/googleAuthButton';
import { useLogger, useFlash } from '../hooks';
import AuthLogo from '../components/svgIcons/AuthLogo';

import styles from './styles/authPage.module.scss';

interface ValidationProps {
  name?: string;
  email?: string;
  password?: string;
}

const TERMS_CONDITIONS = '/terms-and-conditions';
const SIGN_IN = '/sign-in';

const SignUp: React.FC = memo(() => {
  const [emailInState, setEmailInState] = useState('');
  const [isPasswordShowing, setPasswordShowing] = useState(false);
  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [isRequestPending, setRequestPending] = useState(false);
  const { setFlash } = useFlash();
  const [valuesFields, setValuesFields] = useState<Record<string, string>>({ name: '', email: '', password: '' });
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();

  function validate({ name, email, password }: ValidationProps) {
    const temp: ValidationProps = {};
    if (!name) temp.name = 'error';
    if (!email) temp.email = 'error';
    if (!password) temp.password = 'error';
    return temp;
  }

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

  async function handleCreateAccountClick() {
    setRequestPending(true);
    setFlash('');
    setInvalids({});

    const { email, password, name } = valuesFields;
    const validation = validate(valuesFields);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    const signUpInput = {
      username: email,
      password,
      attributes: {
        name,
        'custom:group': 'FREELANCER',
      },
    };

    setEmailInState(email);

    try {
      await Auth.signUp(signUpInput);
      setFlash('');
      setRequestPending(false);
      setConfirming(true);
    } catch (error) {
      setFlash(error.message);
      logger.error('SignUp: error in Auth.signUp', { error, input: signUpInput });
      setRequestPending(false);
    }
  }

  async function handleSignUpwithGoogleClick(e: MouseEvent) {
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

  function handleEyeballClick(e: any) {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setPasswordShowing(!isPasswordShowing);
    }
  }

  return isConfirming ? (
    <ConfirmSignUp email={emailInState} parentPage="signUp" setConfirming={setConfirming} />
  ) : (
    <div className={styles.authPage}>
      <div className={classnames(styles.logoWrapper, styles.logoMarginSignup)}>
        <Link href="/">
          <a>
            <AuthLogo />
          </a>
        </Link>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>Sign up for Continuum</div>
        <GoogleAuthButton onClick={handleSignUpwithGoogleClick as any}>Sign Up with Google</GoogleAuthButton>
        <div className="text-1 text-drkgray mbm">Or, sign up with Email</div>
        <div className={styles.inputWrapper}>
          <label htmlFor="name" className={styles.labelInput}>
            Name
          </label>
          <input
            name="name"
            value={valuesFields.name}
            onChange={onChangeInput}
            onBlur={onBlurInput}
            type="text"
            placeholder="Full Name"
            className={classnames(
              styles.inputBlock,
              { [styles[invalids.name]]: invalids.name },
            )}
          />
          <NameIcon />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="email" className={styles.labelInput}>
            Email
          </label>
          <input
            name="email"
            value={valuesFields.email}
            onChange={onChangeInput}
            onBlur={onBlurInput}
            type="email"
            placeholder="Email"
            className={classnames(
              styles.inputBlock,
              { [styles[invalids.email]]: invalids.email },
            )}
          />
          <EmailIcon />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password" className={styles.labelInput}>
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
              styles.inputBlock,
              { [styles[invalids.password]]: invalids.password },
            )}
          />
          <div
            role="button"
            tabIndex={0}
            className={styles.eyeIconWrapper}
            onKeyDown={handleEyeballClick}
            onClick={handleEyeballClick}
          >
            {isPasswordShowing ? (
              <FontAwesomeIcon color="#BDBDBD" tabIndex={0} icon={faEyeSlash} size="1x" />
            ) : (
              <FontAwesomeIcon color="#BDBDBD" tabIndex={0} icon={faEye} size="1x" />
            )}
          </div>
        </div>
        <div className="text-1 mbm">
          By signing up I agree to the{' '}
          <Link href={TERMS_CONDITIONS}>
            <a href={TERMS_CONDITIONS}>Terms of Service</a>
          </Link>
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          onClick={handleCreateAccountClick}
          className={classnames(
            { 'is-loading': isRequestPending },
            'defaultButton',
            styles.submitButton,
          )}
        >
          Create a Free Account
        </button>
        <div>
          <Link href={SIGN_IN}>
            <a href={SIGN_IN}>Sign In</a>
          </Link>{' '}
          with existing account
        </div>
      </div>
      <div className={styles.footer} />
    </div>
  );
});

SignUp.displayName = 'SignUp';

export default WithAuthentication(SignUp, { routeType: RouteType.SIGNED_OUT });
