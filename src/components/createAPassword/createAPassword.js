import styles from "./createAPassword.module.scss"
import Lock from "../../img/lock.svg"
import { useState } from "react"

export function CreateAPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleSave(e) {
    e.preventDefault()
    console.log(`Creating password: ${password}. Confirmed: ${confirmPassword}`)
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <form onSubmit={handleSave} className={styles.createAPassword}>
      <Lock />
      <div className={styles.header}>CREATE A PASSWORD</div>
      <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        ></input>
      </div>
      <div>
        <input
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Password again"
        ></input>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleSave} className="oval-btn">
          SAVE
        </button>
      </div>
    </form>
  )
}
