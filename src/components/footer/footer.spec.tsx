import { render } from '@testing-library/react';

import { Footer } from './footer';

describe('Footer', () => {
  it('renders without crashing', async () => {
    render(<Footer />);
  });
});
