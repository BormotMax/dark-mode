import * as React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faXmark,
  faSolarSystem,
  faRightFromBracket,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAlien8bit,
  faUsers,
  faRobot,
} from '@fortawesome/pro-regular-svg-icons';

import { useCurrentUser } from '../../hooks';
import { isClickOrEnter } from '../../helpers/util';
import { Settings } from '../settings';
import Modal from '../modal';
import { MouseOrKeyboardEvent, Page } from '../../types/custom';

import styles from './nav.module.scss';

interface NavProps {
  page?: Page;
  setNavIsOpen?: (isOpen: boolean) => void;
  isCollapsed?: boolean;
}

const PROJECTS_LINK = '/projects';
const HIRE_PAGE_EDITOR = '/hire-page-editor';

const Nav: React.FC<NavProps> = ({
  page,
  setNavIsOpen,
  isCollapsed,
}) => {
  const { signOut } = useCurrentUser();
  const [settingsModalIsOpen, setSettingsModalIsOpen] = React.useState(false);

  const handleLogout = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    signOut('/');
  };

  const onCloseNav = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    setNavIsOpen(false);
  };

  const openModal = (event) => {
    if (!isClickOrEnter(event)) return;
    setSettingsModalIsOpen(true);
  };

  const closeModal = React.useCallback(
    () => {
      setSettingsModalIsOpen(false);
    },
    [],
  );

  const currentPageIsProjects = page === Page.PROJECTS || page === Page.PROJECT;

  return (
    <div className={styles.nav}>
      <div className={classnames(styles.toolbar, 'is-hidden-tablet')}>
        <div
          role="button"
          className={styles.closeNav}
          onClick={onCloseNav}
          onKeyDown={onCloseNav}
          tabIndex={0}
        >
          <FontAwesomeIcon size="1x" icon={faXmark} color="black" />
        </div>
      </div>
      <ul className={classnames(
        styles.navList,
        { [styles.navListCollapsed]: isCollapsed },
        { [styles.navListExpanded]: !isCollapsed },
      )}
      >
        {/* <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner)}>
            <FontAwesomeIcon size="1x" icon={faRobot} color="black" />
            {!isCollapsed && 'Dashboard'}
          </div>
        </li> */}
        {/* <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner, styles.longText)}>
            <FontAwesomeIcon color="#ffffff" size="1x" icon={faComments} />
            Conversations
          </div>
          <div className={classnames(styles.soon)}>Soon</div>
        </li> */}
        <li className={classnames({ [styles.current]: currentPageIsProjects })}>
          <Link href={PROJECTS_LINK}>
            <a href={PROJECTS_LINK}>
              <FontAwesomeIcon
                size="1x"
                icon={faSolarSystem}
              />
              {!isCollapsed && 'Project Spaces'}
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
              <FontAwesomeIcon
                size="1x"
                icon={faAlien8bit}
              />
              {!isCollapsed && 'Hire Page'}
            </a>
          </Link>
        </li>
        <li>
          <button className="defaultButton" tabIndex={0} type="button" onKeyPress={openModal} onClick={openModal}>
            <FontAwesomeIcon size="1x" icon={faGear} />
            {!isCollapsed && 'Settings'}
          </button>
        </li>
        <li className={styles.community}>
          <a href="https://community.continuum.works/users/sign_in">
            <FontAwesomeIcon size="1x" icon={faUsers} />
            {!isCollapsed && 'Community'}
          </a>
        </li>
        <li>
          <button className="defaultButton" type="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
            <FontAwesomeIcon size="1x" icon={faRightFromBracket} />
            {!isCollapsed && 'Logout'}
          </button>
        </li>
      </ul>
      <Modal
        maxWidth="668px"
        isOpen={settingsModalIsOpen}
        closeModal={closeModal}
      >
        <Settings close={closeModal} />
      </Modal>
    </div>
  );
};

export default React.memo(Nav);
