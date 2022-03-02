import { EventTracking, SearchIOAnalytics } from '@sajari/react-hooks';

import applyEventTracking from './applyEventTracking';

describe('applyEventTracking', () => {
  const trackSpy = jest.spyOn(SearchIOAnalytics.prototype, 'track').mockImplementation();

  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should work normally', () => {
    const onClickHandler = jest.fn();
    const { onClick } = applyEventTracking({
      tracking: new EventTracking('_id', {
        foo: 'bar',
      }),
      values: { _id: '12345', title: 'test.title', url: 'test.url' },
      onClick: onClickHandler,
      searchIOAnalytics: new SearchIOAnalytics('test-account', 'test-collection'),
    });

    expect(onClickHandler).not.toBeCalled();
    expect(trackSpy).not.toBeCalled();
    onClick();
    expect(onClickHandler).toBeCalled();
    expect(trackSpy).toBeCalledWith('click', '12345', { foo: 'bar' });
  });

  it('should work normally without metadata or field specified', () => {
    const onClickHandler = jest.fn();
    const { onClick } = applyEventTracking({
      tracking: new EventTracking(),
      values: { _id: '12345', title: 'test.title', url: 'test.url' },
      onClick: onClickHandler,
      searchIOAnalytics: new SearchIOAnalytics('test-account', 'test-collection'),
    });

    expect(onClickHandler).not.toBeCalled();
    expect(trackSpy).not.toBeCalled();
    onClick();
    expect(onClickHandler).toBeCalled();
    expect(trackSpy).toBeCalledWith('click', '12345', undefined);
  });
});
