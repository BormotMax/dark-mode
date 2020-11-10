import { useEffect, useState } from 'react';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons';
import { Protected } from '../../protected/protected';
import { useLogger } from '../../../hooks';
import { getQuote } from '../../../graphql/queries';
import { GetQuoteQuery } from '../../../API';
import { unauthClient as client } from '../../../pages/_app';
import styles from './quoteForComment.module.scss';
import { Quote } from '../../../types/custom';
import { Role } from '../../withAuthentication';

interface QuoteForCommentProps {
  id: string;
}

export const QuoteForComment: React.FC<QuoteForCommentProps> = ({ id }) => {
  const [quote, setQuote] = useState<Quote>(null);
  const { logger } = useLogger();

  useEffect(() => {
    const executeGetQuote = async () => {
      const getQuoteInput = { id };

      try {
        const res: { data: GetQuoteQuery } = await client.query({
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

  console.log('quote -->', quote);
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
        <Protected roles={[Role.CLIENT]}>
          <button
            form="hirePageForm"
            disabled={false}
            type="submit"
            className={classnames('btn-large', 'btn-large--inline', 'button', { 'is-loading': false })}
          >
            Accept & Pay $6000 Deposit
          </button>
        </Protected>
        <a href="#" className={styles.declineStyles}>
          Decline
        </a>
        {/* <button */}
        {/*  form="hirePageForm" */}
        {/*  disabled={false} */}
        {/*  className={classnames('btn-small', 'btn-invert')} */}
        {/* > */}
        {/*  Decline */}
        {/* </button */}
      </div>
    </div>
  );
};
