import "../styles.scss"
import "../bulma.scss"
import Amplify from "aws-amplify"
import awsconfig from "../aws-exports"

Amplify.configure(awsconfig)

function MyApp({ Component, pageProps }) {
  console.log(Component)
  return <Component {...pageProps} />
}

export default MyApp
