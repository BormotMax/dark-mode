import Link from 'next/link';
import classnames from 'classnames';
import styles from './footer.module.scss';
import LinkedInLogo from '../../img/linkedIn.svg';
import InstagramLogo from '../../img/instagram.svg';
import Twitter from '../../img/twitter.svg';

export const Footer: React.FC = () => (
  <footer className={classnames(styles.footer)}>
    <div className={classnames(styles.left)}>
      <Link href="/privacyPolicy">
        <a href="/privacyPolicy">Privacy Policy</a>
      </Link>
      <Link href="/termsAndConditions">
        <a href="/termsAndConditions">Terms & Conditions</a>
      </Link>
      <div>Copyright &copy; 2020 Continuum&nbsp;Works</div>
    </div>
    <div className={classnames(styles.right)}>
      <a target="_blank" rel="noreferrer" href="https://twitter.com/continuumworks">
        <Twitter />
      </a>
      <a target="_blank" rel="noreferrer" href="https://www.instagram.com/continuumworks/">
        <InstagramLogo />
      </a>
      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/continuumworks">
        <LinkedInLogo />
      </a>
    </div>
  </footer>
);
