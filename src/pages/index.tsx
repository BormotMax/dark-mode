import Head from 'next/head';
import Link from 'next/link';
import { WithAuthentication } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';

const Home: React.FC<AuthProps> = ({ user, signOut }) => (
  <div className="container">
    <Head>
      <title>Continuum</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="columns is-centered">
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        className="column is-half"
      >
        <div>Continuum</div>
        {!user
          && (
          <>
            <Link href="/signIn">
              <a href="/signIn">
                Sign In
              </a>
            </Link>
            <Link href="/signUp">
              <a href="/signUp">
                Sign Up
              </a>
            </Link>
          </>
          )}
        {user
          && (
          <>
            <Link href="/dashboard">
              <a href="/dashboard">
                Dashboard
              </a>
            </Link>
            <button type="button" onClick={signOut as any}>Sign Out</button>

          </>
          )}
      </div>
    </div>
  </div>
);

export default WithAuthentication(Home, { noRedirect: true });
