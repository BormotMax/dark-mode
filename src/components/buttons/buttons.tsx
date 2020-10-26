import classnames from 'classnames';
import styles from './buttons.module.scss';

interface ButtonProps {
  text: string;
  isSaving?: boolean;
  onClick?: Function;
  inverted?: boolean;
}

export const ButtonSmall: React.FC<ButtonProps> = ({ text, isSaving, onClick, inverted = false }) => (
  <button
    onClick={(e) => (onClick ? onClick(e) : () => {})}
    disabled={isSaving}
    type="submit"
    className={classnames(styles.button, styles.buttonSmall, { [styles.loading]: isSaving, [styles.inverted]: inverted })}
  >
    {text}
  </button>
);
