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
  editable?: boolean;
}

export const CheckList: React.FC<CheckListProps> = ({ listItems, name, callback, editable = true }) => {
  function handleCheckboxChange() {
    const inputs: any = document.querySelectorAll<HTMLFormElement>(`.${name}`);
    const items = [];

    inputs.forEach((input) => {
      items.push({
        id: input.value,
        completed: input.checked,
      });
    });

    callback(items);
  }

  return (
    <ul className={styles.ul}>
      {listItems.map((item) =>
        editable ? (
          <li key={item.id} className={styles.listItem}>
            <input
              id={`${name}:${item.id}`}
              type="checkbox"
              className={`${styles.input} ${name}`}
              name={name}
              value={item.id}
              defaultChecked={item.completed}
              onChange={handleCheckboxChange}
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
        ) : (
          <li key={item.id}>
            <span className="li__bullet">{item.completed ? <BlueCheckmark /> : <Unchecked />}</span>
            <span className={item.completed ? 'strikethrough' : ''}>{item.listItem}</span>
          </li>
        ),
      )}
    </ul>
  );
};
