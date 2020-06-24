import { BlueCheckmark } from "../../img/blueCheckmark.svg"
import { Unchecked } from "../../img/unchecked.svg"

export function CheckList({ listItems }) {
  return (
    <ul>
      {listItems.map((t) => (
        <li key={t.text}>
          <span className="li__bullet">
            {t.completed ? <BlueCheckmark /> : <Unchecked />}
          </span>
          <span className={t.completed && "strikethrough"}>{t.text}</span>
        </li>
      ))}
    </ul>
  )
}
