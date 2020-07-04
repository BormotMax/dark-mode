import React, { useState } from 'react';

interface TabGroupProps {
  names: Array<string>
  children: Array<JSX.Element>
}

export const TabGroup: React.FC<TabGroupProps> = ({ names, children }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="tabs is-fullwidth">
        <ul>
          {names.map((name, i) => (
            // bulma needs li here
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              onKeyDown={() => setActiveTabIndex(i)}
              key={name}
              className={i === activeTabIndex ? 'is-active' : ''}
              onClick={() => setActiveTabIndex(i)}
            >
              {/*  bulma needs a here */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="text-bold">{name}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* todo: don't unmount hidden tabs */}
      {React.Children.map(children, (child, i) => i === activeTabIndex && child)}
    </div>
  );
};
