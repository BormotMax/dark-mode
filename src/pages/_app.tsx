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
import awsconfig from '../aws-exports';
import { UserDataProvider } from '../hooks/useCurrentUser';

Amplify.configure(awsconfig);

Analytics.autoTrack('pageView', {
  enable: true,
  // you need to change it to 'SPA' if your app is a single-page app like React
  type: 'multiPageApp',
  getUrl: () => window.location.origin + window.location.pathname,
});

export const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  disableOffline: true,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
});

export const unauthClient = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  disableOffline: true,
  auth: { type: AUTH_TYPE.AWS_IAM, credentials: () => Auth.currentCredentials() },
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
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
);

export default MyApp;
