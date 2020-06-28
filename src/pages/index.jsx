import Head from 'next/head';
import { withAuthenticator, SignOut } from 'aws-amplify-react';
import Link from 'next/link';
import AuthTheme from '../authTheme.ts';

function Home() {
  return (
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
          <Link href="/project">
            <a href="/project">Project</a>
          </Link>
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(Home, {
  theme: AuthTheme,
  usernameAttributes: 'email',
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
    header: 'Sign Up for Continuum',
    signUpFields: [
      {
        label: 'Name',
        key: 'name',
        placeholder: 'Carl Sagan',
        required: true,
        type: 'string',
        displayOrder: -2,
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        placeholder: 'your@email.com',
        type: 'email',
        displayOrder: -1,
      },
    ],
  },
});
