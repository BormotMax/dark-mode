import { render } from '@testing-library/react';
import { FirstContact } from './firstContact';

describe('FirstContact', () => {
  it('renders without crashing', async () => {
    render(<FirstContact name="testName" message="testMessage" submittedAt={new Date()} />);
  });
});
