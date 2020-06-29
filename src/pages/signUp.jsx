import { useState } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import Router from 'next/router';
import Logo from '../img/logo.svg';
import styles from './authPage.module.scss';
import { GoogleAuthButton } from '../components/googleAuthButton';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState({});

  function validate() {
    const temp = {};

    if (!name) temp.name = 'error';
    if (!email) temp.email = 'error';
    if (!password) temp.password = 'error';
    return temp;
  }

  async function handleCreateAccountClick(e) {
    e.preventDefault();
    setRequestPending(true);
    setError('');
    setInvalids({});

    const validation = validate();

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    const signupInfo = {
      username: email,
      password,
      attributes: {
        name,
      },
    };

    try {
      const data = await Auth.signUp(signupInfo);
      Router.push('/confirmSignUp');
    } catch (err) {
      setError(err.message);
    } finally {
      setRequestPending(false);
    }
  }

  function handleSignUpwithGoogleClick(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Sign Up for Continuum</h1>
      <form onSubmit={handleCreateAccountClick} className={styles.body}>
        <GoogleAuthButton onClick={handleSignUpwithGoogleClick}>
          Sign Up with Google
        </GoogleAuthButton>
        <div className="text-1 text-gray mbm">Or, sign up with Email</div>
        <input className={`${styles[invalids.name]} input-1`} type="text" value={name} onChange={({ target }) => setName(target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" className="input-1" />
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Password" className="input-1" />
        <div className="text-1 mbm">
          By signing up I agree to the
          {' '}
          <Link href="/termsOfService"><a href="/termsOfService">Terms of Service</a></Link>
        </div>
        <button disabled={isRequestPending} type="submit" className="oval-btn-2 mbm">Create a Free Account</button>
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
