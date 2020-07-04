import { KeyboardEvent } from 'react';
import styles from './editableList.module.scss';
import GripLines from '../../img/gripLines.svg';

interface EditableListProps {
  listItems: Array<{ text: string }>
}

export function EditableList({ listItems }: EditableListProps) {
  // todo: store initial list and last modified list in state
  function handleKeyPress(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      // do something
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
          autoComplete="off"
          type="text"
          placeholder="Type a new task here and hit Enter"
          className={`${styles.addTask} input-light`}
          onKeyDown={handleKeyPress}
        />
      </div>
    </form>
  );
}
