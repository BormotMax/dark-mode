import classnames from 'classnames';
import Logo from '../../img/logo2.svg';
import styles from './header.module.scss';
import { useCurrentUser } from '../../hooks';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import { SideNav } from '../sideNav/sideNav';
import { useState } from 'react';

interface HeaderProps {
  headerText?: string;
}

export const Header: React.FC<HeaderProps> = ({ headerText }) => {
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
      <div className={classnames(styles.inner, 'container', 'is-desktop')}>
        <Logo />
        <div className={classnames(styles.headerText)}>{headerText}</div>
        <div className={classnames(styles.right)}>
          <div className={classnames('is-hidden-desktop')} tabIndex={0} role="button" onKeyDown={toggleNav} onClick={toggleNav}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className={classnames(styles.rightInner)}>
            {currentUser && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
                Logout
              </a>
            )}

            {email ? <img alt="avatar" className={styles.avatar} src={gravatarUrl(email)} /> : <div className={styles.avatar} />}
          </div>
        </div>
        {isNavOpen && (
          <div className={classnames('is-hidden-desktop', styles.nav)}>
            <SideNav />
          </div>
        )}
      </div>
    </div>
  );
};
