import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import gql from 'graphql-tag';
import serialize from 'form-serialize';
import { CheckList } from '../checkList';
import styles from './quoteProgress.module.scss';
import { Quote, Task, User } from '../../types/custom';
import { useLogger, useFlash, useCurrentUser } from '../../hooks';
import { CreateTaskInput, UpdateTaskInput, UserRole } from '../../API';
import { createTask, updateTask } from '../../graphql/mutations';
import { client } from '../../pages/_app';
import { Role } from '../withAuthentication';
import { isAllowed, Protected } from '../protected/protected';

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
  refetchData?: Function;
}

export const QuoteProgress: React.FC<QuoteProps> = ({ quote, i, refetchData }) => {
  const tasks = (quote.tasks?.items || []) as Array<Task>;
  const [isShowing, setShowing] = useState(true);
  const [percentDone, setPercentDone] = useState(calcPercentDone(tasks));
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const [isSaving, setIsSaving] = useState(false);
  const addTaskRef = useRef(null);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setPercentDone(calcPercentDone(tasks));
  }, [tasks]);

  async function handleQuoteProgressUpdate(checked, item) {
    const updateTaskInput: UpdateTaskInput = {
      id: item.id,
      completed: checked,
    };

    try {
      await client.mutate({
        mutation: gql(updateTask),
        variables: { input: updateTaskInput },
      });
    } catch (error) {
      logger.error('QuoteProgress: error updating Task.', { error, input: updateTaskInput });
    }

    refetchData();
  }

  const addNewTask = async (e) => {
    e.preventDefault();
    e.persist();
    setIsSaving(true);
    const { text } = serialize(e.target, { hash: true });
    if (!text || text === '') return;

    const createTaskInput: CreateTaskInput = { quoteID: quote.id, text, completed: false };
    try {
      // eslint-disable-next-line no-await-in-loop
      await client.mutate({
        mutation: gql(createTask),
        variables: { input: createTaskInput },
      });
    } catch (error) {
      logger.error('QuoteProgress: error creating Task', { error, input: createTaskInput });
      setFlash("Something went wrong. We're looking into it");
    }

    await refetchData();
    e.target.reset();
    setIsSaving(false);
    addTaskRef.current.focus();
  };

  return (
    <div className={styles.quote}>
      <div className={styles.header}>
        <div>Tasks for Quote {i}</div>
        <div
          onClick={() => setShowing(!isShowing)}
          role="button"
          tabIndex={0}
          onKeyDown={() => setShowing(!isShowing)}
          className={`${styles.hideTasksButton} text-small-caps text-blue`}
        >
          {isShowing ? <FontAwesomeIcon color="#595959" icon={faChevronDown} /> : <FontAwesomeIcon color="#595959" icon={faChevronUp} />}
        </div>
      </div>
      <div className={`${isShowing ? '' : 'hidden'}`}>
        <div className={styles.progressContainer}>
          <progress className="progress is-primary" max="1" value={percentDone} />
        </div>
        <form>
          <CheckList
            name={`quote-${i}`}
            disabled={!isAllowed(currentUser, [Role.FREELANCER])}
            callback={handleQuoteProgressUpdate}
            listItems={tasks
              .filter(Boolean)
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              .map((t) => ({
                id: t.id,
                completed: t.completed,
                listItem: t.text,
              }))}
          />
        </form>
        <Protected roles={[Role.FREELANCER]}>
          <form onSubmit={addNewTask}>
            <input
              ref={addTaskRef}
              disabled={isSaving}
              name="text"
              type="text"
              className={classnames(styles.addTask)}
              placeholder="Type a new task and hit Enter"
            />
          </form>
        </Protected>
      </div>
    </div>
  );
};
