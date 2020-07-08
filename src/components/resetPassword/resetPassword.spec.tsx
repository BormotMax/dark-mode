import { render } from '@testing-library/react';
import { ResetPassword } from './resetPassword';

describe('ResetPassword', () => {
  it('renders without crashing', async () => {
    render(<ResetPassword email="testEmail" />);
  });
});
