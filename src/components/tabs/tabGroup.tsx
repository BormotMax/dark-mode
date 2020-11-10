import React, { useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './tab.module.scss';

interface TabGroupProps {
  tabInfos: TabInfo[];
  children: Array<JSX.Element> | JSX.Element;
}

interface TabInfo {
  header: string;
  icon: any;
}

export const TabGroup: React.FC<TabGroupProps> = ({ tabInfos, children }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className={styles.tabGroup}>
      <div className="tabs">
        <ul className={styles.tabList}>
          {tabInfos.map((info, i) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              onKeyDown={() => setActiveTabIndex(i)}
              key={info.header}
              className={classnames(
                { 'is-active': i === activeTabIndex },
                i === activeTabIndex ? styles.isActiveTab : styles.tab,
              )}
              onClick={() => setActiveTabIndex(i)}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <FontAwesomeIcon size="1x" color={i === activeTabIndex ? '#000000' : '#828282'} icon={info.icon} />
                &nbsp;&nbsp;
                {info.header}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* todo: don't unmount hidden tabs */}
      {React.Children.map(children, (child, i) => i === activeTabIndex && child)}
    </div>
  );
};