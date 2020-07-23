import '../styles.scss';
import '../bulma.scss';
import Amplify from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import { AppProps } from 'next/app';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import awsconfig from '../aws-exports';
import { UserDataProvider } from '../hooks/useCurrentUser';

Amplify.configure(awsconfig);

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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Rehydrated>
    </ApolloProvider>
  </UserDataProvider>
);

export default MyApp;
