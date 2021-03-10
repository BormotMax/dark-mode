import * as React from 'react';
import classnames from 'classnames';

import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isInvalid?: boolean;
  height?: string | number;
}

const TextAreaComponent = ({
  label,
  className,
  isInvalid,
  height,
  ...rest
}: InputProps) => {
  const style = React.useMemo(
    () => (height ? { height } : null),
    [height],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <textarea
        style={style}
        className={classnames(
          className,
          styles.rootInput,
          styles.textArea,
          { [styles.invalid]: isInvalid },
        )}
        {...rest}
      />
    </div>
  );
};

TextAreaComponent.defaultProps = { isInvalid: false, height: null };
TextAreaComponent.displayName = 'Input';

export const TextArea = React.memo(TextAreaComponent);
