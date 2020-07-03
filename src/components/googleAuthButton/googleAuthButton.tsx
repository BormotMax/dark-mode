import GoogleLogo from '../../img/googleLogo.svg'
import styles from './googleAuthButton.module.scss'

interface GoogleAuthButtonProps {
  children: Element
  onClick: Function
}

export function GoogleAuthButton({ children, onClick }: GoogleAuthButtonProps) {
  return (
    <div className={styles.googleButtonContainer}>
      <button onClick={(e) => onClick(e)} type="button" className="oval-btn-2">
        <div className={styles.googleButtonContent}>
          <GoogleLogo />
          <div className={styles.googleButtonText}>
            {children}
          </div>
        </div>
      </button>
    </div>
  )
}
