import { useState } from 'react';
import Link from 'next/link';
import styles from './signIn.module.scss';
import Logo from '../img/logo.svg';
import ForgotPassword from '../img/forgotPassword.svg';
import { GoogleAuthButton } from '../components/googleAuthButton';

function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleGoogleSignInClick(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.logo}><Logo /></div>
      <div className={styles.signInText}>Sign in to Continuum</div>
      <div className={styles.body}>
        <div>
          <input
            className="input-1"
            type="email"
            value={email}
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          <input
            className="input-1"
            placeholder="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className={styles.forgotPassword}>
          <Link href="/resetPassword">
            <a href="resetPassword">
              <ForgotPassword />
            </a>
          </Link>
        </div>
        <div className={styles.signInButton}>
          <button type="button" className="oval-btn-2">Sign In</button>
        </div>
        <div className={styles.or}>Or...</div>
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
