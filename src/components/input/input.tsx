import * as React from 'react';
import classnames from 'classnames';

import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isInvalid?: boolean;
}

const InputComponent = ({
  label,
  className,
  isInvalid,
  ...rest
}: InputProps) => (
  <div className={styles.wrapper}>
    <div className={styles.label}>{label}</div>
    <input
      className={classnames(
        className,
        styles.rootInput,
        { [styles.invalid]: isInvalid },
      )}
      {...rest}
    />
  </div>
);

InputComponent.defaultProps = { isInvalid: false };
InputComponent.displayName = 'Input';

export const Input = React.memo(InputComponent);
