import classnames from 'classnames';
import React from 'react';
import styles from './header.module.scss';
import { Page } from '../nav/nav';
import { Role } from '../withAuthentication';
import { Protected } from '../protected/protected';

interface HeaderProps {
  headerText?: string | JSX.Element;
  headerContainer?: string | Record<string, string>;
  page: Page;
}

export const Header: React.FC<HeaderProps> = ({ headerText, page, children, headerContainer }) => (
  <div className={classnames(styles.headerWrapper)}>
    <div className={classnames(styles.header, headerContainer)}>
      <div className={classnames(styles.headerText)}>{headerText}</div>
      <div className={classnames(styles.right)}>
        <Protected roles={[Role.FREELANCER]}>{children && children}</Protected>
      </div>
    </div>
  </div>
);
