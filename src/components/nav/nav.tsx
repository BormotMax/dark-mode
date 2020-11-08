/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPersonSign, faPlusCircle, faRocket, faSignOut, faTimes } from '@fortawesome/pro-light-svg-icons';

import { useCurrentUser } from '../../hooks';
import { Avatar } from '../avatar/avatar';

import styles from './nav.module.scss';
import { isClickOrEnter } from '../../helpers/util';
import { InPlaceModal, InPlaceModalVariants } from '../inPlaceModal';
import { Settings } from '../settings';
import { Protected } from '../protected/protected';
import { Role } from '../withAuthentication';

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
    if (isClickOrEnter(e)) {
      signOut();
    }
  };

  const handleOnClick = (e: any) => {
    if (isClickOrEnter(e)) {
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
        <Protected roles={[Role.ADMIN]}>
          <InPlaceModal
            variant={InPlaceModalVariants.FIXED}
            button={
              <li>
                <a role="button">
                  <FontAwesomeIcon color="#000000" size="1x" icon={faLayerGroup} />
                  &nbsp;&nbsp;Settings
                </a>
              </li>
          }
          >
            <Settings />
          </InPlaceModal>
        </Protected>
        <li>
          <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
            <FontAwesomeIcon color="#000000" size="1x" icon={faSignOut} />
            &nbsp;&nbsp;Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
