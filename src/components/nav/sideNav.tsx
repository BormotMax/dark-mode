import classnames from 'classnames';
import styles from './nav.module.scss';
import { Nav, Page } from './nav';

interface SideNavProps {
  page?: Page;
}

export const SideNav: React.FC<SideNavProps> = ({ page }) => (
  <div className={classnames('column', 'is-narrow', styles.nav, styles.sideNav, 'is-hidden-mobile')}>
    <Nav page={page} />
  </div>
);
