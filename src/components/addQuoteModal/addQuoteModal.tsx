import classnames from 'classnames';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faTimes } from '@fortawesome/pro-light-svg-icons';
import { faUserPlus, faFileInvoiceDollar } from '@fortawesome/pro-regular-svg-icons';
import gql from 'graphql-tag';
import styles from './addQuoteModal.module.scss';
import { InPlaceModal, InPlaceModalVariants } from '../inPlaceModal';
import { ButtonSmall } from '../buttons/buttons';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import Unchecked from '../../img/unchecked.svg';
import Checked from '../../img/checkmark.svg';
import { CreateQuoteInput, CreateQuoteMutation, CreateTaskInput, QuoteBillingType } from '../../API';
import { client } from '../../pages/_app';
import { createQuote, createTask } from '../../graphql/mutations';
import { useLogger, useFlash } from '../../hooks';
import { Quote } from '../../types/custom';

interface AddQuoteModalProps {
  projectID: string;
  refetchData: Function;
  quotes: Quote[];
}

export const AddQuoteModal: React.FC<AddQuoteModalProps> = ({ projectID, refetchData, quotes }) => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  return (
    <>
      <div className={classnames(modalStyles.addNew)}>
        <InPlaceModal variant={InPlaceModalVariants.WIDE} button={<FontAwesomeIcon color="#595959" icon={faUserPlus} />}>
          <AddQuoteModalContent projectID={projectID} refetchData={refetchData} selectedQuote={null} />
        </InPlaceModal>
      </div>
      {quotes
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((quote, i) => (
          <InPlaceModal
            variant={InPlaceModalVariants.WIDE}
            key={quote.id}
            button={
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => {
                  setSelectedQuote(quote);
                }}
                onClick={() => {
                  setSelectedQuote(quote);
                }}
                className={classnames(modalStyles.modalPill)}
              >
                <div className={classnames(modalStyles.icon)}>
                  <FontAwesomeIcon color="#828282" icon={faFileInvoiceDollar} />
                </div>
                <div>Quote #{i + 1}</div>
              </div>
            }
          >
            <AddQuoteModalContent projectID={projectID} refetchData={refetchData} selectedQuote={selectedQuote} />
          </InPlaceModal>
        ))}
    </>
  );
};

interface AddQuoteModalContentProps {
  close?: Function;
  projectID: string;
  refetchData: Function;
  selectedQuote: Quote;
}

