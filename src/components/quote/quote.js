import { CheckList } from "../checkList"
import { useState } from "react"
import styles from "./quote.module.scss"

export function Quote({ quote, i }) {
  const [isShowing, setShowing] = useState(true)
  const [percentDone, setPercentDone] = useState(calcPercentDone(quote.tasks))

  function handleQuoteProgressUpdate(task, tasks, quoteId) {
    setPercentDone(calcPercentDone(tasks))
    console.log(
      `Updating completion status of task with ID: ${task.id} to completed: ${task.completed} (within quote with ID: ${quoteId})`
    )
  }

  function calcPercentDone(tasks) {
    let total = 0
    let done = 0

    for (const task of tasks) {
      if (task.completed) {
        done++
      }

      total++
    }

    return total === 0 ? 0 : done / total
  }

  return (
    <div className={styles.quote}>
      <div className={styles.header}>
        <div className="text-small-caps">QUOTE {i}</div>
        <div
          onClick={() => setShowing(!isShowing)}
          className={`${styles.hideTasksButton} text-small-caps text-blue`}
        >
          {isShowing ? "Hide Tasks" : "Show Tasks"}
        </div>
      </div>
      <div className={`${isShowing ? "" : "hidden"}`}>
        <div className={styles.progressContainer}>
          <progress
            className="progress is-large is-primary"
            max="1"
            value={percentDone}
          ></progress>
          <div className={styles.percent}>{`${percentDone * 100}%`}</div>
        </div>
        <form>
          <CheckList
            name={`quote-${i}`}
            callback={(task, tasks) =>
              handleQuoteProgressUpdate(task, tasks, i)
            }
            listItems={quote.tasks.map((t) => ({
              id: t.id,
              completed: t.completed,
              listItem: t.text,
            }))}
          />
        </form>
      </div>
    </div>
  )
}
