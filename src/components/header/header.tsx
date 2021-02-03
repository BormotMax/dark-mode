import classnames from 'classnames';
import React from 'react';

import { Page } from '../nav/nav';
import { Role } from '../withAuthentication';
import { Protected } from '../protected/protected';

import styles from './header.module.scss';

interface HeaderProps {
  headerText?: string | JSX.Element;
  headerContainer?: string | Record<string, string>;
  page: Page;
  withLevelingMargin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  headerText,
  page,
  headerContainer,
  withLevelingMargin = true,
  children,
}) => (
  <div className={classnames(styles.headerWrapper, { [styles.levelingMargin]: withLevelingMargin })}>
    <div className={classnames(styles.header, 'defaultHeaderPadding', headerContainer)}>
      <div className={classnames(styles.headerText)}>{headerText}</div>
      <Protected roles={[Role.FREELANCER]}>{children && children}</Protected>
    </div>
  </div>
);
