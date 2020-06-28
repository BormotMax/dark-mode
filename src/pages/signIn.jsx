import { useState } from 'react';
import Link from 'next/link';
import styles from './signIn.module.scss';

function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className={styles.signIn}>
      <div>C</div>
      <div>Sign in to Continuum</div>
      <div>
        <input
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>Forgot Password?</div>
      <div>
        <button type="button" className="oval-btn">Sign In</button>
      </div>
      <div>Or...</div>
      <div>
        <button type="button" className="oval-btn">Sign In with Google</button>
      </div>
      <div>
        No account?
        {' '}
        <Link href="/signUp">
          <a href="/signUp">Sign Up</a>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
