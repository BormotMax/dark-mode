import "../styles.scss"
import "../bulma.scss"
import Amplify from "aws-amplify"
import awsconfig from "../aws-exports"
import { AmplifyAuthenticator } from "@aws-amplify/ui-react"

Amplify.configure(awsconfig)

function MyApp({ Component, pageProps }) {
  console.log(Component)
  return (
    <AmplifyAuthenticator>
      <Component {...pageProps} />
    </AmplifyAuthenticator>
  )
}

export default MyApp
