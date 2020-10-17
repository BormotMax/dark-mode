import classnames from 'classnames';
import React from 'react';
import styles from './header.module.scss';
import { Page } from '../nav/nav';
import { Role } from '../withAuthentication';
import { Protected } from '../protected/protected';

interface HeaderProps {
  headerText?: string | JSX.Element;
  page: Page;
}

export const Header: React.FC<HeaderProps> = ({ headerText, page, children }) => (
  // const [isNavOpen, setIsNavOpen] = useState(false);

  // const toggleNav = (e: any) => {
  //   if (e.keyCode === undefined || e.keyCode === 13) {
  //     setIsNavOpen(!isNavOpen);
  //   }
  // };

  <>
    <div className={classnames(styles.header)}>
      <div className={classnames(styles.headerText)}>{headerText}</div>
      <div className={classnames(styles.right)}>
        <Protected roles={[Role.FREELANCER]}>{children && children}</Protected>
        {/* <Protected roles={[Role.FREELANCER]}>
            <div className={classnames('is-hidden-tablet')} tabIndex={0} role="button" onKeyDown={toggleNav} onClick={toggleNav}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Protected> */}
      </div>
    </div>
  </>
);
