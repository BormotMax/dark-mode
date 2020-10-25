import { faCircle, faCheckCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './checklist.module.scss';

interface CheckListProps {
  listItems: Array<{
    id: string;
    completed: boolean;
    listItem: string;
  }>;
  name: string;
  callback: Function;
}

export const CheckList: React.FC<CheckListProps> = ({ listItems, name, callback }) => {
  function handleCheckboxChange(e, item) {
    callback(e.target.checked, item);
  }

  return (
    <ul className={styles.ul}>
      {listItems.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <input
            id={`${name}:${item.id}`}
            type="checkbox"
            className={`${styles.input} ${name}`}
            name={name}
            value={item.id}
            defaultChecked={item.completed}
            onChange={(e) => handleCheckboxChange(e, item)}
          />
          <label htmlFor={`${name}:${item.id}`}>
            <div className={styles.checkboxes}>
              <div className={styles.checked}>
                <FontAwesomeIcon color="#595959" icon={faCheckCircle} />
              </div>
              <div className={styles.unchecked}>
                <FontAwesomeIcon color="#595959" icon={faCircle} />
              </div>
            </div>
            <span className={styles.text}>{item.listItem}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
