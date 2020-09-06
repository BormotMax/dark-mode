/* eslint-disable react/no-danger */
/* eslint-disable react/no-unescaped-entities */
import '../styles.scss';
import '../bulma.scss';
import Amplify from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import { AppProps } from 'next/app';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import Analytics from '@aws-amplify/analytics';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import awsconfig from '../aws-exports';
import { UserDataProvider, LoggerProvider } from '../hooks';
import { RouteIndicator } from '../components/routeChange';

config.autoAddCss = false;

let host = 'continuum.works';

if (process.env.NODE_ENV === 'development') {
  host = 'localhost:3000';
}

// Fix issues with multiple redirect urls.
// Try to figure out which one to use...
if (awsconfig.oauth.redirectSignIn.includes(',')) {
  const filterHost = (url) => new URL(url).host === host;
  awsconfig.oauth.redirectSignIn = awsconfig.oauth.redirectSignIn.split(',').filter(filterHost).shift();
  awsconfig.oauth.redirectSignOut = awsconfig.oauth.redirectSignOut.split(',').filter(filterHost).shift();
}

Amplify.configure(awsconfig);

Analytics.autoTrack('pageView', {
  enable: true,
  // you need to change it to 'SPA' if your app is a single-page app like React
  type: 'multiPageApp',
  getUrl: () => window.location.origin + window.location.pathname,
});

export const client = new AWSAppSyncClient(
  {
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    disableOffline: true,
    auth: {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
    },
  },
  {
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  },
);

export const unauthClient = new AWSAppSyncClient(
  {
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    disableOffline: true,
    auth: { type: AUTH_TYPE.AWS_IAM, credentials: () => Auth.currentCredentials() },
  },
  {
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  },
);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <LoggerProvider>
    <Head>
      <title>Continuum</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <RouteIndicator />
    <UserDataProvider>
      <ApolloProvider client={client}>
        <Rehydrated>
          <Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-174215284-1" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-174215284-1');
`,
              }}
            />
          </Head>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Rehydrated>
      </ApolloProvider>
    </UserDataProvider>
  </LoggerProvider>
);

export default MyApp;
