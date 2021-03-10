import React, { useMemo, memo, forwardRef } from 'react';
import classnames from 'classnames';

import styles from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string,
  icon?: JSX.Element,
  isLoading?: boolean,
  inverted?: boolean,
  height?: number | string,
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  icon,
  isLoading,
  disabled,
  inverted,
  color,
  style,
  height,
  ...rest
}, ref) => {
  const buttonStyle = useMemo(() => ({ ...style, height, color }), [style, color, height]);

  return (
    <button
      ref={ref}
      type="button"
      style={buttonStyle}
      className={classnames(
        styles.rootButton,
        'defaultButton',
        className,
        {
          [styles.loading]: isLoading,
          [styles.inverted]: inverted,
          [styles.disabled]: disabled && !isLoading,
        },
      )}
      disabled={isLoading || disabled}
      {...rest}
    >
      {icon && icon}
      <div
        className={classnames({ [styles.childrenMargin]: Boolean(icon) })}
      >
        {children}
      </div>
    </button>
  );
});

Button.displayName = 'Button';

Button.defaultProps = {
  icon: null,
  isLoading: false,
  inverted: false,
  height: '32px',
};

export default memo(Button);
