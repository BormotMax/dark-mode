import styles from "./agree.module.scss"
import Unchecked from "../../img/unchecked.svg"
import BlueCheckmark from "../../img/blueCheckmark.svg"

export function Agree() {
  function toggleTermsAndConditionsAgreement({ target }) {
    console.log(
      `Terms and conditions ${target.checked ? "accepted" : "not accepted"}`
    )
  }

  return (
    <ul>
      <li className={styles.listItem}>
        <input
          id="agree-terms-and-conditions"
          type="checkbox"
          className={styles.input}
          name="agree-terms-and-conditions"
          value="agree"
          onChange={toggleTermsAndConditionsAgreement}
        />
        <label htmlFor="agree-terms-and-conditions">
          <div className={styles.checkboxes}>
            <div className={styles.checked}>
              <BlueCheckmark />
            </div>
            <div className={styles.unchecked}>
              <Unchecked />
            </div>
          </div>
          <span className={styles.text}>
            I agree to{" "}
            <a href="/" onclick="return false">
              terms & conditions
            </a>
          </span>
        </label>
      </li>
    </ul>
  )
}
