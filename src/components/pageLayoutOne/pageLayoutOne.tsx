import classnames from 'classnames';
import styles from './pageLayoutOne.module.scss';
import { Role } from '../withAuthentication';
import { SideNav } from '../sideNav/sideNav';
import { Protected } from '../protected/protected';
import { Header } from '../header';

interface PageLayoutOneProps {
  headerText?: string;
  flash?: string;
}

export const PageLayoutOne: React.FC<PageLayoutOneProps> = ({ children, headerText, flash }) => (
  <div className={styles.page}>
    <div className="flash-message">{flash}</div>
    <Header headerText={headerText} />
    <main className={`${styles.body} container is-desktop`}>
      <div className={`${styles.columns} columns`}>
        <div className={classnames('column', 'is-narrow', styles.navColumn, 'is-hidden-touch')}>
          <Protected roles={[Role.FREELANCER]}>
            <SideNav />
          </Protected>
        </div>
        <>{children}</>
      </div>
    </main>
  </div>
);
