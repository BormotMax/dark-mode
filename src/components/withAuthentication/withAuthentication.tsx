/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from 'next/router';
import { Auth } from '@aws-amplify/auth';
import React from 'react';

interface WithAuthenticationOptions {
  noRedirect?: boolean
  signedIn?: boolean
  signedOut?: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function WithAuthentication(WrappedComponent: React.ReactType, options: WithAuthenticationOptions = { signedIn: true }) {
  // eslint-disable-next-line react/display-name
  return class extends React.Component {
    constructor(props?: any) {
      super(props);
      this.state = { user: null, pending: true };
    }

    async componentDidMount() {
      let user;

      if (options.noRedirect) {
        // this branch will pass the user's info to the component
        // but won't redirect based on authenticated status
        try {
          user = await Auth.currentAuthenticatedUser();
          this.setState({ user, pending: false });
        } catch (err) {
          this.setState({ pending: false });
        }

        this.setState({ user, pending: false });
      } else if (options.signedOut) {
        // this branch will redirect if there is a signed-in user
        // e.g. don't allow a signed-in user to visit /signIn
        try {
          user = await Auth.currentAuthenticatedUser();
          Router.push('/');
          // eslint-disable-next-line no-empty
        } catch (err) {
          this.setState({ pending: false });
        }
      } else {
        try {
          user = await Auth.currentAuthenticatedUser();
        } catch (err) {
          Router.push('/');
        }

        this.setState({ user, pending: false });
      }
    }

    // eslint-disable-next-line class-methods-use-this
    async handleSignOut() {
      try {
        await Auth.signOut();
        this.setState({ user: null });
        Router.push('/');
        // eslint-disable-next-line no-empty
      } catch (err) { }
    }

    render() {
      const { user, pending }: any = this.state;
      const showComponent = options.signedIn ? (!pending && user) : !pending;
      const propsWithUser = { user, signOut: this.handleSignOut.bind(this), ...this.props };
      // eslint-disable-next-line react/jsx-props-no-spreading
      return showComponent ? <WrappedComponent {...propsWithUser} /> : null;
    }
  };
}
