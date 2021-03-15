import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faXmark, faCircleXmark } from '@fortawesome/pro-light-svg-icons';
import { faCircleCheck, faCircle } from '@fortawesome/pro-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/pro-regular-svg-icons';
import gql from 'graphql-tag';

import { InPlaceModal, InPlaceModalVariants } from '../inPlaceModal';
import { ButtonSmall } from '../buttons/buttons';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import {
  CommentResourceType,
  CreateCommentInput,
  CreateQuoteInput,
  CreateQuoteMutation,
  CreateTaskInput,
  QuoteBillingType,
  QuoteStatus,
} from '../../API';
import { client } from '../../pages/_app';
import { createComment, createQuote, createTask } from '../../graphql/mutations';
import { useFlash, useLogger } from '../../hooks';
import { Quote, User } from '../../types/custom';
import { Protected } from '../protected/protected';
import { Features } from '../../permissions';

import styles from './addQuoteModal.module.scss';

interface AddQuoteModalProps {
  projectID: string;
  refetchData(): Promise<void>;
  quotes: Quote[];
  creator: User;
}

export const AddQuoteModal: React.FC<AddQuoteModalProps> = ({ projectID, refetchData, quotes, creator }) => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  return (
    <>
      <div className={classnames(modalStyles.addNew)}>
        <Protected feature={Features.QuoteModalContent}>
          <InPlaceModal variant={InPlaceModalVariants.WIDE} button={<FontAwesomeIcon color="#3C78FB" icon={faCirclePlus} />}>
            <AddQuoteModalContent projectID={projectID} refetchData={refetchData} selectedQuote={null} creator={creator} />
          </InPlaceModal>
        </Protected>
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
                className={classnames(modalStyles.modalPill, styles.text)}
              >
                <div className={classnames(modalStyles.icon)}>
                  <FontAwesomeIcon color="#828282" icon={faFileInvoiceDollar} />
                </div>
                <div>Quote #{(i + 1).toString().padStart(3, '0')}</div>
              </div>
            }
          >
            <AddQuoteModalContent
              index={i}
              projectID={projectID}
              refetchData={refetchData}
              selectedQuote={selectedQuote}
              creator={creator}
            />
          </InPlaceModal>
        ))}
    </>
  );
};

interface AddQuoteModalContentProps {
  close?: Function;
  projectID: string;
  refetchData(): Promise<void>;
  selectedQuote: Quote;
  creator: User;
  index?: number;
}

const AddQuoteModalContent: React.FC<AddQuoteModalContentProps> = ({ close, projectID, refetchData, selectedQuote, creator, index }) => {
  const [tasks, setTasks] = useState(
    selectedQuote?.tasks.items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((t) => t.text) || [],
  );
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
    const createQuoteInput: CreateQuoteInput = { projectID, billingType, status: QuoteStatus.IDLE };
    const billableHours = Number.parseInt(hours, 10);
    const chargePerHour = Number.parseInt(perHour, 10);
    const totalPrice = Number.parseInt(price, 10);

    if (billingType === QuoteBillingType.HOURLY && !Number.isNaN(billableHours) && !Number.isNaN(chargePerHour)) {
      createQuoteInput.billableHours = billableHours;
      createQuoteInput.chargePerHour = chargePerHour;
      createQuoteInput.totalPrice = billableHours * chargePerHour;
    }

    if (billingType === QuoteBillingType.TOTAL && !Number.isNaN(totalPrice)) {
      createQuoteInput.totalPrice = totalPrice;
    }

    let quoteID: string;

    try {
      const { data } = await client.mutate<CreateQuoteMutation>({
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

    // create a comment with this Quote as an associated resource so it shows up in the feed.
    // eslint-disable-next-line max-len
    const content = 'Here is your quote. If you are ready to proceed, please accept and pay; else, let me know when a good time is to connect to discuss.\n\nThank you!';

    const createCommentInput: CreateCommentInput = {
      projectID,
      content,
      creatorID: creator.id,
      includedResourceID: quoteID,
      includedResourceType: CommentResourceType.QUOTE,
    };

    try {
      // Create a comment from the text in the details input. The same text is also stored in project.details
      await client.mutate({
        mutation: gql(createComment),
        variables: { input: createCommentInput },
      });
    } catch (error) {
      logger.error('AddQuoteModal: error creating Comment', { error, input: createCommentInput });
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

  const deleteTask = (e, i: number) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setTasks((oldTasks) => {
        const newTasks = [...oldTasks];
        newTasks.splice(i, 1);
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

    if (Number.isInteger(+value) && Number.isInteger(+perHour)) {
      setPrice((+value * +perHour).toString());
    }

    setHours(value);
  };

  const updatePerHour = ({ target }) => {
    if (selectedQuote) return;
    const { value } = target;

    const withoutDollarSign = value.includes('$') ? value.split('$')[1] : value;

    if (Number.isInteger(+hours) && Number.isInteger(+withoutDollarSign)) {
      setPrice((+hours * +withoutDollarSign).toString());
    }

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

  const isFormValid = useMemo(() => (
    (
      billingType === QuoteBillingType.HOURLY && (hours.trim().length > 0 && perHour.trim().length > 0
      )) || (billingType === QuoteBillingType.TOTAL && price.trim().replace('$0', '').length > 0)
  ), [newTask, hours, perHour, price, billingType]);

  return (
    <div className={classnames(styles.modalContent)}>
      <div className={classnames(styles.header)}>
        {selectedQuote ? <div>Quote #{(index + 1).toString().padStart(3, '0')}</div> : <div>Generate Quote</div>}
        <div onClick={closeModal} role="button" onKeyDown={closeModal} tabIndex={0}>
          <FontAwesomeIcon color="#fff" icon={faXmark} />
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
                  <FontAwesomeIcon color="#BDBDBD" icon={faCircleXmark} />
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
                        <FontAwesomeIcon color="#E0E0E0" icon={faCircle} />
                      </span>
                      <span className={classnames(modalStyles.checked)}>
                        <FontAwesomeIcon color="#3C78FB" icon={faCircleCheck} />
                      </span>
                    </span>
                  </>
                )}
                <div className={classnames(styles.radioText, styles.radioTextWrap)}>
                  This work will take <input className={styles.inlineInput} value={hours} onChange={updateHours} /> billable hours at{' '}
                  <input className={styles.inlineInput} value={`$${perHour}`} onChange={updatePerHour} /> per hour.
                </div>
              </label>
            )}
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
                      <FontAwesomeIcon color="#E0E0E0" icon={faCircle} />
                    </span>
                    <span className={classnames(modalStyles.checked)}>
                      <FontAwesomeIcon color="#3C78FB" icon={faCircleCheck} />
                    </span>
                  </span>
                </>
              )}
              <div className={styles.radioText}>
                This is a project price of <input className={styles.inlineInput} value={`$${price}`} onChange={updatePrice} />
              </div>
            </label>
          </div>
          {!selectedQuote && (
            <div className={styles.save}>
              <ButtonSmall
                text="Send to Client"
                isSaving={isSaving}
                onClick={handleSubmit}
                disabled={!isFormValid}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
