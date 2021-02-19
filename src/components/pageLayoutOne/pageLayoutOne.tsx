import classnames from 'classnames';
import React, { useState } from 'react';
import Link from 'next/link';

import { Protected, ProtectedElse } from '../protected/protected';
import { Header } from '../header';
import { Nav, Page } from '../nav/nav';
import { MobileHeader } from '../mobileHeader';

import styles from './pageLayoutOne.module.scss';
import { Features } from '../../permissions';

interface PageLayoutOneProps {
  headerText?: string | JSX.Element;
  headerContainer?: string | Record<string, string>;
  headerButton?: JSX.Element;
  page?: Page;
}

export enum ViewingState {
  FIRST_CHILD,
  SECOND_CHILD,
  NAV,
}

export const PageInfo = {
  [Page.PROJECT]: { breadcrumb: 'Projects', href: '/projects' },
  [Page.PROJECTS]: { breadcrumb: 'Projects' },
};

export const PageLayoutOne: React.FC<PageLayoutOneProps> = ({
  children,
  headerText,
  page,
  headerButton,
  headerContainer = '',
}) => {
  const header = PageInfo[page] ? (
    <>
      <Protected feature={Features.HeaderBreadcrumb}>
        {PageInfo[page].href ? (
          <Link href={PageInfo[page].href}>
            <a href={PageInfo[page].href}>{PageInfo[page].breadcrumb}</a>
          </Link>
        ) : (
          <span>{PageInfo[page].breadcrumb}</span>
        )}
        &nbsp;&gt;&nbsp;<span>{headerText}</span>
      </Protected>
      <ProtectedElse feature={Features.HeaderText}>{headerText}</ProtectedElse>
    </>
  ) : (
    <span>{headerText}</span>
  );

  return (
    <div className={styles.page}>
      <DesktopLayout
        content={children}
        headerText={header}
        page={page}
        headerButton={headerButton}
        headerContainer={headerContainer}
      />
      <MobileLayout
        content={children}
        headerText={headerText}
        page={page}
        headerButton={headerButton}
      />
    </div>
  );
};

const MobileLayout = ({ content, headerText, page, headerButton }) => {
  const [viewingState, setViewingState] = useState(ViewingState.FIRST_CHILD);
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
              headerText={headerText}
              currentViewingState={viewingState}
              changePanel={(nextViewingState) => setViewingState(nextViewingState)}
              hasSecondChild={!!React.Children.toArray(content)[1]}
            >
              {headerButton}
            </MobileHeader>
            <div className="columns">{React.Children.toArray(content)[viewingState]}</div>
          </div>
        </div>
      </Protected>
      <ProtectedElse feature={Features.MobileHeader}>
        <div className="column">
          <div className={classnames('container', 'is-desktop')}>
            <Header headerText={headerText} page={page} />
            {content}
          </div>
        </div>
      </ProtectedElse>
    </div>
  );
};

const DesktopLayout = ({ content, headerText, page, headerButton, headerContainer }) => (
  <div className={classnames('columns', 'is-hidden-mobile', styles.navColumn)}>
    <Protected feature={Features.DesktopNav}>
      <div className={classnames('column', 'is-narrow', styles.nav, styles.desktopNav, 'is-hidden-mobile')}>
        <Nav page={page} />
      </div>
    </Protected>
    <div className="column relative">
      <Header headerText={headerText} page={page} headerContainer={headerContainer}>
        {headerButton}
      </Header>
      <div className={classnames(styles.pageContent)}>
        {content}
      </div>
    </div>
  </div>
);
