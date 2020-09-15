import classnames from 'classnames';
import styles from './pageLayoutOne.module.scss';
import { Role } from '../withAuthentication';
import { SideNav, Page } from '../sideNav/sideNav';
import { Protected } from '../protected/protected';
import { Header } from '../header';

interface PageLayoutOneProps {
  headerText?: string;
  page?: Page;
}

export const PageLayoutOne: React.FC<PageLayoutOneProps> = ({ children, headerText, page }) => (
  <div className={styles.page}>
    <Header headerText={headerText} page={page} />
    <main className={`${styles.body} container is-desktop`}>
      <div className={`${styles.columns} columns`}>
        <Protected roles={[Role.FREELANCER]}>
          <div className={classnames('column', 'is-narrow', styles.navColumn, 'is-hidden-mobile')}>
            <SideNav page={page} />
          </div>
        </Protected>
        <>{children}</>
      </div>
    </main>
  </div>
);
