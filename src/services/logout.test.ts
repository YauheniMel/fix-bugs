import { act } from 'react-dom/test-utils';
import logout from './logout';

describe('logout', () => {
  test('logout request', async () => {
    global.fetch = jest.fn(() => Promise.resolve('')) as jest.Mock;

    await act(async () => logout());

    expect(fetch).toBeCalledTimes(1);
  });
});