const AddQuoteModalContent: React.FC<AddQuoteModalContentProps> = ({ close, projectID, refetchData, selectedQuote }) => {
  const [tasks, setTasks] = useState(selectedQuote?.tasks.items.map((t) => t.text) || []);
  const [hours, setHours] = useState(selectedQuote?.billableHours?.toString() || '');
  const [perHour, setPerHour] = useState(selectedQuote?.chargePerHour?.toString() || '');
  const [price, setPrice] = useState(selectedQuote?.totalPrice?.toString() || '');
  const [isSaving, setIsSaving] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [billingType, setBillingType] = useState(selectedQuote?.billingType || QuoteBillingType.HOURLY);
  const { logger } = useLogger();
  const { setFlash } = useFlash();

  const handleSubmit = async () => {
    setIsSaving(true);
    const createQuoteInput: CreateQuoteInput = { projectID, billingType };
    const billableHours = Number.parseInt(hours, 10);
    const chargePerHour = Number.parseInt(perHour, 10);
    const totalPrice = Number.parseInt(price, 10);

    if (billingType === QuoteBillingType.HOURLY && !Number.isNaN(billableHours)) {
      createQuoteInput.billableHours = billableHours;
    }

    if (billingType === QuoteBillingType.HOURLY && !Number.isNaN(chargePerHour)) {
      createQuoteInput.chargePerHour = chargePerHour;
    }

    if (billingType === QuoteBillingType.TOTAL && !Number.isNaN(totalPrice)) {
      createQuoteInput.totalPrice = totalPrice;
    }

    let quoteID: string;

    try {
      const { data }: { data: CreateQuoteMutation } = await client.mutate({
        mutation: gql(createQuote),
        variables: { input: createQuoteInput },
      });

      quoteID = data.createQuote.id;
    } catch (error) {
      logger.error('AddQuoteModalAddQuoteModalContent: error creating Quote', { error, input: createQuoteInput });
      setFlash("Something went wrong. We're looking into it");
      close();
      return;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const task of tasks) {
      const createTaskInput: CreateTaskInput = { quoteID, text: task, completed: false };
      try {
        // eslint-disable-next-line no-await-in-loop
        await client.mutate({
          mutation: gql(createTask),
          variables: { input: createTaskInput },
        });
      } catch (error) {
        logger.error('AddQuoteModalAddQuoteModalContent: error creating Task', { error, input: createTaskInput });
        setFlash('Error: All tasks may not have been added.');
      }
    }

    await refetchData();
    close();
  };

  const addNewTask = (e: any) => {
    if (e.keyCode === undefined || (e.keyCode === 13 && newTask.trim() !== '')) {
      setTasks((oldTasks) => [...oldTasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (e, index: number) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setTasks((oldTasks) => {
        const newTasks = [...oldTasks];
        newTasks.splice(index, 1);
        return newTasks;
      });
    }
  };

  const closeModal = (e) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      close();
    }
  };

  const updateHours = ({ target }) => {
    if (selectedQuote) return;
    const { value } = target;
    setHours(value);
  };

  const updatePerHour = ({ target }) => {
    if (selectedQuote) return;
    const { value } = target;
    const withoutDollarSign = value.includes('$') ? value.split('$')[1] : value;
    if (Number.isInteger(+withoutDollarSign)) {
      setPerHour(withoutDollarSign);
    }
  };

  const updatePrice = ({ target }) => {
    if (selectedQuote) return;
    const { value } = target;
    const withoutDollarSign = value.includes('$') ? value.split('$')[1] : value;
    if (Number.isInteger(+withoutDollarSign)) {
      setPrice(withoutDollarSign);
    }
  };

  return (
    <div className={classnames(styles.modalContent)}>
      <div className={classnames(styles.header)}>
        <div>Generate Quote</div>
        <div onClick={closeModal} role="button" onKeyDown={closeModal} tabIndex={0}>
          <FontAwesomeIcon color="#fff" icon={faTimes} />
        </div>
      </div>
      <div className={classnames(styles.body)}>
        <div className={classnames(styles.tasks)}>
          {tasks.map((task, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} className={classnames(styles.task)}>
              <div>{task}</div>
              {!selectedQuote && (
                <div
                  role="button"
                  tabIndex={0}
                  className={classnames(styles.deleteTask)}
                  onKeyDown={(e) => deleteTask(e, idx)}
                  onClick={(e) => deleteTask(e, idx)}
                >
                  <FontAwesomeIcon color="#BDBDBD" icon={faTimesCircle} />
                </div>
              )}
            </div>
          ))}
          {!selectedQuote && (
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              name="newTask"
              className={classnames('input', styles.newTaskInput)}
              type="text"
              placeholder="Add new line item"
              onKeyDown={addNewTask}
            />
          )}

          <div className={classnames(modalStyles.radioGroup, modalStyles.radioGroupStacked, 'control')}>
            {(selectedQuote?.billingType === QuoteBillingType.HOURLY || !selectedQuote) && (
              <label className={classnames(modalStyles.radio, modalStyles.radioStacked, 'radio')}>
                {!selectedQuote && (
                  <>
                    <input
                      onChange={(e) => setBillingType(QuoteBillingType[e.target.value])}
                      type="radio"
                      value={QuoteBillingType.HOURLY}
                      checked={billingType === QuoteBillingType.HOURLY}
                      name="billingType"
                    />
                    <span className={classnames(modalStyles.checkmarks)}>
                      <span className={classnames(modalStyles.unchecked)}>
                        <Unchecked />
                      </span>
                      <span className={classnames(modalStyles.checked)}>
                        <Checked />
                      </span>
                    </span>
                  </>
                )}
                <div className={styles.radioText}>
                  This work will take <input className={styles.inlineInput} value={hours} onChange={updateHours} /> billable hours at{' '}
                  <input className={styles.inlineInput} value={`$${perHour}`} onChange={updatePerHour} /> per hour.
                </div>
              </label>
            )}
            {(selectedQuote?.billingType === QuoteBillingType.TOTAL || !selectedQuote) && (
              <label className={classnames(modalStyles.radio, modalStyles.radioStacked, 'radio')}>
                {!selectedQuote && (
                  <>
                    <input
                      onChange={(e) => setBillingType(QuoteBillingType[e.target.value])}
                      type="radio"
                      value={QuoteBillingType.TOTAL}
                      checked={billingType === QuoteBillingType.TOTAL}
                      name="billingType"
                    />
                    <span className={classnames(modalStyles.checkmarks)}>
                      <span className={classnames(modalStyles.unchecked)}>
                        <Unchecked />
                      </span>
                      <span className={classnames(modalStyles.checked)}>
                        <Checked />
                      </span>
                    </span>
                  </>
                )}
                <div className={styles.radioText}>
                  This is a project price of <input className={styles.inlineInput} value={`$${price}`} onChange={updatePrice} />
                </div>
              </label>
            )}
          </div>
          {!selectedQuote && (
            <div className={styles.save}>
              <ButtonSmall text="Send to Client" isSaving={isSaving} onClick={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
