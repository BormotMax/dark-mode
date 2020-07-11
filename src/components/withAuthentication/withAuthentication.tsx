/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Router from 'next/router';
import { UserContext } from '../../hooks/useCurrentUser';

export enum RouteType {
  NO_REDIRECT,
  SIGNED_IN,
  SIGNED_OUT
}

interface WithAuthenticationOptions {
  routeType: RouteType
}

export function WithAuthentication(WrappedComponent: React.ReactType, options: WithAuthenticationOptions) {
  return () => (
    <UserContext.Consumer>
      {(value) => {
        const {
          currentUser, pending, signIn, signOut,
        } = value;
        const cognitoUser = currentUser?.cognitoUser;

        if (pending) {
          // still fetching current user
          return <div>Loading...</div>;
        }

        if (options.routeType === RouteType.NO_REDIRECT) {
          // render component regardless of auth status
          return <WrappedComponent currentUser={currentUser} signIn={signIn} signOut={signOut} />;
        }

        if (cognitoUser) {
          // user is signed in
          if (options.routeType === RouteType.SIGNED_IN) {
            // this is a signed in page
            return <WrappedComponent currentUser={currentUser} signIn={signIn} signOut={signOut} />;
          }

          // this is a signed out page
          Router.push('/dashboard');
          return null;
        }

        // user is not signed in and this is a signed out page
        if (options.routeType === RouteType.SIGNED_OUT) {
          return <WrappedComponent currentUser={currentUser} signIn={signIn} signOut={signOut} />;
        }

        // user is not signed in and this is a signed in page
        Router.push('/');
        return null;
      }}
    </UserContext.Consumer>
  );
}
