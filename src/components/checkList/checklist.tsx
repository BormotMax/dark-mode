import { ChangeEvent } from 'react';
import BlueCheckmark from '../../img/blueCheckmark.svg';
import Unchecked from '../../img/unchecked.svg';
import styles from './checklist.module.scss';

interface CheckListProps {
  listItems: Array<{
    id: number,
    completed: boolean,
    listItem: string
  }>
  name: string
  callback: Function
  editable?: boolean
}

export const CheckList: React.FC<CheckListProps> = ({
  listItems, name, callback, editable = true,
}) => {
  function handleCheckboxChange({ target }: ChangeEvent<HTMLInputElement>) {
    const inputs: any = document.querySelectorAll<HTMLFormElement>(`.${name}`);
    const items = [];

    for (const input of inputs) {
      items.push({
        id: input.value,
        completed: input.checked,
      });
    }

    callback({ id: target.value, completed: target.checked }, items);
  }

  return (
    <ul className={styles.ul}>
      {listItems.map((item) => (editable ? (
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
                <BlueCheckmark />
              </div>
              <div className={styles.unchecked}>
                <Unchecked />
              </div>
            </div>
            <span className={styles.text}>{item.listItem}</span>
          </label>
        </li>
      ) : (
        <li key={item.id}>
          <span className="li__bullet">
            {item.completed ? <BlueCheckmark /> : <Unchecked />}
          </span>
          <span className={item.completed ? 'strikethrough' : ''}>
            {item.listItem}
          </span>
        </li>
      )))}
    </ul>
  );
};
