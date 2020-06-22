import Head from "next/head"
import { AboveTheFold } from "../components/AboveTheFold"
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"

function Home() {
  return (
    <div className="container">
      <Head>
        <title>Continuum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="columns is-centered">
        <div className="column is-half">
          <AmplifySignOut />
          <AboveTheFold />
        </div>
      </div>
    </div>
  )
}

export default Home
