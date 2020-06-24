import styles from "./createAPassword.module.scss"
import Lock from "../../img/lock.svg"

export function CreateAPassword() {
  return (
    <div className={styles.createAPassword}>
      <Lock />
      <div className={styles.header}>CREATE A PASSWORD</div>
      <div>
        <input placeholder="Password"></input>
      </div>
      <div>
        <input placeholder="Password again"></input>
      </div>
      <div className={styles.buttonContainer}>
        <div className="oval-btn">
          <span>SAVE</span>
        </div>
      </div>
    </div>
  )
}
