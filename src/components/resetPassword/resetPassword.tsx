import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import Auth from '@aws-amplify/auth';
import Router from 'next/router';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import styles from '../../pages/styles/authPage.module.scss';
import { ProjectHeader } from '../projectHeader';
import EmailIcon from '../../img/email.svg';
import { useLogger, useFlash } from '../../hooks';

interface ResetPasswordProps {
  email: string;
}

interface ValidationProps {
  email?: string;
  code?: string;
  password?: string;
}

const SIGN_IN = '/sign-in';

export const ResetPassword: React.FC<ResetPasswordProps> = ({ email: emailProp }) => {
  const [isRequestPending, setRequestPending] = useState(false);
  const [isPasswordShowing, setPasswordShowing] = useState(false);
  const [valuesFields, setValuesFields] = useState<Record<string, string>>({ email: emailProp ?? '', code: '', password: '' });
  const { setFlash } = useFlash();
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();

  function validate({ code, password }: ValidationProps) {
    const temp: ValidationProps = {};

    if (!code) temp.code = 'error';
    if (!password) temp.password = 'error';
    return temp;
  }

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

  async function handleSubmit() {
    setRequestPending(true);
    setFlash('');
    setInvalids({});

    const { code, password, email } = valuesFields;
    const validation = validate(valuesFields);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      Router.push(SIGN_IN);
    } catch (error) {
      logger.error('ResetPassword: error in Auth.forgotPasswordSubmit', { error, input: { email, code } });
      setFlash(error.message);
      setRequestPending(false);
    }
  }

  function handleEyeballClick(e: any) {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setPasswordShowing(!isPasswordShowing);
    }
  }

  return (
    <div className={styles.authPage}>
      <ProjectHeader />
      <form onSubmit={handleSubmit} className={styles.body}>
        <div className={classnames(styles.header)}>Reset your password</div>
        <div className={styles.inputWrapper}>
          <input
            readOnly
            value={valuesFields.email}
            onChange={onChangeInput}
            onBlur={onBlurInput}
            name="email"
            className={`${invalids.email ? styles[invalids.email] : ''} input-1`}
            type="email"
            placeholder="Email"
          />
          <EmailIcon />
        </div>
        <input
          name="code"
          value={valuesFields.code}
          onChange={onChangeInput}
          onBlur={onBlurInput}
          className={`${invalids.code ? styles[invalids.code] : ''} input-1`}
          type="text"
          placeholder="Code"
        />

        <div className={styles.inputWrapper}>
          <input
            name="password"
            value={valuesFields.password}
            onChange={onChangeInput}
            onBlur={onBlurInput}
            className={`${invalids.password ? styles[invalids.password] : ''} input-1`}
            type={isPasswordShowing ? 'text' : 'password'}
            placeholder="New Password"
            autoComplete="new-password"
          />
          <div role="button" className={styles.eyeIconWrapper} tabIndex={0} onKeyDown={handleEyeballClick} onClick={handleEyeballClick}>
            {isPasswordShowing ? (
              <FontAwesomeIcon color="#BDBDBD" tabIndex={0} icon={faEyeSlash} size="1x" />
            ) : (
              <FontAwesomeIcon color="#BDBDBD" tabIndex={0} icon={faEye} size="1x" />
            )}
          </div>
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          onClick={handleSubmit}
          className={`${isRequestPending ? 'is-loading' : ''} btn-large mbm button is-primary`}
        >
          Reset Password
        </button>
        <div>
          <Link href={SIGN_IN}>
            <a href={SIGN_IN}>Back to Sign In</a>
          </Link>
        </div>
      </form>
    </div>
  );
};
