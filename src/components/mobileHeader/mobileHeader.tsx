import * as React from 'react';
import { faBars, faEllipsisVertical, faXmark } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import Breadcrumbs from '../breadcrumbs';

import styles from './mobileHeader.module.scss';

export enum ViewingState {
  FIRST_CHILD,
  SECOND_CHILD,
  NAV,
}

interface MobileHeaderProps {
  currentViewingState: ViewingState;
  changePanel: (arg0: ViewingState) => void;
  hasSecondChild: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentViewingState,
  changePanel,
  hasSecondChild,
  children,
}) => {
  const handleSwitchToNav = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      changePanel(ViewingState.NAV);
    }
  };

  const handleSwitchToRight = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      changePanel(ViewingState.SECOND_CHILD);
    }
  };

  const handleSwitchToLeft = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      changePanel(ViewingState.FIRST_CHILD);
    }
  };

  return (
    <div className={styles.mobileHeader}>
      <div
        role="button"
        tabIndex={0}
        className={classnames(styles.button, { [styles.hidden]: currentViewingState === ViewingState.SECOND_CHILD })}
        onClick={handleSwitchToNav}
        onKeyDown={handleSwitchToNav}
      >
        <FontAwesomeIcon color="#595959" size="1x" icon={faBars} />
      </div>
      <Breadcrumbs />
      {hasSecondChild && currentViewingState === ViewingState.FIRST_CHILD && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleSwitchToRight}
          onKeyDown={handleSwitchToRight}
          className={styles.button}
        >
          <FontAwesomeIcon color="#595959" size="1x" icon={faEllipsisVertical} />
        </div>
      )}
      {hasSecondChild && currentViewingState === ViewingState.SECOND_CHILD && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleSwitchToLeft}
          onKeyDown={handleSwitchToLeft}
          className={styles.button}
        >
          <FontAwesomeIcon color="#595959" size="1x" icon={faXmark} />
        </div>
      )}
      {children && children}
    </div>
  );
};
