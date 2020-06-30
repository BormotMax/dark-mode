import { useState } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import Router from 'next/router';
import serialize from 'form-serialize';
import styles from './signIn.module.scss';
import pageStyles from './authPage.module.scss';
import Logo from '../img/logo.svg';
import ForgotPassword from '../img/forgotPassword.svg';
import { GoogleAuthButton } from '../components/googleAuthButton';

function SignIn() {
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState({});

  function validate({ email, password }) {
    const temp = {};

    if (!email) temp.email = 'error';
    if (!password) temp.password = 'error';
    return temp;
  }

  function checkContact(user) {
    Auth.verifiedContact(user).then((data) => {
      if (data.verified.email) {
        Router.push('/');
      } else {
        Router.push('/confirmSignUp');
      }
    });
  }

  async function handleGoogleSignInClick(e) {
    e.preventDefault();
  }

  async function handleSignInClick(e) {
    e.preventDefault();
    setRequestPending(true);
    setError('');
    setInvalids({});

    const formData = serialize(e.target, { hash: true });
    const validation = validate(formData);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    try {
      const user = await Auth.signIn(formData.email, formData.password);
      checkContact(user);
    } catch (err) {
      setError(err.message);
      setRequestPending(false);

      if (err.code === 'UserNotConfirmedException') {
        Router.push('/confirmSignUp');
      } else if (err.code === 'PasswordResetRequiredException') {
        Router.push('/resetPassword');
      }
    }
  }

  return (
    <div className={pageStyles.authPage}>
      <div className="flash-message">{error}</div>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Sign in to Continuum</h1>
      <form onSubmit={handleSignInClick} className={pageStyles.body}>
        <input name="email" className={`${pageStyles[invalids.email]} input-1`} type="email" placeholder="Email" />
        <input name="password" className={`${pageStyles[invalids.password]} input-1`} type="password" placeholder="Password" />
        <div className={styles.forgotPassword}>
          <Link href="/resetPassword">
            <a href="resetPassword">
              <ForgotPassword />
            </a>
          </Link>
        </div>
        <button disabled={isRequestPending} type="submit" className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}>Sign In</button>
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
