import '../styles.scss'
import '../bulma.scss'
import Amplify from 'aws-amplify'
import awsconfig from '../aws-exports'
import { AppProps } from 'next/app'

Amplify.configure(awsconfig)

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />
}

export default MyApp
