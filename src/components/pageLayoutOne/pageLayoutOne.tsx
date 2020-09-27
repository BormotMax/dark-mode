import classnames from 'classnames';
import styles from './pageLayoutOne.module.scss';
import { Role } from '../withAuthentication';
import { SideNav } from '../nav/sideNav';
import { Protected, ProtectedElse } from '../protected/protected';
import { Header } from '../header';
import { Page } from '../nav/nav';
import { MobileNav } from '../nav/mobileNav';

interface PageLayoutOneProps {
  headerText?: string;
  page?: Page;
}

export const PageLayoutOne: React.FC<PageLayoutOneProps> = ({ children, headerText, page }) => (
  <div className={styles.page}>
    <div className="columns">
      <Protected roles={[Role.FREELANCER]}>
        <SideNav page={page} />
        <div className="column">
          {/* The pageContent class removes the left margin. The nav will be in that area instead. */}
          <div className={classnames('container', 'is-desktop', styles.pageContent)}>
            <Header headerText={headerText} page={page} />
            {children}
          </div>
        </div>
      </Protected>
      <ProtectedElse roles={[Role.FREELANCER]}>
        <div className="column">
          <div className={classnames('container', 'is-desktop')}>
            <Header headerText={headerText} page={page} />
            {children}
          </div>
        </div>
      </ProtectedElse>
    </div>
  </div>
);
