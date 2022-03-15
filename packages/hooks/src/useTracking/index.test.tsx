import { FieldDictionary, Pipeline } from '@sajari/react-hooks';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { SearchProvider } from '..';
import { pipeline1 } from '../ContextProvider/controllers/fixtures/Pipeline';
import { EVENT_RESULT_CLICKED } from '../ContextProvider/events';
import useTracking from '.';

const pipeline = new Pipeline(
  {
    account: pipeline1.account,
    collection: pipeline1.collection,
  },
  pipeline1.name,
);

const fields = new FieldDictionary({
  title: 'name',
  subtitle: (data) => data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
});

const search = {
  pipeline,
  fields,
};

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
