/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Amplify from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import { AppProps } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import Head from 'next/head';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

import awsconfig from '../aws-exports';
import { UserDataProvider, LoggerProvider, FlashProvider } from '../hooks';
import { RouteIndicator } from '../components/routeChange';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../styles.scss';
import '../bulma.scss';
import { CurrentProjectProvider } from '../hooks/useCurrentProject';

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
      <title>Continuum — The all-in-one platform for collaborative freelance work.</title>
      <meta property="og:title" content="Continuum — The all-in-one platform for collaborative freelance work." key="title" />
      <meta
        name="description"
        content="The all-in-one platform for solo creatives to run a thriving freelance business from anywhere.
              Conversations, invoices, payments, crm and project management, all in one place."
        key="description"
      />
      <link rel="icon" href="/landing/favicon.png" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-174215284-1" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-174215284-1');`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '1243963695957181');
fbq('track', 'PageView');`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2062027,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img height="1" width="1" src="https://www.facebook.com/tr?id=1243963695957181&ev=PageView&noscript=1" />
      </noscript>
    </Head>
    <RouteIndicator />
    <FlashProvider>
      <UserDataProvider>
        <CurrentProjectProvider>
          <ApolloProvider client={client}>
            <Rehydrated>
              <Component {...pageProps} />
            </Rehydrated>
          </ApolloProvider>
        </CurrentProjectProvider>
      </UserDataProvider>
    </FlashProvider>
  </LoggerProvider>
);

export default MyApp;
