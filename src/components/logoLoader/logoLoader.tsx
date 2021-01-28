import React, { memo } from 'react';
import cn from 'classnames';

import Logo from '../svgIcons/Logo';

import styles from './logoLoader.module.scss';

interface LogoLoaderProps {
  loading: boolean;
}

const LogoLoader = ({ loading }: LogoLoaderProps): JSX.Element => (
  <div className={cn(styles.container, { [styles.loading]: loading })}>
    <div className={styles.logo}>
      <Logo />
    </div>
  </div>
);

export default memo(LogoLoader);
