import { useState } from 'react'
import React from 'react'

interface TabGroupProps {
  names: Array<string>
  children: Element
}

export function TabGroup({ names, children }: TabGroupProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div>
      <div className="tabs is-fullwidth">
        <ul>
          {names.map((name, i) => (
            <li
              onKeyDown={() => setActiveTabIndex(i)}
              key={name}
              className={i === activeTabIndex ? 'is-active' : ''}
              onClick={() => setActiveTabIndex(i)}
            >
              <a>{name}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* todo: don't unmount hidden tabs */}
      {React.Children.map(children, (child, i) => i === activeTabIndex && child)}
    </div>
  )
}
