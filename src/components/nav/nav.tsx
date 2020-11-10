/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faComments, faGlobeAmericas, faLayerGroup, faPersonSign, faRocket, faSackDollar, faSign, faSignOut, faStopwatch, faTimes, faUserAstronaut } from '@fortawesome/pro-light-svg-icons';

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
          <FontAwesomeIcon size="1x" icon={faTimes} color="#ffffff" />
        </div>
      </div>
      <ul className={classnames(styles.navList)}>
        <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner)}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faUserAstronaut} />
            Dashboard
          </div>
          <div className={classnames(styles.soon)}>Soon</div>
        </li>
        <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner, styles.longText)}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faComments} />
            Conversations
          </div>
          <div className={classnames(styles.soon)}>Soon</div>
        </li>
        <li className={classnames({ [styles.current]: page === Page.PROJECTS })}>
          <Link href="/projects">
            <a href="/projects">
              <FontAwesomeIcon color="#ffffff" size="1x" icon={faRocket} />
              Projects
            </a>
          </Link>
        </li>
        <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner)}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faSackDollar} />
            Financial
          </div>
          <div className={classnames(styles.soon)}>Soon</div>
        </li>
        <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner)}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faStopwatch} />
            Tasks & Time
          </div>
          <div className={classnames(styles.soon)}>Soon</div>
        </li>
        <li className={classnames({ [styles.current]: page === Page.HIRE_EDITOR })}>
          <Link href="/hire-page-editor">
            <a href="/hire-page-editor">
              <FontAwesomeIcon color="#ffffff" size="1x" icon={faSign} />
              Hire Page
            </a>
          </Link>
        </li>
        <Protected roles={[Role.ADMIN]}>
          <InPlaceModal
            variant={InPlaceModalVariants.FIXED}
            button={
              <li>
                <a role="button">
                  <FontAwesomeIcon color="#ffffff" size="1x" icon={faCog} />
                  Settings
                </a>
              </li>
            }
          >
            <Settings />
          </InPlaceModal>
        </Protected>
        <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner)}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faGlobeAmericas} />
            Community
          </div>
          <div className={classnames(styles.soon)}>Soon</div>
        </li>
        <li>
          <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faSignOut} />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
