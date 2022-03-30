import { screen, render } from '@testing-library/react';
import ErrorBlock from './ErrorBlock';

describe('ErrorBlock', () => {
  test('correct display error', () => {
    render(<ErrorBlock error={'Error'} />);

    const errorEl = screen.getByText(/Error/);

    expect(errorEl).toBeTruthy();
  });

  test('hide ErrorBlock if no error', () => {
    render(<ErrorBlock error={null} />);

    const errorEl = screen.queryByTestId('error-elem');

    expect(errorEl).not.toBeInTheDocument();
  });
});
