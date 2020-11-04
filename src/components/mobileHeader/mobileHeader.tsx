import React from 'react';
import { faBars, faEllipsisV, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import styles from './mobileHeader.module.scss';

export enum ViewingState {
  FIRST_CHILD,
  SECOND_CHILD,
  NAV,
}

interface MobileHeaderProps {
  currentViewingState: ViewingState;
  headerText: string;
  changePanel: Function;
  hasSecondChild: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentViewingState,
  headerText,
  changePanel,
  hasSecondChild,
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
    <div className={classnames(styles.mobileHeader)}>
      <div
        role="button"
        tabIndex={0}
        className={classnames(styles.button, { [styles.hidden]: currentViewingState === ViewingState.SECOND_CHILD })}
        onClick={handleSwitchToNav}
        onKeyDown={handleSwitchToNav}
      >
        <FontAwesomeIcon color="#595959" size="1x" icon={faBars} />
      </div>
      <div>{headerText}</div>
      {currentViewingState === ViewingState.FIRST_CHILD && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleSwitchToRight}
          onKeyDown={handleSwitchToRight}
          className={classnames(styles.button, { [styles.hidden]: !hasSecondChild })}
        >
          <FontAwesomeIcon color="#595959" size="1x" icon={faEllipsisV} />
        </div>
      )}
      {currentViewingState === ViewingState.SECOND_CHILD && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleSwitchToLeft}
          onKeyDown={handleSwitchToLeft}
          className={classnames(styles.button, { [styles.hidden]: !hasSecondChild })}
        >
          <FontAwesomeIcon color="#595959" size="1x" icon={faTimes} />
        </div>
      )}
    </div>
  );
};
