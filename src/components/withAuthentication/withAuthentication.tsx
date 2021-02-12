/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Router from 'next/router';
import { UserContext } from '../../hooks';

export enum RouteType {
  NO_REDIRECT,
  SIGNED_IN,
  SIGNED_OUT,
}

export enum Role {
  FREELANCER = 'FREELANCER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

interface WithAuthenticationOptions {
  routeType: RouteType;
  allowedRoles?: Array<Role>;
}

export function WithAuthentication(WrappedComponent: React.ReactType, options: WithAuthenticationOptions) {
  return () => (
    <UserContext.Consumer>
      {(value) => {
        const { currentUser, pending, signIn, signOut } = value;
        const { routeType, allowedRoles } = options;
        const cognitoUser = currentUser;
        const groups = cognitoUser?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];

        if (pending) {
          // still fetching current user
          return null;
        }

        if (cognitoUser && allowedRoles) {
          // Make sure this user has an allowed role
          const intersection = groups.filter((x) => allowedRoles.includes(x));

          if (intersection.length === 0 && !groups.includes(Role.ADMIN)) {
            return <Unauthorized />;
          }
        }

        if (routeType === RouteType.NO_REDIRECT) {
          // render component regardless of auth status
          return <WrappedComponent currentUser={currentUser} signIn={signIn} signOut={signOut} />;
        }

        if (cognitoUser) {
          // user is signed in
          if (routeType === RouteType.SIGNED_IN) {
            // this is a signed in page
            return <WrappedComponent currentUser={currentUser} signIn={signIn} signOut={signOut} />;
          }

          // this is a signed out page
          Router.push('/projects');
          return null;
        }

        // user is not signed in and this is a signed out page
        if (routeType === RouteType.SIGNED_OUT) {
          return <WrappedComponent currentUser={currentUser} signIn={signIn} signOut={signOut} />;
        }

        // user is not signed in and this is a signed in page
        Router.push('/sign-in');
        return null;
      }}
    </UserContext.Consumer>
  );
}

const Unauthorized = () => <div>You are not authorized to view this page.</div>;
