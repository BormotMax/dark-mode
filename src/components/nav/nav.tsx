import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonSign, faRocket } from '@fortawesome/pro-light-svg-icons';
import Link from 'next/link';
import styles from './nav.module.scss';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { useCurrentUser } from '../../hooks';

export enum Page {
  PROJECT,
  PROJECTS,
  HIRE,
  HIRE_EDITOR,
}

// The string is what will be displayed in the page's header
// If any headerText is passed in, it will be appended like "Projects > header text"
export const PageTitle = {
  [Page.PROJECT]: 'Projects',
  [Page.PROJECTS]: 'Projects',
  [Page.HIRE]: 'Hire Page',
  [Page.HIRE_EDITOR]: 'Hire Page Editor',
};

interface NavProps {
  page?: Page;
}

export const Nav: React.FC<NavProps> = ({ page }) => {
  const { currentUser, signOut } = useCurrentUser();
  const email = currentUser?.attributes?.email;

  const handleLogout = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      signOut();
    }
  };

  return (
    <>
      <div className={classnames(styles.toolbar)}>
        <img alt="avatar" className={styles.avatar} src={gravatarUrl(email)} />
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
          Logout
        </a>
      </div>
      <ul className={classnames(styles.navList)}>
        <li className={classnames({ [styles.current]: page === Page.PROJECTS })}>
          <Link href="/projects">
            <a href="/projects">
              <FontAwesomeIcon size="1x" icon={faRocket} />
              &nbsp;&nbsp;Projects
            </a>
          </Link>
        </li>
        <li className={classnames({ [styles.current]: page === Page.HIRE_EDITOR })}>
          <Link href="/hirePageEditor">
            <a href="/hirePageEditor">
              <FontAwesomeIcon size="1x" icon={faPersonSign} />
              &nbsp;&nbsp;Hire Page
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
};
