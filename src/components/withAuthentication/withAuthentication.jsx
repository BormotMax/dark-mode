import Router from 'next/router';
import { Auth } from '@aws-amplify/auth';

export function WithAuthentication(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
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
      const { user } = this.state;
      const propsWithUser = { user, ...this.props };
      // eslint-disable-next-line react/jsx-props-no-spreading
      return user ? <WrappedComponent {...propsWithUser} /> : null;
    }
  };
}
