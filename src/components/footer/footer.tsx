import Link from 'next/link';
import classnames from 'classnames';
import styles from './footer.module.scss';

interface FooterProps {
  radius?: boolean;
  dark?: boolean;
}
export const Footer: React.FC<FooterProps> = ({ radius, dark }) => (
  <footer className={classnames(styles.footer, { [styles.radius]: radius, [styles.dark]: dark }, 'footer')}>
    <div className="columns is-vcentered">
      <div className={`${styles.left} column is-4`}> Copyright &copy; 2020 Contimuum&nbsp;Works&nbsp;Inc. </div>
      <div className="column is-4">
        <img className={styles.logo} alt="logo" src="/Logo.png" />
      </div>
      <div className={`${styles.right} column is-4`}>
        <Link href="/termsAndConditions">
          <a href="/termsAndConditions" className={styles.left}>
            T&C
          </a>
        </Link>
        <Link href="privacy">
          <a href="privacy">Privacy</a>
        </Link>
      </div>
    </div>
  </footer>
);
