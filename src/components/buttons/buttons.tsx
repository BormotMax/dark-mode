import React, { useMemo, memo } from 'react';
import classnames from 'classnames';

import styles from './buttons.module.scss';

interface ButtonProps {
  text: string;
  isSaving?: boolean;
  onClick?: (event?: any) => void;
  disabled?: boolean;
  inverted?: boolean;
  form?: string;
  className?: string;
  extraBorderRadius?: boolean;
  padding?: string;
  invert?: boolean;
}

export const ButtonSmall: React.FC<ButtonProps> = memo(({
  text,
  isSaving,
  onClick,
  inverted = false,
  form,
  disabled,
  className,
  extraBorderRadius = false,
  padding,
}) => {
  const style = useMemo(
    () => (padding ? { padding } : null),
    [padding],
  );

  return (
    <button
      onClick={onClick || undefined}
      form={form}
      disabled={isSaving || disabled}
      type="submit"
      style={style}
      className={classnames(
        styles.button,
        styles.buttonSmall,
        className,
        {
          [styles.loading]: isSaving && !disabled,
          [styles.disabled]: disabled && !isSaving,
          [styles.inverted]: inverted,
          [styles.extraBorderRadius]: extraBorderRadius,
          [styles.defaultPadding]: !padding,
        },
      )}
    >
      {text}
    </button>
  );
});

ButtonSmall.displayName = 'ButtonSmall';
