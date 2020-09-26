import React, { useState } from 'react';
import { faClipboardUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import styles from './tab.module.scss';

interface TabGroupProps {
  names: Array<string>;
  children: Array<JSX.Element> | JSX.Element;
}

export const TabGroup: React.FC<TabGroupProps> = ({ names, children }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className={styles.tabGroup}>
      <div className="tabs is-fullwidth">
        <ul>
          {names.map((name, i) => (
            // bulma needs li here
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              onKeyDown={() => setActiveTabIndex(i)}
              key={name}
              className={classnames({ 'is-active': i === activeTabIndex })}
              onClick={() => setActiveTabIndex(i)}
            >
              {/*  bulma needs a here */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <FontAwesomeIcon size="1x" color="#595959" icon={faClipboardUser} />
                &nbsp;
                {name}
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
