import React, { memo } from 'react';

import { faCircleCheck, faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import styles from './checkitem.module.scss';

type Props = {
  id: string;
  disabled: boolean;
  name: string;
  completed: boolean;
  text: string;
  onChangeTask: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

const CheckItem: React.FC<Props> = ({
  id,
  disabled = false,
  name,
  completed,
  text,
  onChangeTask,
}) => {
  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChangeTask(event, id);
  };
  return (
    <li className={styles.listItem}>
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          className={classnames(styles.input, name)}
          name={name}
          value={id}
          checked={completed}
          onChange={handleChangeTask}
        />
        <div className={styles.checkboxes}>
          <div className={styles.checked}>
            <FontAwesomeIcon color="#3C78FB" icon={faCircleCheck} />
          </div>
          <div className={styles.unchecked}>
            <FontAwesomeIcon color="#E0E0E0" icon={faCircle} />
          </div>
        </div>
        <span className={styles.text}>{text}</span>
      </label>
    </li>
  );
};

export default memo(CheckItem);
