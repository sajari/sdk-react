import { Client, TrackingType } from '@sajari/sdk-js';

import { EVENT_TRACKING_RESET } from '../../events';
import { PosNegTracking } from './PosNegTracking';

const args = {
  token: 'ewJ...',
  values: { id: '123456', url: 'https://test.url', _id: 'abc-wea-qwe', title: 'test.title' },
};

describe('PosNegTracking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should work normally', () => {
    const posNegTracking = new PosNegTracking('id', { cartId: '12345' });
    const { data, type } = posNegTracking.next({});
    expect(data).toEqual({ cartId: '12345' });
    expect(type).toBe(TrackingType.PosNeg);
  });

  it('should emit reset event', () => {
    const resetHandler = jest.fn((values) => values);
    const values = { key: 'value' };
    const posNegTracking = new PosNegTracking();
    posNegTracking.listen(EVENT_TRACKING_RESET, resetHandler);
    posNegTracking.reset(values);
    expect(resetHandler).toHaveBeenCalledWith(values);
  });

  describe('onResultClick', () => {
    const handleResultClickedSpy = jest.fn();
    const posNegTracking = new PosNegTracking();
    posNegTracking.bootstrap(new Client('account', 'collection'), handleResultClickedSpy);
    const addSpy = jest.spyOn(posNegTracking.posNegLocalStorageManager, 'add');

    it('calls handleResultClicked', () => {
      posNegTracking.onResultClick(args.values, { pos: args.token, neg: args.token });
      expect(handleResultClickedSpy).toHaveBeenCalledWith(args);
    });

    it('calls posNegLocalStorageManager.add', () => {
      const token = { pos: args.token, neg: args.token };
      posNegTracking.onResultClick(args.values, token);
      expect(addSpy).toHaveBeenCalledWith(args.values.url, token);
    });
  });
});
