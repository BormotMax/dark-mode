import classnames from 'classnames';
import { Quote } from '../../types/custom';
import styles from './quotePreview.module.scss';

interface QuotePreviewProps {
  quote: Quote;
}
export const QuotePreview: React.FC<QuotePreviewProps> = ({ quote }) => {
  return <div className={classnames(styles.quotePreview)}>hello</div>;
};
