import { fireEvent, screen, render } from '@testing-library/react';
import { IItem } from '~/services/getUserItems';
import Header from './Header';

const items = [
  {
    id: '1',
    name: 'String',
  },
  {
    id: '2',
    name: 'String',
  },
  {
    id: '3',
    name: 'String',
  },
];

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<any>('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Header', () => {
  test('correct display error', () => {
    render(<Header items={items as Array<IItem>} username="username" />);

    const logoutBtn = screen.queryByText(/Logout username/);
    const title = screen.queryByText(/3 Emails are wrong/);

    expect(logoutBtn).toBeTruthy();
    expect(title).toBeTruthy();
  });

  test('handles logout', () => {
    global.fetch = jest.fn();
    render(<Header items={items as Array<IItem>} username="username" />);

    const logoutBtn = screen.queryByText(/Logout username/);

    fireEvent.click(logoutBtn);

    expect(fetch).toBeCalledTimes(1);
  });
});
