import { useState } from "react"

export function TabGroup({ names, children }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div>
      <div className="tabs is-fullwidth">
        <ul>
          {names.map((name, i) => (
            <li
              key={name}
              className={i === activeTabIndex ? "is-active" : ""}
              // className={i === 2 ? "is-active" : ""}
              onClick={() => setActiveTabIndex(i)}
            >
              <a>{name}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* todo: don't unmount hidden tabs */}
      {React.Children.map(children, (child, i) => {
        return i === activeTabIndex && child
        return i === 2 && child
      })}
    </div>
  )
}
