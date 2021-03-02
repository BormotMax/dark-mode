import * as React from 'react';
import classnames from 'classnames';
import { makeVar, useReactiveVar } from '@apollo/client';

import { Protected, ProtectedElse } from '../protected/protected';
import { Header } from '../header';
import Nav from '../nav';
import { MobileHeader } from '../mobileHeader';
import { Features } from '../../permissions';
import { Page } from '../../types/custom';

import styles from './pageLayoutOne.module.scss';

interface PageLayoutOneProps {
  headerText?: string | JSX.Element;
  page?: Page;
}

export enum ViewingState {
  FIRST_CHILD,
  SECOND_CHILD,
  NAV,
}

export const PageLayoutOne: React.FC<PageLayoutOneProps> = React.memo(({
  children,
  page,
}) => (
  <div className={styles.page}>
    <DesktopLayout
      content={children}
      page={page}
    />
    <MobileLayout
      content={children}
      page={page}
    />
  </div>
));
PageLayoutOne.displayName = 'PageLayoutOne';

const MobileLayout = ({ content, page }) => {
  const [viewingState, setViewingState] = React.useState(ViewingState.FIRST_CHILD);
  return (
    <div className="columns is-mobile is-hidden-tablet relative">
      <Protected feature={Features.MobileNav}>
        {viewingState === ViewingState.NAV && (
          <div className={classnames('column', styles.nav, 'is-hidden-tablet')}>
            <Nav page={page} goToNextPanel={() => setViewingState(ViewingState.FIRST_CHILD)} />
          </div>
        )}
        <div className={classnames('column', 'test', styles.noPadding, { [styles.hidden]: viewingState === ViewingState.NAV })}>
          {/* The pageContent class removes the left margin. The nav will be in that area instead. */}
          <div
            className={classnames(
              'container',
              'is-desktop',
              styles.pageContent,
            )}
          >
            <MobileHeader
              currentViewingState={viewingState}
              changePanel={(nextViewingState) => setViewingState(nextViewingState)}
              hasSecondChild={!!React.Children.toArray(content)[1]}
            />
            <div className="columns">{React.Children.toArray(content)[viewingState]}</div>
          </div>
        </div>
      </Protected>
      <ProtectedElse feature={Features.MobileHeader}>
        <div className="column">
          <div className={classnames('container', 'is-desktop')}>
            <Header />
            {content}
          </div>
        </div>
      </ProtectedElse>
    </div>
  );
};

const navIsCollapsedVar = makeVar(false);

const DesktopLayout = ({ content, page }) => {
  const navIsCollapsed = useReactiveVar(navIsCollapsedVar);

  const onClickCollapseButton = React.useCallback(
    () => {
      navIsCollapsedVar(!navIsCollapsed);
    },
    [navIsCollapsed],
  );

  return (
    <div className="is-hidden-mobile">
      <Header navIsCollapsed={navIsCollapsed} onClickCollapseButton={onClickCollapseButton} />
      <div className={classnames('columns', styles.navColumn)}>
        <Protected feature={Features.DesktopNav}>
          <div className={classnames(
            'column',
            styles.desktopNav,
            { [styles.navCollapsed]: navIsCollapsed },
          )}
          >
            <Nav isCollapsed={navIsCollapsed} page={page} />
          </div>
        </Protected>
        <div className="column relative">
          <div className={styles.pageContent}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
