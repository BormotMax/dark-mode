import React, { memo, useCallback } from 'react';
import { makeVar, useReactiveVar } from '@apollo/client';
import classnames from 'classnames';

import { Header } from '../header';
import { Protected } from '../protected/protected';
import { Features } from '../../permissions';
import Nav from '../nav';
import { Page } from '../../types/custom';

import styles from './pageLayout.module.scss';

const navIsCollapsedVar = makeVar(false);

type DesktopLayoutProps = {
  page: Page,
  children: React.ReactNode,
};

const DesktopLayout = ({ children, page }: DesktopLayoutProps): JSX.Element => {
  const navIsCollapsed = useReactiveVar(navIsCollapsedVar);

  const onClickCollapseButton = useCallback(
    () => {
      navIsCollapsedVar(!navIsCollapsed);
    },
    [navIsCollapsed],
  );

  return (
    <>
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
        <div className={classnames('column', 'relative', styles.contentColumn)}>
          {children}
        </div>
      </div>
    </>
  );
};

export default memo(DesktopLayout);
