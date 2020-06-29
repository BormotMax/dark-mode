import { useState } from 'react';
import Link from 'next/link';
import styles from './signIn.module.scss';
import pageStyles from './authPage.module.scss';
import Logo from '../img/logo.svg';
import ForgotPassword from '../img/forgotPassword.svg';
import { GoogleAuthButton } from '../components/googleAuthButton';

function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleGoogleSignInClick(e) {
    e.preventDefault();
  }

  function handleSignInClick(e) {
    e.preventDefault();
  }

  return (
    <div className={pageStyles.authPage}>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Sign in to Continuum</h1>
      <div className={pageStyles.body}>
        <input type="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" className="input-1" />
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Password" className="input-1" />
        <div className={styles.forgotPassword}>
          <Link href="/resetPassword">
            <a href="resetPassword">
              <ForgotPassword />
            </a>
          </Link>
        </div>
        <button onClick={handleSignInClick} type="button" className="oval-btn-2 mbm">Sign In</button>
        <div className="text-1 text-gray">Or...</div>
        <GoogleAuthButton onClick={handleGoogleSignInClick}>Sign in to Continuum</GoogleAuthButton>
        <div>
          No account?
          {' '}
          <Link href="/signUp">
            <a href="/signUp">Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
