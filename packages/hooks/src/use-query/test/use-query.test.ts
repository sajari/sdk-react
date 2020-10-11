import { renderHook, act } from '@testing-library/react-hooks';
import useQuery from '../index';

describe('use-query', () => {
  test('Should channge query', () => {
    const { result } = renderHook(() => useQuery());

    act(() => {
      result.current.setQuery('hello');
    });

    expect(result.current.query).toBe('hello');
  });
});
