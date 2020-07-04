import { render } from '@testing-library/react';

import { Comment } from './comment';

describe('Comment', () => {
  it('renders without crashing', async () => {
    render(<Comment text="testText" name="testName" createdAt={new Date()} />);
  });
});
