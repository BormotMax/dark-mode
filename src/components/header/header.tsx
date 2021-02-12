import classnames from 'classnames';
import React from 'react';

import { Page } from '../nav/nav';
import { Protected } from '../protected/protected';
import { Features } from '../../permissions';

import styles from './header.module.scss';

interface HeaderProps {
  headerText?: string | JSX.Element;
  headerContainer?: string | Record<string, string>;
  page: Page;
  withLevelingMargin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  headerText,
  headerContainer,
  withLevelingMargin = true,
  children,
}) => (
  <div className={classnames(styles.headerWrapper, { [styles.levelingMargin]: withLevelingMargin })}>
    <div className={classnames(styles.header, 'defaultHeaderPadding', headerContainer)}>
      <div className={classnames(styles.headerText)}>{headerText}</div>
      <Protected feature={Features.Header}>{children && children}</Protected>
    </div>
  </div>
);
