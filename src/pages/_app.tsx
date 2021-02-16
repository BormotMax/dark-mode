import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AUTH_TYPE, AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import { UserDataProvider, LoggerProvider, FlashProvider } from '../hooks';
import { RouteIndicator } from '../components/routeChange';
import { CurrentProjectProvider } from '../hooks/useCurrentProject';
import awsConfig from '../aws-exports';
import '../styles.scss';
import '../bulma.scss';

config.autoAddCss = false;

let host = 'continuum.works';

if (process.env.NODE_ENV === 'development') {
  host = 'localhost:3000';
}

// Fix issues with multiple redirect urls.
// Try to figure out which one to use...
if (awsConfig.oauth.redirectSignIn.includes(',')) {
  const filterHost = (url) => new URL(url).host === host;
  awsConfig.oauth.redirectSignIn = awsConfig.oauth.redirectSignIn.split(',').filter(filterHost).shift();
  awsConfig.oauth.redirectSignOut = awsConfig.oauth.redirectSignOut.split(',').filter(filterHost).shift();
}

Amplify.configure(awsConfig);

const awsConfigClient = {
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  } as AuthOptions,
};

const awsConfigUnauth = {
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials(),
  } as AuthOptions,
};

// TODO: enable cache and fix cache issues
export const client = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(awsConfigClient),
    createSubscriptionHandshakeLink(awsConfigClient),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'no-cache' },
    query: { fetchPolicy: 'no-cache' },
    mutate: { fetchPolicy: 'no-cache' },
  },
});

export const unauthClient = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(awsConfigUnauth),
    createSubscriptionHandshakeLink(awsConfigUnauth),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'no-cache' },
    query: { fetchPolicy: 'no-cache' },
    mutate: { fetchPolicy: 'no-cache' },
  },
});

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
      <link rel="icon" href="/favicon.png" />
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
            <Component {...pageProps} />
          </ApolloProvider>
        </CurrentProjectProvider>
      </UserDataProvider>
    </FlashProvider>
  </LoggerProvider>
);

export default MyApp;
