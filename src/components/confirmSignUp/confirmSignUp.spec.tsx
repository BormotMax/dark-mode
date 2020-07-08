import { render } from '@testing-library/react';
import { ConfirmSignUp } from './confirmSignUp';

describe('ConfirmSignUp', () => {
  it('renders without crashing', async () => {
    render(<ConfirmSignUp email="testEmail" parentPage="signup" setConfirming={() => { }} />);
  });
});
