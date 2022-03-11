import { Client, TrackingType } from '@sajari/sdk-js';

import { EVENT_TRACKING_RESET } from '../../events';
import { ClickTracking } from './ClickTracking';

const args = {
  token: 'https://re.sajari.com/token/ewJ...',
  values: { id: '123456', url: 'https://test.url', _id: 'abc-wea-qwe', title: 'test.title' },
};
const sendBeaconOriginal = navigator.sendBeacon;
const sendBeaconSpy = jest.fn();
navigator.sendBeacon = sendBeaconSpy;

describe('ClickTracking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
    navigator.sendBeacon = sendBeaconOriginal;
  });

  it('should work normally', () => {
    const clickTracking = new ClickTracking('id', 'q', { cartId: '12345' });
    const { data, type } = clickTracking.next({});
    expect(data).toEqual({ cartId: '12345' });
    expect(type).toBe(TrackingType.Click);
  });

  it('should emit reset event', () => {
    const resetHandler = jest.fn((values) => values);
    const values = { key: 'value' };
    const clickTracking = new ClickTracking();
    clickTracking.listen(EVENT_TRACKING_RESET, resetHandler);
    clickTracking.reset(values);
    expect(resetHandler).toHaveBeenCalledWith(values);
  });

  describe('onResultClick', () => {
    const handleResultClickedSpy = jest.fn();
    const clickTracking = new ClickTracking();
    clickTracking.bootstrap(new Client('account', 'collection'), handleResultClickedSpy);

    it('calls handleResultClicked', () => {
      clickTracking.onResultClick(args.values, { click: args.token });
      expect(handleResultClickedSpy).toHaveBeenCalledWith(args);
    });

    it('calls navigator.sendBeacon if the url field is invalid', () => {
      clickTracking.onResultClick({ ...args.values, url: 'foo' }, { click: args.token });
      expect(sendBeaconSpy).toHaveBeenCalledWith(args.token);
    });
  });

  describe('getResultHref', () => {
    const clickTracking = new ClickTracking();
    clickTracking.bootstrap(new Client('account', 'collection'), jest.fn());

    it('returns the click token if passed', () => {
      expect(clickTracking.getResultHref(args.values, { click: args.token })).toEqual(args.token);
    });

    it('returns the url field if no click token is passed', () => {
      expect(clickTracking.getResultHref(args.values)).toEqual(args.values.url);
    });
  });
});
