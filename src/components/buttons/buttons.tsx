import React, { useMemo, memo } from 'react';
import classnames from 'classnames';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './buttons.module.scss';

export enum Size {
  SMALL,
  MIDDLE,
  BIG
}

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

export const ConfirmButton: React.FC<ButtonProps> = memo(({
  text,
  isSaving,
  onClick,
  inverted = false,
  form,
  disabled,
  className,
  extraBorderRadius = false,
  size,
  invert,
}) => {
  const fontSize = size === Size.MIDDLE ? styles.confirmButton__middle : styles.confirmButton;
  const invertColor = invert ? styles.confirmButton__invert : '';

  return (
    <button
      onClick={onClick || undefined}
      form={form}
      disabled={isSaving || disabled}
      type="submit"
      className={classnames(
        styles.button,
        fontSize,
        className,
        invertColor,
        {
          [styles.loading]: isSaving && !disabled,
          [styles.disabled]: disabled && !isSaving,
          [styles.inverted]: inverted,
          [styles.extraBorderRadius]: extraBorderRadius,
        },
      )}
    >
      {text}
    </button>
  );
});

ConfirmButton.displayName = 'ConfirmButton';

export const DeleteButton: React.FC<ButtonProps> = memo(({
  text,
  isSaving,
  onClick,
  inverted = false,
  disabled,
  className,
  extraBorderRadius = false,
}) => {

  return (
    <button
      onClick={onClick || undefined}
      disabled={isSaving || disabled}
      type="button"
      className={classnames(
        styles.button,
        styles.deleteButton,
        className,
        {
          [styles.loading]: isSaving && !disabled,
          [styles.disabled]: disabled && !isSaving,
          [styles.inverted]: inverted,
          [styles.extraBorderRadius]: extraBorderRadius,
        },
      )}
    >
      <FontAwesomeIcon color="white" icon={faTrash} />
      {text}
    </button>
  );
});

DeleteButton.displayName = 'DeleteButton';
