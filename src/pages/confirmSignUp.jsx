import { useState } from 'react';
import Link from 'next/link';
import Logo from '../img/logo.svg';
import styles from './confirmSignUp.module.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  function handleConfirmClick(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.confirmSignUp}>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Confirm Sign Up</h1>
      <form className={styles.body}>
        <input value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email" className="input-1" />
        <input value={code} onChange={({ target }) => setCode(target.value)} placeholder="Enter your code" className="input-1" />
        <button onClick={handleConfirmClick} type="button" className="oval-btn-2 mbm">Confirm</button>
        <div>
          <Link href="/signIn">Back to Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
