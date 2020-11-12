import classnames from 'classnames';
import styles from './buttons.module.scss';

interface ButtonProps {
  text: string;
  isSaving?: boolean;
  onClick?: Function;
  disabled?: boolean;
  inverted?: boolean;
  form?: string;
}

export const ButtonSmall: React.FC<ButtonProps> = ({
  text,
  isSaving,
  onClick,
  inverted = false,
  form,
  disabled,
}) => (
  <button
    onClick={(e) => (onClick ? onClick(e) : () => {})}
    form={form}
    disabled={isSaving || disabled}
    type="submit"
    className={classnames(
      styles.button,
      styles.buttonSmall,
      {
        [styles.loading]: isSaving && !disabled,
        [styles.disabled]: disabled && !isSaving,
        [styles.inverted]: inverted,
      },
    )}
  >
    {text}
  </button>
);
