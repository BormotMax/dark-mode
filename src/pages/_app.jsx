import '../styles.scss';
import '../bulma.scss';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
