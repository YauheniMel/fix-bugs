import { act } from 'react-dom/test-utils';
import login from './login';

describe('login', () => {
  const username = 'Name';
  const password = 'pwd123';
  test('login request', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(''),
      })
    ) as jest.Mock;

    await act(async () => login(username, password));

    expect(fetch).toBeCalledTimes(1);
  });
});
