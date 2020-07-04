import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import Router from 'next/router';
import serialize from 'form-serialize';
import styles from './signIn.module.scss';
import pageStyles from './authPage.module.scss';
import { ConfirmSignUp } from '../components/confirmSignUp';
import { GoogleAuthButton } from '../components/googleAuthButton';
import ForgotPassword from '../img/forgotPassword.svg';
import Logo from '../img/logo.svg';

interface ValidationProps {
  email?: string
  password?: string
}

function SignIn(): React.FC {
  const [emailInState, setEmailInState] = useState('');
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

  async function checkContact(user: object) {
    try {
      const data: { verified: { email?: string }, unverified: {} } = await Auth.verifiedContact(user);
      if (data.verified.email) {
        Router.push('/');
      } else {
        setError('');
        setRequestPending(false);
        setConfirming(true);
      }
    } catch (err) {
      setError(err.message);
      setRequestPending(false);
    }
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
      const user = await Auth.signIn(email, password);
      checkContact(user);
    } catch (err) {
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

  return isConfirming ? <ConfirmSignUp email={emailInState} parentPage="signIn" setConfirming={setConfirming} /> : (
    <div className={pageStyles.authPage}>
      <div className="flash-message">{error}</div>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Sign in to Continuum</h1>
      <form onSubmit={handleSignInClick} className={pageStyles.body}>
        <input name="email" className={`${invalids.email ? pageStyles[invalids.email] : ''} input-1`} type="email" placeholder="Email" />
        <input
          name="password"
          className={`${invalids.password ? pageStyles[invalids.password] : ''} input-1`}
          type="password"
          placeholder="Password"
        />
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
        <GoogleAuthButton onClick={handleGoogleSignInClick}>Sign in to Continuum</GoogleAuthButton>
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
}

export default SignIn;
