import { useEffect, useState } from 'react';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { ProtectedElse } from '../../protected/protected';
import { useFlash, useLogger } from '../../../hooks';
import { getQuote } from '../../../graphql/queries';
import { updateQuote } from '../../../graphql/mutations';
import { GetQuoteQuery, QuoteStatus, UpdateQuoteInput, UpdateQuoteMutation } from '../../../API';
import { unauthClient, client } from '../../../pages/_app';
import styles from './quoteForComment.module.scss';
import { Quote } from '../../../types/custom';
import { Role } from '../../withAuthentication';

dayjs.extend(localizedFormat);

interface QuoteForCommentProps {
  id: string;
}

export const QuoteForComment: React.FC<QuoteForCommentProps> = ({ id }) => {
  const [quote, setQuote] = useState<Quote>(null);
  const { setFlash } = useFlash();
  const [isUpdating, setIsUpdating] = useState(false);
  const { logger } = useLogger();

  useEffect(() => {
    const executeGetQuote = async () => {
      const getQuoteInput = { id };

      try {
        const res: { data: GetQuoteQuery } = await unauthClient.query({
          query: gql(getQuote),
          variables: getQuoteInput,
        });

        setQuote(res.data.getQuote);
      } catch (error) {
        logger.error('QuoteForComment: error retrieving Quote', { error, input: getQuoteInput });
      }
    };

    executeGetQuote();
  }, []);

  const updateQuery = async (status: QuoteStatus) => {
    const updateQuoteInput: UpdateQuoteInput = {
      id: quote.id,
      projectID: quote.projectID,
      billableHours: quote.billableHours,
      billingType: quote.billingType,
      chargePerHour: quote.chargePerHour,
      totalPrice: quote.totalPrice,
      status,
      statusLastChangedAt: new Date().toISOString(),
    };

    try {
      setIsUpdating(true);
      const response: { data: UpdateQuoteMutation } = await unauthClient.mutate({
        mutation: gql(updateQuote),
        variables: { input: updateQuoteInput },
      });

      setQuote(response.data.updateQuote);
    } catch (error) {
      logger.error('UpdateQuoteContent: error updating quote status', { error, input: updateQuoteInput });
      setFlash('Error: failed to update accept / decline quote');
    } finally {
      setIsUpdating(false);
    }
  };

  const onAcceptClick = () => {
    updateQuery(QuoteStatus.ACCEPTED);
  };

  const onDeclineClick = () => {
    updateQuery(QuoteStatus.DECLINE);
  };

  return !quote ? null : (
    <div className={classnames(styles.quoteForComment)}>
      <div className={classnames(styles.header)}>
        <div>Quote</div>
        <div>{`$${Number(quote.totalPrice).toLocaleString()}`}</div>
      </div>
      <div className={classnames(styles.body)}>
        {quote.tasks.items
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map((task) => (
            <div key={task.id} className={classnames(styles.task)}>
              <FontAwesomeIcon color="#595959" icon={faCheckCircle} />
              <div>{task.text}</div>
            </div>
          ))}
      </div>

      <div className={styles.buttonContainer}>
        {(quote.status === QuoteStatus.IDLE || !quote.status) && (
          <>
            <ProtectedElse roles={[Role.FREELANCER]}>
              <button
                disabled={isUpdating}
                type="button"
                onClick={onAcceptClick}
                className={classnames('btn-large', 'btn-large--inline', 'button', { 'is-loading': isUpdating })}
              >
                ACCEPT QUOTE
              </button>
            </ProtectedElse>
            <button
              type="button"
              onClick={onDeclineClick}
              disabled={isUpdating}
              className={classnames(styles.declineStyles, { 'is-loading': isUpdating })}
            >
              Decline
            </button>
          </>
        )}
        {quote.status === QuoteStatus.ACCEPTED && (
          <div className={classnames('btn-large', 'btn-large--inline', 'button', styles.green)}>
            ACCEPTED{quote.statusLastChangedAt && <span className="is-hidden-mobile">&nbsp;{dayjs(quote.statusLastChangedAt).format('lll')}</span>}
          </div>
        )}
        {quote.status === QuoteStatus.DECLINE && (
          <div className={classnames('btn-large', 'btn-large--inline', 'button', styles.red)}>
            DECLINED{quote.statusLastChangedAt && <span className="is-hidden-mobile">&nbsp;{dayjs(quote.statusLastChangedAt).format('lll')}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
