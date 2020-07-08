import { render } from '@testing-library/react';
import { Quote } from './quote';

describe('Quote', () => {
  it('renders without crashing', async () => {
    render(<Quote quote={{ tasks: [] }} i={1} />);
  });
});
