import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import serialize from 'form-serialize';
import styles from './styles/authPage.module.scss';
import { ResetPassword } from '../components/resetPassword';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { ProjectHeader } from '../components/projectHeader';
import EmailIcon from '../img/email.svg';

interface ValidationProps {
  email?: string;
}

const ForgotPassword: React.FC = () => {
  const [emailInState, setEmailInState] = useState('');
  const [isConfirming, setConfirming] = useState(false);
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState<ValidationProps>({});

  function validate({ email }: ValidationProps) {
    const temp: ValidationProps = {};

    if (!email) temp.email = 'error';
    return temp;
  }

  async function handleSendCodeClick(e: FormEvent) {
    e.preventDefault();

    setRequestPending(true);
    setError('');
    setInvalids({});

    const formData = serialize(e.target as HTMLFormElement, { hash: true });
    const { email } = formData;

    const validation = validate(formData as { email: string });

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    setEmailInState(email);

    try {
      await Auth.forgotPassword(formData.email);
      setError('');
      setRequestPending(false);
      setConfirming(true);
    } catch (err) {
      setError(err.message);
      setRequestPending(false);
    }
  }

  return isConfirming ? (
    <ResetPassword email={emailInState} />
  ) : (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <ProjectHeader headerText="Reset your password" />
      <form onSubmit={handleSendCodeClick} className={styles.body}>
        <div className={styles.inputWrapper}>
          <input name="email" className={`${invalids.email ? styles[invalids.email] : ''} input-1`} type="email" placeholder="Email" />
          <EmailIcon />
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}
        >
          Send Code
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

export default WithAuthentication(ForgotPassword, { routeType: RouteType.SIGNED_OUT });
