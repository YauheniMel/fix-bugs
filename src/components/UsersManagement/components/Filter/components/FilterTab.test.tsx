import { fireEvent, screen, render } from '@testing-library/react';
import FilterTab from './FilterTab';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<any>('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('FilterTab', () => {
  test('correct display content icon', () => {
    render(<FilterTab title={'Title'} count={3} path="/path" />);

    const content = screen.getByText(/Title/);
    const counter = screen.getByText(/3/);

    expect(content).toBeTruthy();
    expect(counter).toBeTruthy();
  });

  test('correct path change', () => {
    render(<FilterTab title={'Title'} count={3} path="/path" />);
    const filterTabEl = screen.getByText(/Title/);

    fireEvent.click(filterTabEl);

    expect(mockHistoryPush).toBeCalledWith('/path');
  });
});
