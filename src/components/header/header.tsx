import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../../img/logo3.svg';
import styles from './header.module.scss';
import { useCurrentUser } from '../../hooks';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { SideNav, Page } from '../sideNav/sideNav';
import { Protected } from '../protected/protected';
import { Role } from '../withAuthentication';

interface HeaderProps {
  headerText?: string;
  page: Page;
}

export const Header: React.FC<HeaderProps> = ({ headerText, page }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { currentUser, signOut } = useCurrentUser();
  const email = currentUser?.attributes?.email;

  const handleLogout = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      signOut();
    }
  };

  const toggleNav = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setIsNavOpen(!isNavOpen);
    }
  };

  return (
    <div className={classnames(styles.header)}>
      <div className={classnames(styles.inner)}>
        <Link href="/">
          <a href="/">
            <Logo />
          </a>
        </Link>
        <div className={classnames(styles.headerText)}>{headerText}</div>
        <div className={classnames(styles.right)}>
          <Protected roles={[Role.FREELANCER]}>
            <div className={classnames('is-hidden-tablet')} tabIndex={0} role="button" onKeyDown={toggleNav} onClick={toggleNav}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Protected>
          <div className={classnames(styles.rightInner)}>
            {currentUser && (
              <>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
                  Logout
                </a>
                <img alt="avatar" className={styles.avatar} src={gravatarUrl(email)} />
              </>
            )}
          </div>
        </div>
        <Protected roles={[Role.FREELANCER]}>
          {isNavOpen && (
            <div className={classnames('is-hidden-tablet', styles.nav)}>
              <SideNav page={page} />
            </div>
          )}
        </Protected>
      </div>
    </div>
  );
};
