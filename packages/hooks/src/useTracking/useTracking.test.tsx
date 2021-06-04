import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { SearchProvider } from '..';
import { EVENT_RESULT_CLICKED } from '../ContextProvider/events';
import { search } from '../test/default-config';
import useTracking from '.';

describe('useTracking', () => {
  it('should work normally', () => {
    const onResultClickHandler = jest.fn((data) => data);
    search.pipeline.listen(EVENT_RESULT_CLICKED, onResultClickHandler);

    const data = {
      token: 'ewJ...',
      values: { id: '123456', url: 'test.url', _id: 'abc-wea-qwe', title: 'test.title' },
    };
    const wrapper = ({ children }) => <SearchProvider search={search}>{children}</SearchProvider>;
    const { result } = renderHook(() => useTracking(), { wrapper });

    expect(onResultClickHandler).not.toBeCalled();

    act(() => {
      result.current.handleResultClicked(data);
    });

    expect(onResultClickHandler).toBeCalled();
    expect(onResultClickHandler.mock.results[0].value).toEqual(data);
  });
});
