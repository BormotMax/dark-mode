import { useState } from 'react';
import { CheckList } from '../checkList';
import styles from './quote.module.scss';
import DownChevron from '../../img/downChevron.svg';
import UpChevron from '../../img/upChevron.svg';

function calcPercentDone(tasks: Array<Task>) {
  let total = 0;
  let done = 0;

  for (const task of tasks) {
    if (task.completed) {
      done++;
    }

    total++;
  }

  return total === 0 ? 0 : done / total;
}
interface Task {
  id: number
  completed: boolean
  text: string
}

interface QuoteProps {
  quote: { tasks: Array<Task> }
  i: number
}

export const Quote: React.FC<QuoteProps> = ({ quote, i }) => {
  const [isShowing, setShowing] = useState(true);
  const [percentDone, setPercentDone] = useState(calcPercentDone(quote.tasks));

  function handleQuoteProgressUpdate(task: Task, tasks: Array<Task>, quoteId: number) {
    setPercentDone(calcPercentDone(tasks));
    console.log(
      `Updating completion status of task with ID: ${task.id} to completed: ${task.completed} (within quote with ID: ${quoteId})`,
    );
  }

  return (
    <div className={styles.quote}>
      <div className={styles.header}>
        <div className="header-1-sm">
          TASKS FOR QUOTE
          {' '}
          {i}
        </div>
        <div
          onClick={() => setShowing(!isShowing)}
          role="button"
          tabIndex={0}
          onKeyDown={() => setShowing(!isShowing)}
          className={`${styles.hideTasksButton} text-small-caps text-blue`}
        >
          {isShowing ? <DownChevron /> : <UpChevron />}
        </div>
      </div>
      <div className={`${isShowing ? '' : 'hidden'}`}>
        <div className={styles.progressContainer}>
          <progress
            className="progress is-large is-primary"
            max="1"
            value={percentDone}
          />
        </div>
        <form className="text-1 text-gray">
          <CheckList
            name={`quote-${i}`}
            callback={(task: Task, tasks: Array<Task>) => handleQuoteProgressUpdate(task, tasks, i)}
            listItems={quote.tasks.map((t) => ({
              id: t.id,
              completed: t.completed,
              listItem: t.text,
            }))}
          />
        </form>
      </div>
    </div>
  );
};
