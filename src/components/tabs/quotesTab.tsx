import styles from './quotesTab.module.scss';
import DocumentIcon from '../../img/document.svg';
import Open from '../../img/openExternal.svg';

interface QuotesTabProps {
  quotes: Array<Quote>
}

interface Quote {
  id: string
  sequenceNumber: number
}

export const QuotesTab: React.FC<QuotesTabProps> = ({ quotes }: QuotesTabProps) => (
  <div className="mbxl">
    <div className={styles.upper}>
      <Open />
      <button type="button" className="oval-btn-3">New Quote</button>
    </div>
    <div>
      {quotes.map((quote: Quote) => (
        <div className={styles.quoteLine} key={quote.id}>
          <DocumentIcon />
          <span className="mls">
            Quote
            {' '}
            {quote.sequenceNumber}
          </span>
        </div>
      ))}
    </div>
  </div>
);
