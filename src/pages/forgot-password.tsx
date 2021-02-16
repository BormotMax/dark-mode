import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Auth from '@aws-amplify/auth';
import serialize from 'form-serialize';
import classnames from 'classnames';
import styles from './styles/authPage.module.scss';
import { ResetPassword } from '../components/resetPassword';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { ProjectHeader } from '../components/projectHeader';
import EmailIcon from '../img/email.svg';
import { useLogger, useFlash } from '../hooks';

interface ValidationProps {
  email?: string;
}

const SIGN_IN_PATH = '/sign-in';

const ForgotPassword: React.FC = () => {
  const [emailInState, setEmailInState] = useState('');
  const [isConfirming, setConfirming] = useState(false);
  const [isRequestPending, setRequestPending] = useState(false);
  const { setFlash } = useFlash();
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();

  function validate({ email }: ValidationProps) {
    const temp: ValidationProps = {};
    if (!email.trim()) temp.email = 'error';
    return temp;
  }

  async function handleSendCodeClick(e: FormEvent) {
    e.preventDefault();
    setRequestPending(true);
    setFlash('');
    setInvalids({});

    const formData = serialize(e.target as HTMLFormElement, { hash: true });
    const email = formData?.email?.trim() ?? '';
    const validation = validate(formData as { email: string });

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    setEmailInState(email);

    try {
      await Auth.forgotPassword(email);
      setFlash('');
      setRequestPending(false);
      setConfirming(true);
    } catch (error) {
      setFlash(error.message);
      logger.error('ForgotPassword: error in Auth.forgotPassword', { error, input: email });
      setRequestPending(false);
    }
  }

  return isConfirming ? (
    <ResetPassword email={emailInState} />
  ) : (
    <div className={styles.authPage}>
      <ProjectHeader />
      <form onSubmit={handleSendCodeClick} className={styles.body}>
        <div className={classnames(styles.header)}>Reset your password</div>
        <div className={styles.inputWrapper}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className={`${invalids.email ? styles[invalids.email] : ''} input-1`}
          />
          <EmailIcon />
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          className={`${isRequestPending ? 'is-loading' : ''} btn-large mbm button is-primary`}
        >
          Send Code
        </button>
        <div>
          <Link href={SIGN_IN_PATH}>
            <a href={SIGN_IN_PATH}>Back to Sign In</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default WithAuthentication(ForgotPassword, { routeType: RouteType.SIGNED_OUT });
