import { render } from '@testing-library/react';
import { FileInput } from './fileInput';

describe('FileInput', () => {
  it('renders without crashing', async () => {
    render(<FileInput name="testName" onChange={() => {}} />);
  });
});
