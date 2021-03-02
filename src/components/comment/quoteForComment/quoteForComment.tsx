import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery, gql } from '@apollo/client';

import { ProtectedElse } from '../../protected/protected';
import { useFlash, useLogger } from '../../../hooks';
import { getQuote } from '../../../graphql/queries';
import { createQuotePayment, updateQuote } from '../../../graphql/mutations';
import { GetQuoteQuery, QuoteStatus, UpdateQuoteInput, UpdateQuoteMutation } from '../../../API';
import { unauthClient } from '../../../pages/_app';
import { STRIPE_API_URL, STRIPE_PUBLISHABLE_KEY } from '../../../helpers/constants';
import { useCurrentProject } from '../../../hooks/useCurrentProject';
import { Features } from '../../../permissions';

import styles from './quoteForComment.module.scss';

dayjs.extend(localizedFormat);

interface QuoteForCommentProps {
  id: string;
}

export const QuoteForComment: React.FC<QuoteForCommentProps> = ({ id }) => {
  const { setFlash } = useFlash();
  const [isUpdating, setIsUpdating] = useState(false);
  const [payeeStripeAccountID, setPayeeStripeAccountID] = useState(null);
  const { logger } = useLogger();
  const { currentProjectState } = useCurrentProject();

  const { data: { getQuote: quote } = {}, refetch: refetchQuote } = useQuery<GetQuoteQuery>(
    gql(getQuote),
    {
      variables: { id },
      onError(error) {
        logger.error('QuoteForComment: error retrieving Quote', { error, input: { id } });
      },
    },
  );

  useEffect(() => {
    const freelancers = currentProjectState.project?.freelancers?.items || [];
    const stripeAccountID = freelancers.find((freelancer) => freelancer.isInitialContact)?.user?.stripeAccountID;

    if (stripeAccountID) {
      setPayeeStripeAccountID(stripeAccountID);
    }
  }, [currentProjectState]);

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
      await unauthClient.mutate<UpdateQuoteMutation>({
        mutation: gql(updateQuote),
        variables: { input: updateQuoteInput },
      });
      await refetchQuote({ id: quote.id });
    } catch (error) {
      logger.error('UpdateQuoteContent: error updating quote status', { error, input: updateQuoteInput });
      setFlash('Error: failed to update accept / decline quote');
      throw new Error(error);
    }
  };

  const onAcceptClick = async () => {
    setIsUpdating(true);

    try {
      await updateQuery(QuoteStatus.ACCEPTED);
    } catch (error) {
      return;
    }

    const body = {
      accountID: payeeStripeAccountID,
      amount: quote.totalPrice * 100,
      projectID: currentProjectState.project.id,
    };

    try {
      const { data } = await axios.post(`${STRIPE_API_URL}/payment/create-checkout-session`, body, { withCredentials: true });
      const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY, { stripeAccount: payeeStripeAccountID });

      const createQuotePaymentInput = {
        fromUserID: currentProjectState.viewer.id,
        toUserID: currentProjectState.project.freelancers.items.find((f) => f.isInitialContact).user.id,
        quoteID: id,
        amount: quote.totalPrice * 100,
      };

      await unauthClient.mutate({
        mutation: gql(createQuotePayment),
        variables: { input: createQuotePaymentInput },
      });

      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      logger.error('QuoteForComment: Error creating checkout session for Stripe', { error, input: body });
      setFlash('Error: failed to update accept / decline quote');
      setIsUpdating(false);
      return;
    }

    setIsUpdating(false);
  };

  const onDeclineClick = async () => {
    setIsUpdating(true);

    try {
      await updateQuery(QuoteStatus.DECLINE);
    // eslint-disable-next-line no-empty
    } catch (error) {}

    setIsUpdating(false);
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
              <FontAwesomeIcon color="#3C78FB" icon={faCircleCheck} />
              <div>{task.text}</div>
            </div>
          ))}
      </div>

      <div className={styles.buttonContainer}>
        {((quote.status === QuoteStatus.IDLE || !quote.status) && payeeStripeAccountID) && (
          <>
            {payeeStripeAccountID
            && (
              <ProtectedElse feature={Features.ButtonAcceptAndPay}>
                <button
                  disabled={isUpdating}
                  type="button"
                  onClick={onAcceptClick}
                  className={classnames('btn-large', 'btn-large--inline', 'button', styles.buttonStyles, { 'is-loading': isUpdating })}
                >
                  ACCEPT AND PAY ${quote.totalPrice}
                </button>
              </ProtectedElse>
            )}
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
          <div className={classnames('btn-large', 'btn-large--inline', 'button', styles.green, styles.buttonStyles)}>
            ACCEPTED{quote.statusLastChangedAt && (
            <span className="is-hidden-mobile">
              &nbsp;{dayjs(quote.statusLastChangedAt).format('lll')}
            </span>
          )}
          </div>
        )}
        {quote.status === QuoteStatus.DECLINE && (
          <div className={classnames('btn-large', 'btn-large--inline', 'button', styles.red, styles.buttonStyles)}>
            DECLINED{quote.statusLastChangedAt && (
            <span className="is-hidden-mobile">
              &nbsp;{dayjs(quote.statusLastChangedAt).format('lll')}
            </span>
          )}
          </div>
        )}
      </div>
    </div>
  );
};
