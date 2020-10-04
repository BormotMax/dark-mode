import styles from './quotesTab.module.scss';
import DocumentIcon from '../../img/document.svg';
import Open from '../../img/openExternal.svg';
import { Quote } from '../../types/custom';

interface QuotesTabProps {
  quotes: Array<Quote>;
}

export const QuotesTab: React.FC<QuotesTabProps> = ({ quotes }: QuotesTabProps) => (
  <div className="mbxl">
    <div className={styles.upper}>
      <Open />
      <button type="button" className="btn-small">
        New Quote
      </button>
    </div>
    <div>
      {quotes.filter(Boolean).map((quote: Quote, i) => (
        <div className={styles.quoteLine} key={quote.id}>
          <DocumentIcon />
          <span className="mls">Quote {i + 1}</span>
        </div>
      ))}
    </div>
  </div>
);
