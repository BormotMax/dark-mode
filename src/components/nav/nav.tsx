import React, { useState, useCallback, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import classnames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faComments,
  faGlobeAmericas,
  faRocket,
  faSackDollar,
  faSign,
  faSignOut,
  faStopwatch,
  faTimes,
  faUserAstronaut,
} from '@fortawesome/pro-light-svg-icons';

import { useCurrentUser, useLogger } from '../../hooks';
import { Avatar } from '../avatar/avatar';
import { isClickOrEnter } from '../../helpers/util';
import { Settings } from '../settings';
import { getUser } from '../../graphql/queries';
import { Modal } from '../modal';
import { GetUserQuery } from '../../API';
import { MouseOrKeyboardEvent } from '../../types/custom';

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
  goToNextPanel?: () => void;
}

const PROJECTS_LINK = '/projects';
const HIRE_PAGE_EDITOR = '/hire-page-editor';

export const Nav: React.FC<NavProps> = ({ page, goToNextPanel }) => {
  const { logger } = useLogger();
  const { currentUser, signOut } = useCurrentUser();
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const email = currentUser?.attributes?.email;
  const name = currentUser?.attributes?.name;
  const userID = currentUser?.attributes?.sub;

  const handleLogout = (event: MouseOrKeyboardEvent) => {
    if (isClickOrEnter(event)) {
      signOut('/');
    }
  };

  const handleOnClick = (event: MouseOrKeyboardEvent) => {
    if (isClickOrEnter(event)) {
      goToNextPanel();
    }
  };

  const {
    data: userAvatarResponse,
    loading: s3AvatarIsLoading,
  } = useQuery<GetUserQuery>(
    gql(getUser),
    {
      variables: { id: userID },
      skip: !userID,
      onError(error) {
        logger.error('Nav: error get user', { error, input: { email, input: { id: userID } } });
      },
    },
  );
  const userAvatarS3Key = useMemo(
    () => (userAvatarResponse?.getUser?.avatar?.key) ?? '',
    [userAvatarResponse],
  );

  const openModal = (event) => {
    if (isClickOrEnter(event)) {
      setSettingsModalIsOpen(true);
    }
  };

  const closeModal = useCallback(
    () => {
      setSettingsModalIsOpen(false);
    },
    [],
  );

  return (
    <div className={styles.nav}>
      <div className={styles.toolbar}>
        <Avatar
          s3AvatarIsLoading={s3AvatarIsLoading}
          s3key={userAvatarS3Key}
          email={email}
          name={name}
          width={48}
          height={48}
        />
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
        {/* <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner, styles.longText)}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faComments} />
            Conversations
          </div>
          <div className={classnames(styles.soon)}>Soon</div>
        </li> */}
        <li className={classnames({ [styles.current]: page === Page.PROJECTS })}>
          <Link href={PROJECTS_LINK}>
            <a href={PROJECTS_LINK}>
              <FontAwesomeIcon color="#ffffff" size="1x" icon={faRocket} />
              Projects
            </a>
          </Link>
        </li>
        {/* <li className={classnames(styles.disabled)}>
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
        </li> */}
        <li className={classnames({ [styles.current]: page === Page.HIRE_EDITOR })}>
          <Link href={HIRE_PAGE_EDITOR}>
            <a href={HIRE_PAGE_EDITOR}>
              <FontAwesomeIcon color="#ffffff" size="1x" icon={faSign} />
              Hire Page
            </a>
          </Link>
        </li>
        <li>
          <button className="defaultButton" tabIndex={0} type="button" onKeyPress={openModal} onClick={openModal}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faCog} />
            Settings
          </button>
        </li>
        <li>
          <a href="https://community.continuum.works/users/sign_in">
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faGlobeAmericas} />
            Community
          </a>
        </li>
        <li>
          <button className="defaultButton" type="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faSignOut} />
            Logout
          </button>
        </li>
      </ul>
      <Modal
        isOpen={settingsModalIsOpen}
        closeModal={closeModal}
      >
        <Settings close={closeModal} />
      </Modal>
    </div>
  );
};
