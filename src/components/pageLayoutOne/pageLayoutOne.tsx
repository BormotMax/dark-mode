import classnames from 'classnames';
import styles from './pageLayoutOne.module.scss';
import { Role } from '../withAuthentication';
import { SideNav } from '../sideNav/sideNav';
import { Protected } from '../protected/protected';
import { Header } from '../header';
import { useDelayedFlash } from '../../hooks';

interface PageLayoutOneProps {
  headerText?: string;
}

export const PageLayoutOne: React.FC<PageLayoutOneProps> = ({ children, headerText }) => {
  const [delayedFlash] = useDelayedFlash();

  return (
    <div className={styles.page}>
      <div className="flash-message">{delayedFlash}</div>
      <Header headerText={headerText} />
      <main className={`${styles.body} container is-desktop`}>
        <div className={`${styles.columns} columns`}>
          <Protected roles={[Role.FREELANCER]}>
            <div className={classnames('column', 'is-narrow', styles.navColumn, 'is-hidden-mobile')}>
              <SideNav />
            </div>
          </Protected>
          <>{children}</>
        </div>
      </main>
    </div>
  );
};
