import { MouseEvent } from 'react';
import GoogleLogo from '../../img/googleLogo.svg';
import styles from './googleAuthButton.module.scss';

interface GoogleAuthButtonProps {
  children: string;
  onClick: (e: MouseEvent) => void;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ children, onClick }) => (
  <div className={styles.googleButtonContainer}>
    <button onClick={onClick} type="button" className="btn-large">
      <div className={styles.googleButtonContent}>
        <GoogleLogo />
        <div className={styles.googleButtonText}>{children}</div>
      </div>
    </button>
  </div>
);
