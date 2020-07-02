/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react';
import { Auth } from '@aws-amplify/auth';
import Router from 'next/router';
import serialize from 'form-serialize';
import Logo from '../../img/logo.svg';
import styles from '../../pages/authPage.module.scss';
import s from './confirmSignUp.module.scss';

export function ConfirmSignUp({ email, parentPage, setConfirming }) {
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState({});

  function validate({ code }, { exclude = [] } = {}) {
    const temp = {};

    if (!code && !exclude.includes('code')) temp.code = 'error';
    return temp;
  }

  async function handleConfirmClick(e) {
    e.preventDefault();
    setRequestPending(true);
    setError('');
    setInvalids({});

    const formData = serialize(e.target, { hash: true });
    const { code } = formData;
    const validation = validate(formData);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    try {
      await Auth.confirmSignUp(email, code);
      Router.push('/signIn');
    } catch (err) {
      setError(err.message);
      setRequestPending(false);
    }
  }

  async function handleResendCode(e, form) {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setRequestPending(true);
      setError('');
      setInvalids({});

      const formData = serialize(form || e.target, { hash: true });
      const validation = validate(formData, { exclude: ['code'] });

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
        <input readOnly value={email} name="email" className={`${styles[invalids.email]} input-1`} placeholder="Email" />
        <input name="code" className={`${styles[invalids.code]} input-1`} placeholder="Enter your code" />
        <div
          // pass the parent element (the form) so the same handler can be used to serialize it
          onKeyDown={(e) => handleResendCode(e, e.target.parentElement)}
          onClick={(e) => handleResendCode(e, e.target.parentElement)}
          tabIndex="0"
          role="button"
          className={`${s.resendCode} text-1 text-gray tal`}
        >
          Resend code
        </div>
        <button disabled={isRequestPending} type="submit" className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}>
          Confirm
        </button>
        <div>
          <a role="link" onClick={() => setConfirming(false)}>
            Back to
            {' '}
            {parentPage === 'signIn' ? 'Sign In' : 'Sign Up'}
          </a>
        </div>
      </form>
    </div>
  );
}
