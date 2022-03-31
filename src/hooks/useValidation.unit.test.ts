import { renderHook, act } from '@testing-library/react-hooks';
import useValidation from './useValidation';

describe('useValidation', () => {
  test('initial state', () => {
    const { result } = renderHook(() =>
      useValidation('username', 'value', 2, 10)
    );

    expect(result.current.touched).toBeFalsy();
    expect(result.current.alert).toBeFalsy();
  });

  test('generated validation content if value < minlength', () => {
    const { result } = renderHook(() =>
      useValidation('username', 'test', 5, 8)
    );

    act(() => {
      result.current.setTouched(true);
    });

    expect(result.current.alert).toEqual('Minimum username length 5 letters');
  });

  test('generated validation content if value > maxlength', () => {
    const { result } = renderHook(() =>
      useValidation('username', 'test', 0, 3)
    );

    act(() => {
      result.current.setTouched(true);
    });

    expect(result.current.alert).toEqual('Maximum username length 3 letters');
  });
});
