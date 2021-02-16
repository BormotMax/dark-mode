import React, { memo, useEffect, useRef, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import gql from 'graphql-tag';

import { CheckList } from '../checkList';
import { Quote, Task } from '../../types/custom';
import { useLogger, useFlash, useCurrentUser } from '../../hooks';
import { CreateTaskInput, UpdateTaskInput } from '../../API';
import { createTask, updateTask } from '../../graphql/mutations';
import { client } from '../../pages/_app';
import { isAllowed, Protected } from '../protected/protected';
import { isClickOrEnter } from '../../helpers/util';
import { Features } from '../../permissions';

import styles from './quoteProgress.module.scss';

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
  refetchData?: () => void;
}

export const QuoteProgress: React.FC<QuoteProps> = memo(({ quote, i, refetchData }) => {
  const tasks = (quote.tasks?.items || []) as Array<Task>;
  const [isShowing, setShowing] = useState(true);
  const [taskName, setTaskName] = useState('');
  const [percentDone, setPercentDone] = useState(calcPercentDone(tasks));
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const [isSaving, setIsSaving] = useState(false);
  const addTaskRef = useRef(null);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setPercentDone(calcPercentDone(tasks));
  }, [tasks]);

  const sortedTask = useMemo(() => tasks
    .filter(Boolean)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((t) => ({
      id: t.id,
      completed: t.completed,
      listItem: t.text,
    })), [tasks]);

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

  const onTaskNameChange = (event) => {
    setTaskName(event?.target?.value ?? '');
  };

  const onTaskNameBlur = () => {
    setTaskName(taskName.trim());
  };

  const onSubmit = async (e) => {
    if (e.keyCode !== 13) return;
    e.preventDefault();
    e.persist();

    if (!taskName.trim() || taskName.trim() === '') return;

    setIsSaving(true);

    const createTaskInput: CreateTaskInput = { quoteID: quote.id, text: taskName.trim(), completed: false };

    try {
      // eslint-disable-next-line no-await-in-loop
      await client.mutate({
        mutation: gql(createTask),
        variables: { input: createTaskInput },
      });
    } catch (error) {
      logger.error('QuoteProgress: error creating Task', { error, input: createTaskInput });
      setFlash("Something went wrong. We're looking into it");
    } finally {
      setIsSaving(false);
    }

    await refetchData();
    setTaskName('');
    addTaskRef.current.focus();
  };

  const handleToggle = (e) => {
    if (isClickOrEnter(e)) {
      setShowing(!isShowing);
    }
  };

  return (
    <div className={styles.quote}>
      <div className={styles.header}>
        <div>Tasks for Quote {i}</div>
        <div
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          onKeyDown={handleToggle}
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
            disabled={!isAllowed(currentUser, Features.QuoteCheckList)}
            callback={handleQuoteProgressUpdate}
            listItems={sortedTask}
          />
        </form>
        <Protected feature={Features.QuoteNewTask}>
          <input
            ref={addTaskRef}
            disabled={isSaving}
            value={taskName}
            onChange={onTaskNameChange}
            onBlur={onTaskNameBlur}
            onKeyDown={onSubmit}
            name="text"
            type="text"
            className={classnames(styles.addTask)}
            placeholder="Type a new task and hit Enter"
          />
        </Protected>
      </div>
    </div>
  );
});

QuoteProgress.displayName = 'QuoteProgress';
