import { useState } from 'react';
import Link from 'next/link';
import Logo from '../img/logo.svg';
import styles from './signUp.module.scss';
import { GoogleAuthButton } from '../components/googleAuthButton';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleCreateAccountClick(e) {
    e.preventDefault();
  }

  function handleSignUpwithGoogleClick(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.signUp}>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Sign Up for Continuum</h1>
      <form className={styles.body}>
        <GoogleAuthButton onClick={handleSignUpwithGoogleClick}>
          Sign Up with Google
        </GoogleAuthButton>
        <div className="text-1 text-gray mbm">Or, sign up with Email</div>
        <input value={name} onChange={({ target }) => setName(target.value)} placeholder="Name" className="input-1" />
        <input value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" className="input-1" />
        <input value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Password" className="input-1" />
        <div className="text-1 mbm">
          By signing up I agree to the
          {' '}
          <Link href="/termsOfService"><a href="/termsOfService">Terms of Service</a></Link>
        </div>
        <button onClick={handleCreateAccountClick} type="button" className="oval-btn-2 mbm">Create a Free Account</button>
        <div>
          <Link href="/signIn"><a href="/signIn">Sign In</a></Link>
          {' '}
          with existing account
        </div>
      </form>
    </div>
  );
}

export default SignUp;
