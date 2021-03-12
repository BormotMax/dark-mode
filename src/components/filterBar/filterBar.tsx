import React, { memo } from 'react';
import classnames from 'classnames';

import { isClickOrEnter } from '../../helpers/util';
import { MouseOrKeyboardEvent } from '../../types/custom';

import styles from './filterBar.module.scss';

type FilterBarProps = {
  options: Record<string, string>,
  current: string,
  handleChange: (key: string) => void,
};

const FilterBar = ({ options, current, handleChange }: FilterBarProps) => {
  const onChange = (option: string) => (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    handleChange(option);
  };

  return (
    <div className={styles.filters}>
      {Object.entries(options).map(([key, title]) => (
        <div
          role="button"
          tabIndex={0}
          className={classnames(styles.filter, { [styles.activeFilter]: current === key })}
          onClick={onChange(key)}
          onKeyDown={onChange(key)}
          key={key}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

export default memo(FilterBar);
