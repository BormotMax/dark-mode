import Link from 'next/link';
import classnames from 'classnames';
import styles from './footer.module.scss';

export const Footer: React.FC = () => (
  <footer className={classnames(styles.footer)}>
    <div className={classnames(styles.footerContainer, 'container')}>
      <div>
        <Link href="/privacyPolicy">
          <a href="/privacyPolicy">Privacy Policy</a>
        </Link>
      </div>
      <div>
        <Link href="/termsAndConditions">
          <a href="/termsAndConditions">Terms & Conditions</a>
        </Link>
      </div>
      <div>Copyright &copy; 2020 Continuum&nbsp;Works&nbsp;Inc.</div>
    </div>
  </footer>
);
