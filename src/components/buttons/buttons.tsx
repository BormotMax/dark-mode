import classnames from 'classnames';
import styles from './buttons.module.scss';

interface ButtonProps {
  text: string;
  isSaving?: boolean;
  onClick?: Function;
  inverted?: boolean;
  form?: string;
}

export const ButtonSmall: React.FC<ButtonProps> = ({ text, isSaving, onClick, inverted = false, form }) => (
  <button
    onClick={(e) => (onClick ? onClick(e) : () => {})}
    form={form}
    disabled={isSaving}
    type="submit"
    className={classnames(styles.button, styles.buttonSmall, { [styles.loading]: isSaving, [styles.inverted]: inverted })}
  >
    {text}
  </button>
);
