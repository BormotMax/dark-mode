import { useState } from 'react';
import Link from 'next/link';
import Logo from '../img/logo.svg';
import styles from './authPage.module.scss';

function ResetPassword() {
  const [email, setEmail] = useState('');

  function handleSendCodeClick(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.authPage}>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Reset your password</h1>
      <form className={styles.body}>
        <input value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" className="input-1" />
        <button onClick={handleSendCodeClick} type="button" className="oval-btn-2 mbm">Send Code</button>
        <div>
          <Link href="/signIn"><a href="/signIn">Back to Sign In</a></Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
