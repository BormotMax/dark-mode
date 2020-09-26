import { useState } from 'react';
import { CheckList } from '../checkList';
import styles from './quoteProgress.module.scss';
import DownChevron from '../../img/downChevron.svg';
import UpChevron from '../../img/upChevron.svg';
import { Quote, Task } from '../../types/custom';

function calcPercentDone(tasks: Array<Task>) {
  let total = 0;
  let done = 0;

  tasks.forEach((task) => {
    if (task.completed) {
      done++;
    }

    total++;
  });

  return total === 0 ? 0 : done / total;
}

interface QuoteProps {
  quote: Quote;
  i: number;
}

export const QuoteProgress: React.FC<QuoteProps> = ({ quote, i }) => {
  const tasks = (quote.tasks?.items || []) as Array<Task>;
  const [isShowing, setShowing] = useState(true);
  const [percentDone, setPercentDone] = useState(calcPercentDone(tasks));

  function handleQuoteProgressUpdate(tasksArg: Array<Task>) {
    setPercentDone(calcPercentDone(tasksArg));
  }

  return (
    <div className={styles.quote}>
      <div className={styles.header}>
        <div className="header-1-sm">TASKS FOR QUOTE {i}</div>
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
          <progress className="progress is-large is-primary" max="1" value={percentDone} />
        </div>
        <form className="text-1 text-gray">
          <CheckList
            name={`quote-${i}`}
            callback={(ts: Array<Task>) => handleQuoteProgressUpdate(ts)}
            listItems={tasks.filter(Boolean).map((t) => ({
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
