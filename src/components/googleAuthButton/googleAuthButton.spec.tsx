import { render } from '@testing-library/react';
import { GoogleAuthButton } from './googleAuthButton';

describe('GoogleAuthButton', () => {
  it('renders without crashing', async () => {
    render(<GoogleAuthButton onClick={() => { }}>test text</GoogleAuthButton>);
  });
});
