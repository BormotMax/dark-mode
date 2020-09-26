import classnames from 'classnames';
import { Nav, Page } from './nav';
import styles from './nav.module.scss';

interface MobileNavProps {
  page?: Page;
}

export const MobileNav: React.FC<MobileNavProps> = ({ page }) => (
  <div className={classnames('is-hidden-desktop', styles.nav, styles.mobileNav)}>
    <Nav page={page} />
  </div>
);
