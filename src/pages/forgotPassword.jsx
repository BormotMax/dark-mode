import { useState } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import serialize from 'form-serialize';
import Router from 'next/router';
import Logo from '../img/logo.svg';
import styles from './authPage.module.scss';

function ForgotPassword() {
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
    const validation = validate(formData);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    try {
      await Auth.forgotPassword(formData.email);
      Router.push('/resetPassword');
    } catch (err) {
      setError(err.message);
      setRequestPending(false);
    }
  }

  return (
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
