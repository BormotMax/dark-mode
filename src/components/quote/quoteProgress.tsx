import React, { memo, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons';
import { gql, useQuery, useMutation } from '@apollo/client';
import classnames from 'classnames';

import { CheckItem } from '../checkitem';
import { Task } from '../../types/custom';
import { useLogger, useFlash, useCurrentUser } from '../../hooks';
import { GetQuoteQuery, CreateTaskMutation, UpdateTaskMutation } from '../../API';
import { createTask, updateTask } from '../../graphql/mutations';
import { getQuote } from '../../graphql/queries';
import { isAllowed, Protected } from '../protected/protected';
import { isClickOrEnter, isPressEnter } from '../../helpers/util';
import { Features } from '../../permissions';

import styles from './quoteProgress.module.scss';

const calcPercentDone = (tasks: Array<Task>) => {
  let total = 0;
  let done = 0;
  tasks.forEach((task) => {
    if (task.completed) {
      done++;
    }
    total++;
  });
  return total === 0 ? 0 : done / total;
};

type Props = {
  quoteId: string;
  i: number;
};

const QuoteProgress: React.FC<Props> = ({ i, quoteId }) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [percentDone, setPercentDone] = useState(() => calcPercentDone(tasks));
  const [taskName, setTaskName] = useState('');
  const [isShowing, setShowing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const addTaskRef = useRef<HTMLInputElement>(null);
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const { currentUser } = useCurrentUser();

  useQuery<GetQuoteQuery>(
    gql(getQuote),
    {
      variables: { id: quoteId },
      onCompleted: (data) => {
        const items = data.getQuote?.tasks?.items ?? [];
        const sortedTasks = [...items].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        setTasks(sortedTasks);
      },
      onError: (error) => {
        logger.error('QuoteProgress: error getting Quote', { error, input: { id: quoteId } });
      },
    },
  );

  const handleChangeProgress = (newTasks: Array<Task>): void => {
    setPercentDone(calcPercentDone(newTasks));
  };

  useEffect(() => {
    handleChangeProgress(tasks);
  }, [tasks]);

  const handleToggle = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
    if (isClickOrEnter(event)) {
      setShowing(!isShowing);
    }
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskName(event.target.value);
  };

  const handleTaskNameBlur = () => {
    setTaskName(taskName.trim());
  };

  const finallyMethods = () => {
    setIsSaving(false);
    setTaskName('');
    addTaskRef.current.focus();
  };

  const [addTask, { error: errorCreateTask }] = useMutation<CreateTaskMutation>(gql(createTask), {
    onCompleted({ createTask: createdTask }) {
      setTasks((oldTasks) => [...oldTasks, createdTask]);
      finallyMethods();
    },
  });

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!isPressEnter(event)) return;
    event.preventDefault();
    event.persist();
    if (!taskName.trim() || taskName.trim() === '') return;
    setIsSaving(true);

    const createTaskInput = { quoteID: quoteId, text: taskName.trim(), completed: false };
    addTask({ variables: { input: createTaskInput } }).catch(() => {
      logger.error('QuoteProgress: error creating Task', {
        error: errorCreateTask,
        input: createTaskInput,
      });
      setFlash("Something went wrong. We're looking into it");
      finallyMethods();
    });
  };

  const [changeTask, { error: errorChangeTask }] = useMutation<UpdateTaskMutation>(gql(updateTask));

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>, id: string): void => {
    const completed = event.target.checked;

    setTasks((oldTasks) => oldTasks.map((task) => (task.id === id ? ({ ...task, completed }) : task)));
    changeTask({ variables: { input: { id, completed } } }).catch(() => {
      setTasks((oldTasks) => oldTasks.map((task) => (task.id === id ? ({ ...task, completed: !completed }) : task)));
      logger.error('QuoteProgress: error updating Task.', { error: errorChangeTask, input: { id, completed } });
    });
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
          className={classnames(styles.hideTasksButton, 'text-small-caps', 'text-blue')}
        >
          {isShowing ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
        </div>
      </div>
      <div className={`${isShowing ? '' : 'hidden'}`}>
        <div className={styles.progressContainer}>
          <progress className="progress is-primary" max="1" value={percentDone} />
        </div>
        <form>
          <ul>
            {tasks.map((task) => (
              <CheckItem
                key={task.id}
                completed={task.completed}
                disabled={!isAllowed(currentUser, Features.QuoteCheckList)}
                id={task.id}
                name={`quote-${i}`}
                onChangeTask={handleChangeTask}
                text={task.text}
              />
            ))}
          </ul>
        </form>
        <Protected feature={Features.QuoteNewTask}>
          <input
            ref={addTaskRef}
            disabled={isSaving}
            value={taskName}
            onChange={handleTaskNameChange}
            onBlur={handleTaskNameBlur}
            onKeyDown={handleSubmit}
            name="text"
            type="text"
            className={classnames(styles.addTask)}
            placeholder="Type a new task and hit Enter"
          />
        </Protected>
      </div>
    </div>
  );
};

QuoteProgress.displayName = 'QuoteProgress';

export default memo(QuoteProgress);
