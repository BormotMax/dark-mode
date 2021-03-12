import React, { memo } from 'react';
import { faBars, faEllipsisVertical, faXmark } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReactiveVar, ReactiveVar } from '@apollo/client';

import Breadcrumbs from '../breadcrumbs';
import { isClickOrEnter } from '../../helpers/util';
import { MouseOrKeyboardEvent } from '../../types/custom';
import { Features } from '../../permissions';
import { Protected } from '../protected/protected';

import styles from './mobileHeader.module.scss';

type MobileHeaderProps = {
  hasAlternateView?: boolean,
  children?: React.ReactNode,
  alternatePageViewVar: ReactiveVar<boolean>,
  setNavIsOpen: (isOpen: boolean) => void,
};

const MobileHeader = ({
  hasAlternateView,
  alternatePageViewVar,
  setNavIsOpen,
  children,
}: MobileHeaderProps): JSX.Element => {
  const alternatePageView = useReactiveVar(alternatePageViewVar);

  const handleSwitchToNav = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    setNavIsOpen(true);
  };

  const handleSwitchToAlternateView = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    alternatePageViewVar(!alternatePageView);
  };

  return (
    <div className={styles.mobileHeader}>
      <Protected feature={Features.MobileNav}>
        <div
          role="button"
          tabIndex={0}
          className={styles.button}
          onClick={handleSwitchToNav}
          onKeyDown={handleSwitchToNav}
        >
          <FontAwesomeIcon color="#595959" size="1x" icon={faBars} />
        </div>
      </Protected>
      <Breadcrumbs />
      {hasAlternateView && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleSwitchToAlternateView}
          onKeyDown={handleSwitchToAlternateView}
          className={styles.button}
        >
          {alternatePageView
            ? <FontAwesomeIcon color="#595959" size="1x" icon={faXmark} />
            : <FontAwesomeIcon color="#595959" size="1x" icon={faEllipsisVertical} />}
        </div>
      )}
      {children}
    </div>
  );
};

MobileHeader.defaultProps = { hasAlternateView: false, children: null };

export default memo(MobileHeader);
