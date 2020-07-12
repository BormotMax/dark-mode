import { render } from '@testing-library/react';
import { FileUpload } from './fileUpload';

describe('FileUpload', () => {
  it('renders without crashing', async () => {
    render(<FileUpload name="testName" helpText="testText" />);
  });
});
