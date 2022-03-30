import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { IItem } from '~/services/getUserItems';

import List, { UpdateModal } from './List';

const item = {
  id: '1',
  name: 'String',
};

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

describe('ItemIcon', () => {
  test('correct display of list items', () => {
    render(<List items={items as Array<IItem>} setItems={() => {}} />);

    const content = screen.getAllByText(/String/);

    expect(content.length).toBe(3);
  });

  test('correct display empty list', () => {
    render(<List items={[] as Array<IItem>} setItems={() => {}} />);

    const listItemEl = screen.queryByTestId('error-elem');

    expect(listItemEl).not.toBeInTheDocument();
  });
});

describe('UpdateModal', () => {
  test('display modal window', async () => {
    render(<UpdateModal item={item as IItem} setItems={() => {}} />);

    const button = screen.getByTestId('button-update');

    fireEvent.click(button);

    const btnChange = screen.getByText(/Change/);

    expect(btnChange).toBeInTheDocument();
  });

  test('hidden modal window', async () => {
    render(<UpdateModal item={item as IItem} setItems={() => {}} />);

    const button = screen.getByTestId('button-update');
    fireEvent.click(button);

    const btnCancel = screen.getByText(/Cancel/);
    fireEvent.click(btnCancel);

    expect(btnCancel).not.toBeInTheDocument();
  });

  test('change password', async () => {
    render(<UpdateModal item={item as IItem} setItems={() => {}} />);

    const button = screen.getByTestId('button-update');
    fireEvent.click(button);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([]),
    })) as jest.Mock;

    const btnCancel = screen.getByText(/Change/);
    fireEvent.click(btnCancel);

    await waitFor(async () => {
      expect(fetch).toBeCalled();
    });
  });
});
