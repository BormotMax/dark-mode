import { useEffect, useState } from 'react';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons';
import { useLogger } from '../../../hooks';
import { getQuote } from '../../../graphql/queries';
import { GetQuoteQuery } from '../../../API';
import { unauthClient as client } from '../../../pages/_app';
import styles from './quoteForComment.module.scss';
import { Quote } from '../../../types/custom';

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
    </div>
  );
};
