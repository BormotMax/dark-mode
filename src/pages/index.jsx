import Head from 'next/head';
import { SignOut } from 'aws-amplify-react';
import Link from 'next/link';

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
          <Link href="/signIn">
            <a href="/signIn">
              Sign In
            </a>
          </Link>
          <Link href="/project">
            <a href="/project">Project</a>
          </Link>
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Home;
