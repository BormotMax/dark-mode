import { BlueCheckmark } from "../../img/blueCheckmark.svg"
import { Unchecked } from "../../img/unchecked.svg"
import styles from "./checklist.module.scss"

export function CheckList({ listItems, name, callback, editable = true }) {
  function handleCheckboxChange({ target }) {
    const inputs = document.querySelectorAll(`.${name}`)
    const items = []

    for (const input of inputs) {
      items.push({
        id: input.value,
        completed: input.checked,
      })
    }

    callback({ id: target.value, completed: target.checked }, items)
  }

  return (
    <ul className={styles.ul}>
      {listItems.map((t) => {
        return editable ? (
          <li key={t.id} className={styles.listItem}>
            <input
              id={`${name}:${t.id}`}
              type="checkbox"
              className={`${styles.input} ${name}`}
              name={name}
              value={t.id}
              defaultChecked={t.completed}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`${name}:${t.id}`}>
              <div className={styles.checkboxes}>
                <div className={styles.checked}>
                  <BlueCheckmark />
                </div>
                <div className={styles.unchecked}>
                  <Unchecked />
                </div>
              </div>
              <span className={styles.text}>{t.listItem}</span>
            </label>
          </li>
        ) : (
          <li key={t.id}>
            <span className="li__bullet">
              {t.completed ? <BlueCheckmark /> : <Unchecked />}
            </span>
            <span className={t.completed ? "strikethrough" : ""}>
              {t.listItem}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
