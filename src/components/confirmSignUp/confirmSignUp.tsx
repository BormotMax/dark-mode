import { useState, FormEvent } from 'react';
import { Auth } from '@aws-amplify/auth';
import Router from 'next/router';
import serialize from 'form-serialize';
import classnames from 'classnames';
import styles from '../../pages/styles/authPage.module.scss';
import s from './confirmSignUp.module.scss';
import { ProjectHeader } from '../projectHeader';
import { useLogger, useFlash } from '../../hooks';

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
  const { setFlash } = useFlash();
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
    setFlash('');
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
    } catch (error) {
      logger.error('ConfirmSignUp: error confirming sign up', { error, input: { email, code } });
      setFlash(error.message);
      setRequestPending(false);
    }
  }

  async function handleResendCode(e: any) {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setRequestPending(true);
      setFlash('');
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
        setFlash('A new code has been sent to your email.');
      } catch (error) {
        logger.error('ConfirmSignUp: error resending auth code', { error, input: { email } });
        setFlash(error.message);
      } finally {
        setRequestPending(false);
      }
    }
  }

  return (
    <div className={styles.authPage}>
      <ProjectHeader />
      <form onSubmit={handleConfirmClick} className={styles.body}>
        <div className={classnames(styles.header)}>Confirm Sign Up</div>
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
          className={`${s.resendCode} text-1 text-drkgray tal`}
        >
          Resend code
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          className={`${isRequestPending ? 'is-loading' : ''} btn-large mbm button is-primary`}
        >
          Confirm
        </button>
        <div>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a role="link" tabIndex={0} onKeyDown={() => setConfirming(false)} onClick={() => setConfirming(false)}>
            Back to {parentPage === 'signIn' ? 'Sign In' : 'Sign Up'}
          </a>
        </div>
      </form>
    </div>
  );
};
