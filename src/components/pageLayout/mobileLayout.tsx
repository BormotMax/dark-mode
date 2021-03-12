import React, { memo } from 'react';
import classnames from 'classnames';
import { ReactiveVar } from '@apollo/client';

import { Protected } from '../protected/protected';
import { Features } from '../../permissions';
import Nav from '../nav';
import MobileHeader from '../mobileHeader';
import { Page } from '../../types/custom';

import styles from './pageLayout.module.scss';

type MobileLayoutProps = {
  children: React.ReactNode,
  page: Page,
  hasAlternateView?: boolean,
  alternatePageViewVar: ReactiveVar<boolean>,
};

const MobileLayout = ({
  children,
  page,
  hasAlternateView,
  alternatePageViewVar,
}: MobileLayoutProps): JSX.Element => {
  const [navIsOpen, setNavIsOpen] = React.useState(false);

  return (
    <div className="columns relative">
      <Protected feature={Features.MobileNav}>
        {navIsOpen && (
          <div className={classnames('column', styles.nav)}>
            <Nav page={page} setNavIsOpen={setNavIsOpen} />
          </div>
        )}
      </Protected>
      {!navIsOpen && (
        <div
          className={classnames(
            'column',
            styles.contentColumn,
          )}
        >
          <div className="container">
            <MobileHeader
              alternatePageViewVar={alternatePageViewVar}
              setNavIsOpen={setNavIsOpen}
              hasAlternateView={hasAlternateView}
            />
            <div className="columns">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

MobileLayout.defaultProps = { hasAlternateView: false };

export default memo(MobileLayout);
