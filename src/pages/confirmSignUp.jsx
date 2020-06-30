import { useState } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import Router from 'next/router';
import Logo from '../img/logo.svg';
import styles from './authPage.module.scss';
import s from './confirmSignUp.module.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState({});

  function validate({ exclude = [] } = {}) {
    const temp = {};

    if (!email && !exclude.includes('email')) temp.email = 'error';
    if (!code && !exclude.includes('code')) temp.code = 'error';
    return temp;
  }

  async function handleConfirmClick(e) {
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

    try {
      await Auth.confirmSignUp(email, code);
      Router.push('/');
    } catch (err) {
      setError(err.message);
      setRequestPending(false);
    }
  }

  async function handleResendCode(e) {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setRequestPending(true);
      setError('');
      setInvalids({});

      const validation = validate({ exclude: ['code'] });

      if (Object.keys(validation).length) {
        setRequestPending(false);
        setInvalids(validation);
        return;
      }

      try {
        await Auth.resendSignUp(email);
        setError('A new code has been sent to your email.');
      } catch (err) {
        setError(err.message);
      } finally {
        setRequestPending(false);
      }
    }
  }

  return (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Confirm Sign Up</h1>
      <form onSubmit={handleConfirmClick} className={styles.body}>
        <input className={`${styles[invalids.email]} input-1`} value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
        <input className={`${styles[invalids.code]} input-1`} value={code} onChange={({ target }) => setCode(target.value)} placeholder="Enter your code" />
        <div onKeyDown={handleResendCode} tabIndex="0" role="button" onClick={handleResendCode} className={`${s.resendCode} text-1 text-gray tal`}>Resend code</div>
        <button disabled={isRequestPending} type="submit" className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}>Confirm</button>
        <div>
          <Link href="/signIn"><a href="/signIn">Back to Sign In</a></Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
