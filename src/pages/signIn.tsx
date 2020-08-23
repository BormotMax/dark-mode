import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import serialize from 'form-serialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '@aws-amplify/auth';
import { ConfirmSignUp } from '../components/confirmSignUp';
import ForgotPassword from '../img/forgotPassword.svg';
import styles from './styles/signIn.module.scss';
import pageStyles from './styles/authPage.module.scss';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';
import EmailIcon from '../img/email.svg';
import { ProjectHeader } from '../components/projectHeader';
import { GoogleAuthButton } from '../components/googleAuthButton';

interface ValidationProps {
  email?: string;
  password?: string;
}

const SignIn: React.FC<AuthProps> = ({ signIn }) => {
  const [emailInState, setEmailInState] = useState('');
  const [isPasswordShowing, setPasswordShowing] = useState(false);
  const [isConfirming, setConfirming] = useState(false);
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState<ValidationProps>({});

  function validate({ email, password }: ValidationProps) {
    const temp: ValidationProps = {};

    if (!email) temp.email = 'error';
    if (!password) temp.password = 'error';
    return temp;
  }

  async function handleGoogleSignInClick(e: MouseEvent) {
    e.preventDefault();
    setError('');
    setInvalids({});

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await Auth.federatedSignIn({ provider: 'Google' });
    } catch (err) {
      setError(err.message);
    }
  }
  async function handleSignInClick(e: FormEvent) {
    e.preventDefault();
    setRequestPending(true);
    setError('');
    setInvalids({});

    const formData = serialize(e.target, { hash: true });
    const { email, password } = formData;

    const validation = validate(formData);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    setEmailInState(email);

    try {
      const isConfirmed = await signIn(email, password);
      // If the user is confirmed, withAuthentication HOC will redirect to /hirePageEditor
      // and the following lines won't be executed
      if (!isConfirmed) {
        setError('');
        setRequestPending(false);

        setConfirming(true);
      }
    } catch (err) {
      // could not sign in
      setError(err.message);
      setRequestPending(false);

      if (err.code === 'UserNotConfirmedException') {
        setError('');
        setConfirming(true);
      } else if (err.code === 'PasswordResetRequiredException') {
        Router.push('/forgotPassword');
      }
    }
  }

  function handleEyeballClick(e) {
    if ((e as any).keyCode === undefined || (e as any).keyCode === 13) {
      setPasswordShowing(!isPasswordShowing);
    }
  }

  return isConfirming ? (
    <ConfirmSignUp email={emailInState} parentPage="signIn" setConfirming={setConfirming} />
  ) : (
    <div className={pageStyles.authPage}>
      <ProjectHeader headerText="Sign In to Continuum" />
      <div className="flash-message">{error}</div>
      <form onSubmit={handleSignInClick} className={pageStyles.body}>
        <div className={pageStyles.inputWrapper}>
          <input name="email" className={`${invalids.email ? pageStyles[invalids.email] : ''} input-1`} type="email" placeholder="Email" />
          <EmailIcon />
        </div>
        <div className={pageStyles.inputWrapper}>
          <input
            name="password"
            className={`${invalids.password ? pageStyles[invalids.password] : ''} input-1`}
            type={isPasswordShowing ? 'text' : 'password'}
            placeholder="Password"
          />
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div role="button" className={styles.eyeIconWrapper} onKeyDown={handleEyeballClick} onClick={handleEyeballClick}>
            {isPasswordShowing ? (
              <FontAwesomeIcon color="#BDBDBD" tabIndex={0} icon={faEyeSlash} size="1x" />
            ) : (
              <FontAwesomeIcon color="#BDBDBD" tabIndex={0} icon={faEye} size="1x" />
            )}
          </div>
        </div>
        <div className={styles.forgotPassword}>
          <Link href="/forgotPassword">
            <a href="/forgotPassword">
              <ForgotPassword />
            </a>
          </Link>
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}
        >
          Sign In
        </button>
        <div className="text-1 text-gray">Or...</div>
        <GoogleAuthButton onClick={handleGoogleSignInClick as any}>Sign in to Continuum</GoogleAuthButton>
        <div>
          No account?{' '}
          <Link href="/signUp">
            <a href="/signUp">Sign Up</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default WithAuthentication(SignIn, { routeType: RouteType.SIGNED_OUT });
