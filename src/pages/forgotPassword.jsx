import { useState } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import serialize from 'form-serialize';
import Router from 'next/router';
import Logo from '../img/logo.svg';
import styles from './authPage.module.scss';
import ResetPassword from '../components/resetPassword/resetPassword';

function ForgotPassword() {
  const [emailInState, setEmailInState] = useState('');
  const [isConfirming, setConfirming] = useState(false);
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState({});

  function validate({ email }) {
    const temp = {};

    if (!email) temp.email = 'error';
    return temp;
  }

  async function handleSendCodeClick(e) {
    e.preventDefault();

    setRequestPending(true);
    setError('');
    setInvalids({});

    const formData = serialize(e.target, { hash: true });
    const { email } = formData;

    const validation = validate(formData);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    setEmailInState(email);

    try {
      await Auth.forgotPassword(formData.email);
      setError('');
      setRequestPending(false);
      setConfirming(true);
    } catch (err) {
      setError(err.message);
      setRequestPending(false);
    }
  }

  return isConfirming ? <ResetPassword email={emailInState} /> : (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Reset your password</h1>
      <form onSubmit={handleSendCodeClick} className={styles.body}>
        <input name="email" className={`${styles[invalids.email]} input-1`} type="email" placeholder="Email" />
        <button disabled={isRequestPending} type="submit" className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}>Send Code</button>
        <div>
          <Link href="/signIn"><a href="/signIn">Back to Sign In</a></Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
