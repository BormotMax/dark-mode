import '../styles.scss';
import '../bulma.scss';
import Amplify from 'aws-amplify';
import { AppProps } from 'next/app';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

// eslint-disable-next-line react/jsx-props-no-spreading
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
