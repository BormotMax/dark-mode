import classnames from 'classnames';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './pageLayoutOne.module.scss';
import { Role } from '../withAuthentication';
import { Protected, ProtectedElse } from '../protected/protected';
import { Header } from '../header';
import { Nav, Page } from '../nav/nav';
import { MobileHeader } from '../mobileHeader';

interface PageLayoutOneProps {
  headerText?: string | JSX.Element;
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

export const PageLayoutOne: React.FC<PageLayoutOneProps> = ({ children, headerText, page, headerButton }) => {
  const header = PageInfo[page] ? (
    <>
      <Protected roles={[Role.FREELANCER]}>
        {PageInfo[page].href ? (
          <Link href={PageInfo[page].href}>
            <a href={PageInfo[page].href}>{PageInfo[page].breadcrumb}</a>
          </Link>
        ) : (
          <span>{PageInfo[page].breadcrumb}</span>
        )}
      </Protected>
      <ProtectedElse roles={[Role.FREELANCER]}>{headerText}</ProtectedElse>
      &nbsp;&gt;&nbsp;<span>{headerText}</span>
    </>
  ) : (
    <span>{headerText}</span>
  );
  return (
    <div className={styles.page}>
      <DesktopLayout content={children} headerText={header} page={page} headerButton={headerButton} />
      <MobileLayout content={children} headerText={headerText} page={page} headerButton={headerButton} />
    </div>
  );
};

const MobileLayout = ({ content, headerText, page, headerButton }) => {
  const [viewingState, setViewingState] = useState(ViewingState.FIRST_CHILD);
  return (
    <div className="columns is-mobile is-hidden-tablet">
      <Protected roles={[Role.FREELANCER]}>
        {viewingState === ViewingState.NAV && (
          <div className={classnames('column', styles.nav, 'is-hidden-tablet')}>
            <Nav page={page} goToNextPanel={() => setViewingState(ViewingState.FIRST_CHILD)} />
          </div>
        )}
        <div className={classnames('column', 'test', styles.noPadding, { [styles.hidden]: viewingState === ViewingState.NAV })}>
          {/* The pageContent class removes the left margin. The nav will be in that area instead. */}
          <div className={classnames('container', 'is-desktop', styles.pageContent)}>
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
      <ProtectedElse roles={[Role.FREELANCER]}>
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

const DesktopLayout = ({ content, headerText, page, headerButton }) => (
  <div className={classnames('columns', 'is-hidden-mobile', styles.navColumn)}>
    <Protected roles={[Role.FREELANCER]}>
      <div className={classnames('column', 'is-narrow', styles.nav, styles.desktopNav, 'is-hidden-mobile')}>
        <Nav page={page} />
      </div>
      <div className="column">
        {/* The pageContent class removes the left margin. The nav will be in that area instead. */}
        <div className={classnames('container', 'is-desktop', styles.pageContent)}>
          <Header headerText={headerText} page={page}>
            {headerButton}
          </Header>
          <div className={classnames('columns', styles.columnWrap)}>{content}</div>
        </div>
      </div>
    </Protected>
    <ProtectedElse roles={[Role.FREELANCER]}>
      <div className="column">
        <div className={classnames('container', 'is-desktop')}>
          <Header headerText={headerText} page={page} />
          <div className={classnames('columns', styles.columnWrap)}>{content}</div>
        </div>
      </div>
    </ProtectedElse>
  </div>
);
