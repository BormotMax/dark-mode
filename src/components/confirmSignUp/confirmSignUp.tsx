import React, { useState, memo, useCallback } from 'react';
import Auth from '@aws-amplify/auth';
import Router from 'next/router';
import classnames from 'classnames';
import styles from '../../pages/styles/authPage.module.scss';
import s from './confirmSignUp.module.scss';
import { ProjectHeader } from '../projectHeader';
import { useLogger, useFlash } from '../../hooks';

interface ConfirmSignUpProps {
  email: string;
  parentPage: string;
  setConfirming: (value: boolean) => void;
}

interface ValidationProps {
  code?: string;
  email?: string;
}

export const ConfirmSignUp: React.FC<ConfirmSignUpProps> = memo(({ email: emailProp, parentPage, setConfirming }) => {
  const [isRequestPending, setRequestPending] = useState<boolean>(false);
  const [valuesFields, setValuesFields] = useState<Record<string, string>>({ email: emailProp, code: '' });
  const { setFlash } = useFlash();
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { name, value } = {} } = event;
    setValuesFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, [setValuesFields]);

  const onBlurInput = useCallback((event: React.FocusEvent<HTMLInputElement>): void => {
    const { target: { name, value } = {} } = event;
    setValuesFields((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  }, [setValuesFields]);

  function validate({ code }: ValidationProps, exclude: Array<string> = []) {
    const temp: ValidationProps = {};

    if (!code && !exclude.includes('code')) temp.code = 'error';
    return temp;
  }

  async function handleConfirmClick() {
    setRequestPending(true);
    setFlash('');
    setInvalids({});

    const { email, code } = valuesFields;
    const validation = validate(valuesFields);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    try {
      await Auth.confirmSignUp(email, code);
      Router.push('/sign-in');
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

      const { email } = valuesFields;
      const validation = validate(valuesFields, ['email']);

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

  const setConfirmingFalse = () => {
    setConfirming(false);
  };

  return (
    <div className={styles.authPage}>
      <ProjectHeader />
      <div className={styles.body}>
        <div className={classnames(styles.header)}>Confirm Sign Up</div>
        <input
          readOnly
          value={valuesFields.email}
          onChange={onChangeInput}
          onBlur={onBlurInput}
          name="email"
          className={`${invalids.email ? styles[invalids.email] : ''} input-1`}
          placeholder="Email"
        />
        <input
          name="code"
          value={valuesFields.code}
          onChange={onChangeInput}
          onBlur={onBlurInput}
          placeholder="Enter your code"
          className={`${invalids.code ? styles[invalids.code] : ''} input-1`}
        />
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
          onClick={handleConfirmClick}
          className={`${isRequestPending ? 'is-loading' : ''} btn-large mbm button is-primary`}
        >
          Confirm
        </button>
        <div>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            role="link"
            tabIndex={0}
            onKeyDown={setConfirmingFalse}
            onClick={setConfirmingFalse}
          >
            Back to {parentPage === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </a>
        </div>
      </div>
    </div>
  );
});

ConfirmSignUp.displayName = 'ConfirmSignUp';
