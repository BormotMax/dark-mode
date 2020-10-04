import classnames from 'classnames';
import styles from './buttons.module.scss';

interface ButtonProps {
  text: string;
  isSaving?: boolean;
  onClick: Function;
}

export const ButtonSmall: React.FC<ButtonProps> = ({ text, isSaving, onClick }) => (
  <button
    onClick={(e) => onClick(e)}
    disabled={isSaving}
    type="submit"
    className={classnames(styles.button, styles.buttonSmall, { [styles.loading]: isSaving })}
  >
    {text}
  </button>
);
