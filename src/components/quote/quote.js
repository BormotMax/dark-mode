import { CheckList } from "../checkList"
import styles from "./quote.module.scss"
import { quotes } from "../../mockData/project"

export function Quote({ quote, i }) {
  return (
    <div className={styles.quote}>
      <div className={styles.header}>
        <div className="text-small-caps">QUOTE {i}</div>
        <div className="text-small-caps text-blue">Hide Tasks</div>
      </div>
      <div className={styles.progressContainer}>
        <progress
          className="progress is-large is-primary"
          max="100"
          value={quote.progress}
        ></progress>
        <div className={styles.percent}>{`${quote.progress}%`}</div>
      </div>
      <CheckList listItems={quote.tasks} />
    </div>
  )
}
