import { renderHook, act } from '@testing-library/react-hooks';
import { IItem } from '~/services/getUserItems';

import useItemsProvider from './useItemsProvider';

const item = {
  id: '1',
  name: 'Yauheni',
};

describe('useItemsProvider', () => {
  test('success fetching request', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;

    const { result } = renderHook(useItemsProvider);
    await act(async () => fetch);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errorMessage).toBeFalsy();
  });
  test('failure fetching request', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Error'));
    const { result } = renderHook(useItemsProvider);

    await act(async () => fetch);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errorMessage).toBe('Error');
  });

  test('setting fetch items', async () => {
    const { result } = renderHook(useItemsProvider);

    await act(async () => result.current.setItems([item as IItem]));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.items).toEqual([item]);
  });
});
