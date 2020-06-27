import styles from "./editableList.module.scss"
import GripLines from "../../img/gripLines.svg"

export function EditableList({ listItems }) {
  // todo: store initial list and last modified list in state
  function handleKeyPress(e) {
    if (e.keyCode == 13) {
      console.log(`Adding task: ${e.target.value}`)
    }
  }

  return (
    <div>
      <ul>
        {listItems.map((item) => (
          <li key={item.text}>
            {/* todo: change key */}
            <div className="li__bullet">
              <GripLines />
            </div>
            {/* todo: look into contentEditable error */}
            <div contentEditable="true" className={styles.editableText}>
              {item.text}
            </div>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Type a new task here and hit Enter"
          className={`${styles.addTask} input-light`}
          onKeyDown={handleKeyPress}
        ></input>
      </div>
    </div>
  )
}
