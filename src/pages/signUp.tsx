import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Auth } from '@aws-amplify/auth';
import serialize from 'form-serialize';
import { ConfirmSignUp } from '../components/confirmSignUp';
import { GoogleAuthButton } from '../components/googleAuthButton';
import Logo from '../img/logo.svg';
import styles from './styles/authPage.module.scss';
import { WithAuthentication, RouteType } from '../components/withAuthentication';

interface ValidationProps {
  name?: string
  email?: string
  password?: string
}

const SignUp: React.FC = () => {
  const [emailInState, setEmailInState] = useState('');
  const [isConfirming, setConfirming] = useState(false);
  const [isRequestPending, setRequestPending] = useState(false);
  const [error, setError] = useState('');
  const [invalids, setInvalids] = useState<ValidationProps>({});

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

    const signupInfo = {
      username: email,
      password,
      attributes: {
        name,
        'custom:group': 'FREELANCER',
      },
    };

    setEmailInState(email);

    try {
      await Auth.signUp(signupInfo);
      setError('');
      setRequestPending(false);
      setConfirming(true);
    } catch (err) {
      setError(err.message);
      setRequestPending(false);
    }
  }

  function handleSignUpwithGoogleClick(e: MouseEvent) {
    e.preventDefault();
  }

  return isConfirming ? <ConfirmSignUp email={emailInState} parentPage="signUp" setConfirming={setConfirming} /> : (
    <div className={styles.authPage}>
      <div className="flash-message">{error}</div>
      <div className="mtl mbl"><Logo /></div>
      <h1 className="h1 mbl">Sign Up for Continuum</h1>
      <form onSubmit={handleCreateAccountClick} className={styles.body}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <GoogleAuthButton onClick={handleSignUpwithGoogleClick as any}>
          Sign Up with Google
        </GoogleAuthButton>
        <div className="text-1 text-gray mbm">Or, sign up with Email</div>
        <input name="name" className={`${invalids.name ? styles[invalids.name] : ''} input-1`} type="text" placeholder="Name" />
        <input name="email" className={`${invalids.email ? styles[invalids.email] : ''} input-1`} type="email" placeholder="Email" />
        <input
          name="password"
          className={`${invalids.password ? styles[invalids.password] : ''} input-1`}
          type="password"
          placeholder="Password"
        />
        <div className="text-1 mbm">
          By signing up I agree to the
          {' '}
          <Link href="/termsOfService"><a href="/termsOfService">Terms of Service</a></Link>
        </div>
        <button
          disabled={isRequestPending}
          type="submit"
          className={`${isRequestPending ? 'is-loading' : ''} oval-btn-2 mbm button is-primary`}
        >
          Create a Free Account
        </button>
        <div>
          <Link href="/signIn"><a href="/signIn">Sign In</a></Link>
          {' '}
          with existing account
        </div>
      </form>
    </div>
  );
};

export default WithAuthentication(SignUp, { routeType: RouteType.SIGNED_OUT });
