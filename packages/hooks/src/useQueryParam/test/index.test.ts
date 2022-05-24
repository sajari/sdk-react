import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import useQueryParam from '..';

describe('useQueryParam', () => {
  it('calls the callback', async () => {
    const callback = jest.fn();
    renderHook(() => useQueryParam('q', { callback }));
    expect(callback).not.toBeCalled();
    fireEvent.popState(window, { state: { q: 'query' } });
    expect(callback).toBeCalled();
  });

  it('update the url', async () => {
    const { result, waitFor } = renderHook(() => useQueryParam('q'));
    act(() => {
      result.current('new-value');
    });
    waitFor(() => expect(new URLSearchParams(window.location.search).get('q')).toBe('new-value'));
    act(() => {
      result.current(['brand-a', 'brand-b', 'brand-c']);
    });
    waitFor(() => expect(new URLSearchParams(window.location.search).get('q')).toBe('brand-a,brand-b,brand-c'));
  });

  it('replaces the url', async () => {
    const { result, waitFor } = renderHook(() => useQueryParam('q', { replace: true }));
    // TODO: find a better way to test this? (currently it is written with the assumption that the underlying mechanism is known - using pushState/replaceState)
    const pushState = jest.fn();
    const replaceState = jest.fn();
    window.history.pushState = pushState;
    window.history.replaceState = replaceState;
    act(() => {
      result.current('new-value');
    });
    waitFor(() => expect(pushState).not.toBeCalled());
    waitFor(() => expect(replaceState).toBeCalledTimes(1));
    act(() => {
      result.current('newer-value');
    });
    waitFor(() => expect(replaceState).toBeCalledTimes(2));
  });
});
