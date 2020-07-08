import { render } from '@testing-library/react';
import { ProjectHeader } from './projectHeader';

describe('ProjectHeader', () => {
  it('renders without crashing', async () => {
    render(<ProjectHeader headerText="testHeaderText" />);
  });
});
