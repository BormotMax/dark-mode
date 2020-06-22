import Head from "next/head"
import { AboveTheFold } from "../components/AboveTheFold"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Continuum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="columns is-centered">
        <div className="column is-half">
          <AboveTheFold />
        </div>
      </div>
    </div>
  )
}
