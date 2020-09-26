import { QuoteProgress } from '../quote';
import { Quote } from '../../types/custom';

interface TasksAndTimeTabProps {
  quotes: Quote[];
}

export const TasksAndTimeTab: React.FC<TasksAndTimeTabProps> = ({ quotes }) => (
  <>
    {quotes.filter(Boolean).map((quote, i) => (
      <QuoteProgress key={quote.id} i={i + 1} quote={quote} />
    ))}
  </>
);
