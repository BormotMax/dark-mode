import { render } from '@testing-library/react';

import { CheckList } from './checklist';

describe('CheckList', () => {
  it('renders without crashing', async () => {
    render(<CheckList listItems={[]} name="name" callback={() => {}} />);
  });
});
