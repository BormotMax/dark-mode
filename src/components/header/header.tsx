import classnames from 'classnames';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/pro-light-svg-icons';
// import { useState } from 'react';
import styles from './header.module.scss';
// import { Protected } from '../protected/protected';
// import { Role } from '../withAuthentication';
import { PageTitle, Page } from '../nav/nav';
// import { MobileNav } from '../nav/mobileNav';

interface HeaderProps {
  headerText?: string;
  page: Page;
}

export const Header: React.FC<HeaderProps> = ({ headerText, page, children }) => {
  // const [isNavOpen, setIsNavOpen] = useState(false);

  // const toggleNav = (e: any) => {
  //   if (e.keyCode === undefined || e.keyCode === 13) {
  //     setIsNavOpen(!isNavOpen);
  //   }
  // };

  return (
    <>
      <div className={classnames(styles.header)}>
        <div className={classnames(styles.headerText)}>{PageTitle[page] + (headerText ? ` > ${headerText}` : '')}</div>
        <div className={classnames(styles.right)}>
          {children && children}
          {/* <Protected roles={[Role.FREELANCER]}>
            <div className={classnames('is-hidden-tablet')} tabIndex={0} role="button" onKeyDown={toggleNav} onClick={toggleNav}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Protected> */}
        </div>
      </div>
      {/* <Protected roles={[Role.FREELANCER]}>
        {isNavOpen && (
          <div className={classnames('is-hidden-tablet', styles.nav)}>
            <MobileNav page={page} />
          </div>
        )}
      </Protected> */}
    </>
  );
};
