import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import serialize from 'form-serialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { ConfirmSignUp } from '../components/confirmSignUp';
import styles from './styles/authPage.module.scss';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { ProjectHeader } from '../components/projectHeader';
import EmailIcon from '../img/email.svg';
import NameIcon from '../img/name.svg';
import { GoogleAuthButton } from '../components/googleAuthButton';
import { useLogger } from '../hooks';

interface ValidationProps {
  name?: string;
  email?: string;
  password?: string;
}

const SignUp: React.FC = () => {
  const [emailInState, setEmailInState] = useState('');
  const [isPasswordShowing, setPasswordShowing] = useState(false);
  const [isConfirming, setConfirming] = useState(false);
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { logger } = useLogger();

  function validate({ name, email, password }: ValidationProps) {
    const temp: ValidationProps = {};

    if (!name) temp.name = 'error';
    if (!email) temp.email = 'error';
    if (!password) temp.password = 'error';
    return temp;
  }

  async function handleCreateAccountClick(e: FormEvent) {
    e.preventDefault();
    setRequestPending(true);
    setError('');
    setInvalids({});

    const formData = serialize(e.target, { hash: true });
    const { email, password, name } = formData;
    const validation = validate(formData);

    if (Object.keys(validation).length) {
      setRequestPending(false);
      setInvalids(validation);
      return;
    }

    const signUpInput = {
      username: email,
      password,
      attributes: {
        name,
        'custom:group': 'FREELANCER',
      },
    };

    setEmailInState(email);

    try {
      await Auth.signUp(signUpInput);
      setError('');
      setRequestPending(false);
      setConfirming(true);
    } catch (err) {
      setError(err.message);
      logger.error('SignUp: error in Auth.signUp', { error: err, input: signUpInput });
      setRequestPending(false);
    }
  }

  async function handleSignUpwithGoogleClick(e: MouseEvent) {
    e.preventDefault();
    setError('');
    setInvalids({});

    const federatedSignInInput = { provider: 'Google' };
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await Auth.federatedSignIn(federatedSignInInput);
    } catch (err) {
      setError(err.message);
      logger.error('SignIn: error in Auth.federatedSignIn', { error: err, input: federatedSignInInput });
    }
  }

  function handleEyeballClick(e) {
    if ((e as any).keyCode === undefined || (e as any).keyCode === 13) {
      setPasswordShowing(!isPasswordShowing);
    }
  }

  return isConfirming ? (
    <ConfirmSignUp email={emailInState} parentPage="signUp" setConfirming={setConfirming} />
  ) : (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <ProjectHeader headerText="Sign Up for Continuum" />
      <form onSubmit={handleCreateAccountClick} className={styles.body}>
        <GoogleAuthButton onClick={handleSignUpwithGoogleClick as any}>Sign Up with Google</GoogleAuthButton>
        <div className="text-1 text-gray mbm">Or, sign up with Email</div>
        <div className={styles.inputWrapper}>
          <input name="name" className={`${invalids.name ? styles[invalids.name] : ''} input-1`} type="text" placeholder="Name" />
          <NameIcon />
        </div>
        <div className={styles.inputWrapper}>
          <input name="email" className={`${invalids.email ? styles[invalids.email] : ''} input-1`} type="email" placeholder="Email" />
          <EmailIcon />
        </div>
        <div className={styles.inputWrapper}>
          <input
            name="password"
            className={`${invalids.password ? styles[invalids.password] : ''} input-1`}
            type={isPasswordShowing ? 'text' : 'password'}
            placeholder="Password"
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
        <div className="text-1 mbm">
          By signing up I agree to the{' '}
          <Link href="/termsAndConditions">
            <a href="/termsAndConditions">Terms of Service</a>
          </Link>
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}
        >
          Create a Free Account
        </button>
        <div>
          <Link href="/signIn">
            <a href="/signIn">Sign In</a>
          </Link>{' '}
          with existing account
        </div>
      </form>
    </div>
  );
};

export default WithAuthentication(SignUp, { routeType: RouteType.SIGNED_OUT });
