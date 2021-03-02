import * as React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faTimes,
  faSolarSystem,
  faRobot,
  faSignOutAlt,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAlienMonster,
} from '@fortawesome/pro-regular-svg-icons';

import { useCurrentUser } from '../../hooks';
import { isClickOrEnter } from '../../helpers/util';
import { Settings } from '../settings';
import { Modal } from '../modal';
import { MouseOrKeyboardEvent, Page } from '../../types/custom';
import CommunityIcon from '../svgIcons/Community';

import styles from './nav.module.scss';

interface NavProps {
  page?: Page;
  goToNextPanel?: () => void;
  isCollapsed?: boolean;
}

const PROJECTS_LINK = '/projects';
const HIRE_PAGE_EDITOR = '/hire-page-editor';

const Nav: React.FC<NavProps> = ({
  page,
  goToNextPanel,
  isCollapsed,
}) => {
  const { signOut } = useCurrentUser();
  const [settingsModalIsOpen, setSettingsModalIsOpen] = React.useState(false);

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

  const openModal = (event) => {
    if (isClickOrEnter(event)) {
      setSettingsModalIsOpen(true);
    }
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
          onClick={handleOnClick}
          onKeyDown={handleOnClick}
          tabIndex={0}
        >
          <FontAwesomeIcon size="1x" icon={faTimes} color="black" />
        </div>
      </div>
      <ul className={classnames(
        styles.navList,
        { [styles.navListCollapsed]: isCollapsed },
        { [styles.navListExpanded]: !isCollapsed },
      )}
      >
        <li className={classnames(styles.disabled)}>
          <div className={classnames(styles.disabledInner)}>
            <FontAwesomeIcon size="1x" icon={faRobot} color="black" />
            {!isCollapsed && 'Dashboard'}
          </div>
        </li>
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
                color={currentPageIsProjects ? 'white' : 'black'}
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
                icon={faAlienMonster}
                color={page === Page.HIRE_EDITOR ? 'white' : 'black'}
              />
              {!isCollapsed && 'Hire Page'}
            </a>
          </Link>
        </li>
        <li>
          <button className="defaultButton" tabIndex={0} type="button" onKeyPress={openModal} onClick={openModal}>
            <FontAwesomeIcon size="1x" icon={faCog} color="black" />
            {!isCollapsed && 'Settings'}
          </button>
        </li>
        <li className={styles.community}>
          <a href="https://community.continuum.works/users/sign_in">
            <CommunityIcon />
            {!isCollapsed && 'Community'}
          </a>
        </li>
        <li>
          <button className="defaultButton" type="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
            <FontAwesomeIcon size="1x" icon={faSignOutAlt} color="black" />
            {!isCollapsed && 'Logout'}
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

export default React.memo(Nav);
