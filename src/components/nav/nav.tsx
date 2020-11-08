import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonSign, faRocket, faSignOut, faTimes } from '@fortawesome/pro-light-svg-icons';

import { useCurrentUser } from '../../hooks';
import { Avatar } from '../avatar/avatar';

import styles from './nav.module.scss';

export enum Page {
  PROJECT,
  PROJECTS,
  HIRE,
  HIRE_EDITOR,
  ALL_USERS,
}

interface NavProps {
  page?: Page;
  goToNextPanel?: Function;
}

export const Nav: React.FC<NavProps> = ({ page, goToNextPanel }) => {
  const { currentUser, signOut } = useCurrentUser();
  const email = currentUser?.attributes?.email;
  const name = currentUser?.attributes?.name;

  const handleLogout = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      signOut();
    }
  };

  const handleOnClick = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      goToNextPanel();
    }
  };

  return (
    <div className={classnames(styles.nav)}>
      <div className={classnames(styles.toolbar)}>
        <Avatar email={email} name={name} width={48} height={48} />
        <div
          role="button"
          className={classnames('is-hidden-tablet', styles.closeNav)}
          onClick={handleOnClick}
          onKeyDown={handleOnClick}
          tabIndex={0}
        >
          <FontAwesomeIcon size="1x" icon={faTimes} color="#828282" />
        </div>
      </div>
      <ul className={classnames(styles.navList)}>
        <li className={classnames({ [styles.current]: page === Page.PROJECTS })}>
          <Link href="/projects">
            <a href="/projects">
              <FontAwesomeIcon color="#000000" size="1x" icon={faRocket} />
              &nbsp;&nbsp;Projects
            </a>
          </Link>
        </li>
        <li className={classnames({ [styles.current]: page === Page.HIRE_EDITOR })}>
          <Link href="/hire-page-editor">
            <a href="/hire-page-editor">
              <FontAwesomeIcon color="#000000" size="1x" icon={faPersonSign} />
              &nbsp;&nbsp;Hire Page
            </a>
          </Link>
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
            <FontAwesomeIcon color="#000000" size="1x" icon={faSignOut} />
            &nbsp;&nbsp;Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
