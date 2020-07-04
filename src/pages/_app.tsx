import '../styles.scss';
import '../bulma.scss';
import Amplify from 'aws-amplify';
import { AppProps } from 'next/app';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
