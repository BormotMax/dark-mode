import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import serialize from 'form-serialize';
import { ConfirmSignUp } from '../components/confirmSignUp';
import ForgotPassword from '../img/forgotPassword.svg';
import Logo from '../img/logo.svg';
import styles from './styles/signIn.module.scss';
import pageStyles from './styles/authPage.module.scss';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';
import EyeIcon from '../img/eye.svg';
import EmailIcon from '../img/email.svg';
import NameIcon from '../img/name.svg';
import { ProjectHeader } from '../components/projectHeader';

interface ValidationProps {
  email?: string
  password?: string
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

  function handleGoogleSignInClick(e: MouseEvent) {
    e.preventDefault();
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
      // If the user is confirmed, withAuthentication HOC will redirect to /dashboard
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

  return isConfirming ? <ConfirmSignUp email={emailInState} parentPage="signIn" setConfirming={setConfirming} /> : (
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
          <div role="button" className={pageStyles.eyeIconWrapper} onKeyDown={handleEyeballClick} tabIndex={0} onClick={handleEyeballClick}>
            <EyeIcon />
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
        {/* <div className="text-1 text-gray">Or...</div> */}
        {/* <GoogleAuthButton onClick={handleGoogleSignInClick as any}>Sign in to Continuum</GoogleAuthButton> */}
        <div>
          No account?
          {' '}
          <Link href="/signUp">
            <a href="/signUp">Sign Up</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default WithAuthentication(SignIn, { routeType: RouteType.SIGNED_OUT });
