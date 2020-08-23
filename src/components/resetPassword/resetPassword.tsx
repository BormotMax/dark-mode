import { useState } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import Router from 'next/router';
import serialize from 'form-serialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import styles from '../../pages/styles/authPage.module.scss';
import { ProjectHeader } from '../projectHeader';
import EmailIcon from '../../img/email.svg';

interface ResetPasswordProps {
  email: string;
}

interface ValidationProps {
  email?: string;
  code?: string;
  password?: string;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ email }) => {
  const [isRequestPending, setRequestPending] = useState(false);
  const [isPasswordShowing, setPasswordShowing] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState<ValidationProps>({});

  function validate({ code, password }: ValidationProps) {
    const temp: ValidationProps = {};

    if (!code) temp.code = 'error';
    if (!password) temp.password = 'error';
    return temp;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setRequestPending(true);
    setError('');
    setInvalids({});

    const formData = serialize(e.target, { hash: true });
    const { code, password } = formData;
    const validation = validate(formData);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      Router.push('/signIn');
    } catch (err) {
      setError(err.message);
      setRequestPending(false);
    }
  }

  function handleEyeballClick(e) {
    if ((e as any).keyCode === undefined || (e as any).keyCode === 13) {
      setPasswordShowing(!isPasswordShowing);
    }
  }

  return (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <ProjectHeader headerText="Reset your password" />
      <form onSubmit={handleSubmit} className={styles.body}>
        <div className={styles.inputWrapper}>
          <input
            readOnly
            value={email}
            name="email"
            className={`${invalids.email ? styles[invalids.email] : ''} input-1`}
            type="email"
            placeholder="Email"
          />
          <EmailIcon />
        </div>
        <input name="code" className={`${invalids.code ? styles[invalids.code] : ''} input-1`} type="text" placeholder="Code" />

        <div className={styles.inputWrapper}>
          <input
            name="password"
            className={`${invalids.password ? styles[invalids.password] : ''} input-1`}
            type={isPasswordShowing ? 'text' : 'password'}
            placeholder="New Password"
            autoComplete="new-password"
          />
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div role="button" className={styles.eyeIconWrapper} onKeyDown={handleEyeballClick} onClick={handleEyeballClick}>
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
          className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}
        >
          Reset Password
        </button>
        <div>
          <Link href="/signIn">
            <a href="/signIn">Back to Sign In</a>
          </Link>
        </div>
      </form>
    </div>
  );
};
