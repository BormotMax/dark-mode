/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, FormEvent, KeyboardEvent, MouseEvent } from 'react';
import { Auth } from '@aws-amplify/auth';
import Router from 'next/router';
import serialize from 'form-serialize';
import styles from '../../pages/styles/authPage.module.scss';
import s from './confirmSignUp.module.scss';
import { ProjectHeader } from '../projectHeader';
import { useLogger } from '../../hooks';

interface ConfirmSignUpProps {
  email: string;
  parentPage: string;
  setConfirming: Function;
}

interface ValidationProps {
  code?: string;
  email?: string;
}

export const ConfirmSignUp: React.FC<ConfirmSignUpProps> = ({ email, parentPage, setConfirming }) => {
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();

  function validate({ code }: ValidationProps, exclude: Array<string> = []) {
    const temp: ValidationProps = {};

    if (!code && !exclude.includes('code')) temp.code = 'error';
    return temp;
  }

  async function handleConfirmClick(e: FormEvent) {
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
      logger.error('ConfirmSignUp: error confirming sign up', { error: err, input: { email, code } });
      setError(err.message);
      setRequestPending(false);
    }
  }

  async function handleResendCode(e: KeyboardEvent | MouseEvent) {
    if ((e as any).keyCode === undefined || (e as any).keyCode === 13) {
      setRequestPending(true);
      setError('');
      setInvalids({});

      const formData = serialize((e.target as HTMLFormElement).parentElement, { hash: true });
      const validation = validate(formData, ['code']);

      if (Object.keys(validation).length) {
        setRequestPending(false);
        setInvalids(validation);
        return;
      }

      try {
        await Auth.resendSignUp(email);
        setError('A new code has been sent to your email.');
      } catch (err) {
        logger.error('ConfirmSignUp: error resending auth code', { error: err, input: { email } });
        setError(err.message);
      } finally {
        setRequestPending(false);
      }
    }
  }

  return (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <ProjectHeader headerText="Confirm Sign Up" />
      <form onSubmit={handleConfirmClick} className={styles.body}>
        <input
          readOnly
          value={email}
          name="email"
          className={`${invalids.email ? styles[invalids.email] : ''} input-1`}
          placeholder="Email"
        />
        <input name="code" className={`${invalids.code ? styles[invalids.code] : ''} input-1`} placeholder="Enter your code" />
        <div
          onKeyDown={handleResendCode}
          onClick={handleResendCode}
          tabIndex={0}
          role="button"
          className={`${s.resendCode} text-1 text-gray tal`}
        >
          Resend code
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}
        >
          Confirm
        </button>
        <div>
          <a role="link" onClick={() => setConfirming(false)}>
            Back to {parentPage === 'signIn' ? 'Sign In' : 'Sign Up'}
          </a>
        </div>
      </form>
    </div>
  );
};
