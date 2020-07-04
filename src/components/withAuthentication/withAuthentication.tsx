/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from 'next/router';
import { Auth } from '@aws-amplify/auth';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function WithAuthentication(WrappedComponent: React.ReactType) {
  // eslint-disable-next-line react/display-name
  return class extends React.Component {
    constructor(props?: any) {
      super(props);
      this.state = { user: null };
    }

    async componentDidMount() {
      let user;
      try {
        user = await Auth.currentAuthenticatedUser();
      } catch (err) {
        Router.push('/');
      }

      this.setState({ user });
    }

    render() {
      const { user }: any = this.state;
      const propsWithUser = { user, ...this.props };
      // eslint-disable-next-line react/jsx-props-no-spreading
      return user ? <WrappedComponent {...propsWithUser} /> : null;
    }
  };
}
