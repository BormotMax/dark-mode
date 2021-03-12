import React, { useEffect, memo } from 'react';
import { makeVar } from '@apollo/client';

import { Page } from '../../types/custom';
import { useWindowSize } from '../../hooks';
import { MOBILE_LAYOUT_BREAKPOINT } from '../../helpers/constants';

import DesktopLayout from './desktopLayout';
import MobileLayout from './mobileLayout';
import styles from './pageLayout.module.scss';

type PageLayoutOneProps = {
  page: Page,
  hasAlternateView?: boolean,
  children: React.ReactNode,
};

export const alternatePageViewVar = makeVar(false);

const PageLayout = ({
  children,
  hasAlternateView,
  page,
}: PageLayoutOneProps): JSX.Element => {
  const windowSize = useWindowSize();

  useEffect(
    () => {
      if (windowSize.width > MOBILE_LAYOUT_BREAKPOINT) {
        alternatePageViewVar(false);
      }
    },
    [windowSize.width],
  );

  if (windowSize.width <= MOBILE_LAYOUT_BREAKPOINT) {
    return (
      <div className={styles.page}>
        <MobileLayout
          alternatePageViewVar={alternatePageViewVar}
          hasAlternateView={hasAlternateView}
          page={page}
        >
          {children}
        </MobileLayout>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <DesktopLayout page={page}>
        {children}
      </DesktopLayout>
    </div>
  );
};

PageLayout.defaultProps = { hasAlternateView: false };

export default memo(PageLayout);
