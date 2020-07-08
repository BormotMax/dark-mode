import { render } from '@testing-library/react';
import { Comments } from './comments';

describe('Comments', () => {
  it('renders without crashing', async () => {
    render(<Comments comments={[]} />);
  });
});
