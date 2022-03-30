import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<any>('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Login page', () => {
  test('handles submit login form', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    global.fetch = jest.fn();

    const formEl = screen.getByRole('login-form');
    fireEvent.submit(formEl);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
