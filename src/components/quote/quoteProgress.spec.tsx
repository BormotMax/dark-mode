import { render } from '@testing-library/react';
import { QuoteProgress } from './quoteProgress';
import { Quote } from '../../types/custom';

const quote: Quote = {
  id: 'id',
  projectID: 'projectId',
  __typename: 'Quote',
  tasks: {
    items: [],
    nextToken: '',
    __typename: 'ModelTaskConnection',
  },
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString(),
};

describe('Quote', () => {
  it('renders without crashing', async () => {
    render(<QuoteProgress quote={quote} i={1} />);
  });
});
