import Head from "next/head"
import Logo from "../img/logo.svg"
import Squiggle from "../img/squiggle.svg"
import Checkmark from "../img/checkmark.svg"
import Unchecked from "../img/unchecked.svg"
import styles from "./project.module.scss"
import { data, quotes, files } from "../mockData/project"
import { TabGroup, NotesTab, QuotesTab, FilesTab } from "../components/tabs"
import { Quote } from "../components/quote"
import { CreateAPassword } from "../components/createAPassword"
import { useState } from "react"
import { CheckList } from "../components/checkList"
import { Agree } from "../components/termsAndConditions"

function Project() {
  const [quoteSpeed, setQuoteSpeed] = useState("Express")

  function selectExpressQuote() {
    console.log("Selecting Express quote.")
    setQuoteSpeed("Express")
  }

  function selectStandardQuote() {
    console.log("Selecting Standard quote.")
    setQuoteSpeed("Standard")
  }

  function handleSaveQuoteSpeed() {
    console.log(`Confirming ${quoteSpeed} quote.`)
  }

  return (
    <div className="text-slate">
      <Head>
        <title>Continuum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles["header"]}>
        <Logo className={styles["header__logo"]} />
        <img className={styles["header__avatar"]} src="/avatar.jpg" />
        <div className={styles["header__company"]}>
          <div className={styles["header__company__name"]}>
            {data.company.name}
          </div>
          <div className={styles["header__company__url"]}>
            {data.company.email}
          </div>
        </div>
      </div>
      <div className={`${styles["content"]} container is-fullhd`}>
        <div className="columns is-variable is-3-mobile is-3-tablet is-6-desktop is-8-widescreen is-8-fullhd">
          <div className="column is-8">
            <div className="header-2">
              First Contact from {data.client.name}
            </div>
            <div className={styles["tasks"]}>
              <div className="header-3">Tasks</div>
              <ul>
                {data.tasks.map((t) => (
                  <li key={t.text}>
                    <span className="li__bullet">
                      <Checkmark />
                    </span>
                    {t.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles["notes"]}>
              <div className="header-3">Notes</div>
              <div className={styles["notes__text"]}>{data.notes}</div>
            </div>
            <div className="text-blue">Submitted {data.submittedAt}</div>
            <div className={styles["comments"]}>
              <div className={`${styles["comments__header"]} text-blue`}>
                <div>Comments</div>
                <div className={styles["comments__header__line"]}></div>
              </div>
              <div>
                {data.comments.map((c, i) => (
                  <div
                    className={`${styles["comment"]} ${
                      i % 2 === 1
                        ? styles["comment--light"]
                        : styles["comment--dark"]
                    }`}
                    key={c.text}
                  >
                    <div className={styles["comment__header"]}>
                      <div className="text-blue text-normal">{c.name}</div>
                      <div className="text-small">{c.createdAt}</div>
                    </div>
                    <img
                      className={styles["comment__avatar"]}
                      src={i % 2 === 1 ? "/avatar.jpg" : "/avatar_2.png"}
                    />
                    <div className={styles["comment__body"]}>{c.text}</div>
                    {c.quote && (
                      <div className={styles["quote"]}>
                        <div className={`${styles["quote__header"]} text-blue`}>
                          <div>Quote</div>
                        </div>
                        <div className={styles["quote__header__squiggle"]}>
                          <Squiggle />
                        </div>
                        <div className={styles["tasks"]}>
                          <ul className={styles["list"]}>
                            {c.quote.tasks.map((t) => (
                              <li key={t.text}>
                                <span className="li__bullet">
                                  <Checkmark />
                                </span>
                                {t.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Agree />
                        <div className={styles["quote__grid"]}>
                          <div className={styles["quote__grid__prices"]}>
                            <div
                              onClick={selectExpressQuote}
                              className={styles["quote__grid__prices--express"]}
                            >
                              <div className="text-xsmall text-normal">
                                EXPRESS
                              </div>
                              <div className={styles["quote__time"]}>
                                <div>48 hours</div>

                                <div>$285</div>
                              </div>
                            </div>
                            <div
                              onClick={selectStandardQuote}
                              className={
                                styles["quote__grid__prices--standard"]
                              }
                            >
                              <div className="text-xsmall text-normal">
                                STANDARD
                              </div>
                              <div className={styles["quote__time"]}>
                                <div>7 days</div>
                                <div>$95</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles["quote__grid__acceptance"]}>
                            <div className="text-blue text-normal">
                              Standard Accepted for $95
                            </div>
                            <div className="text-small">
                              Who will be performing work for this project?
                            </div>
                            <div className={styles.button_container}>
                              <button
                                onClick={handleSaveQuoteSpeed}
                                className={`${styles["quote__grid__acceptance__button"]} oval-btn`}
                              >
                                SAVE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="column">
            <TabGroup names={["QUOTES", "NOTES", "FILES"]}>
              <QuotesTab data={{ tasks: data.tasks }} />
              <NotesTab />
              <FilesTab files={files} />
            </TabGroup>
            <div className={styles.projectProgressHeader}>PROJECT PROGRESS</div>
            {quotes.map((quote, i) => (
              <Quote key={i} i={i + 1} quote={quote} />
            ))}
            <CreateAPassword />
          </div>
        </div>
      </div>
    </div>
  )
}

// export default withAuthenticator(Project)
export default Project
