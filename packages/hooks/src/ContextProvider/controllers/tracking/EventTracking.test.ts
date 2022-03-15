import { Client, TrackingType } from '@sajari/sdk-js';

import { EVENT_TRACKING_RESET } from '../../events';
import { Response } from '../Response';
import { EventTracking } from './EventTracking';

const resultValues = { id: '123456', url: 'https://test.url', _id: 'abc-wea-qwe', title: 'test.title' };
const metadata = { cartId: '12345' };
jest.spyOn(console, 'error').mockImplementation(); // avoid polluting logs with messaging about not having a queryId set to track against

describe('EventTracking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should work normally', () => {
    const eventTracking = new EventTracking('id', metadata);
    const { data, type } = eventTracking.next({});
    expect(data).toEqual(metadata);
    expect(type).toBe(TrackingType.Event);
  });

  it('should emit reset event', () => {
    const resetHandler = jest.fn((values) => values);
    const values = { key: 'value' };
    const eventTracking = new EventTracking();
    eventTracking.listen(EVENT_TRACKING_RESET, resetHandler);
    eventTracking.reset(values);
    expect(resetHandler).toHaveBeenCalledWith(values);
  });

  it('should set a custom analytics url', () => {
    const account = 'account-id';
    const collection = 'collection-id';
    const searchIOAnalyticsEndpoint = 'https://example.com';
    const eventTracking = new EventTracking(undefined, undefined, searchIOAnalyticsEndpoint);
    eventTracking.bootstrap(new Client(account, collection), jest.fn());

    expect(eventTracking.searchIOAnalytics.account).toEqual(account);
    expect(eventTracking.searchIOAnalytics.collection).toEqual(collection);
    expect(eventTracking.searchIOAnalytics.endpoint).toEqual(searchIOAnalyticsEndpoint);
  });

  describe('onQueryResponse', () => {
    const eventTracking = new EventTracking();
    eventTracking.bootstrap(new Client('account', 'collection'), jest.fn());
    const updateQueryIdSpy = jest.spyOn(eventTracking.searchIOAnalytics, 'updateQueryId');

    it('calls searchIOAnalytics.updateQueryId', () => {
      const queryId = 'my-query-id';
      eventTracking.onQueryResponse(new Response(null, undefined, new Map(Object.entries({ queryId }))));
      expect(updateQueryIdSpy).toHaveBeenCalledWith(queryId);
    });
  });

  describe('onResultClick', () => {
    const handleResultClickedSpy = jest.fn();
    const eventTracking = new EventTracking('id', metadata);
    eventTracking.bootstrap(new Client('account', 'collection'), handleResultClickedSpy);
    const trackSpy = jest.spyOn(eventTracking.searchIOAnalytics, 'track');

    it('calls handleResultClicked', () => {
      eventTracking.onResultClick(resultValues);
      expect(handleResultClickedSpy).toHaveBeenCalledWith({ values: resultValues });
    });

    it('calls searchIOAnalytics.track', () => {
      eventTracking.onResultClick(resultValues);
      expect(trackSpy).toHaveBeenCalledWith('click', resultValues.id, metadata);
    });
  });

  describe('onPromotionClick', () => {
    const handleResultClickedSpy = jest.fn();
    const eventTracking = new EventTracking('id', metadata);
    eventTracking.bootstrap(new Client('account', 'collection'), handleResultClickedSpy);
    const trackSpy = jest.spyOn(eventTracking.searchIOAnalytics, 'track');

    it('calls searchIOAnalytics.track', () => {
      eventTracking.onPromotionClick({ id: 'banner-id' });
      expect(trackSpy).toHaveBeenCalledWith('promotion_click', 'banner-id', metadata);
    });
  });

  describe('onRedirect', () => {
    const handleResultClickedSpy = jest.fn();
    const eventTracking = new EventTracking('id', metadata);
    eventTracking.bootstrap(new Client('account', 'collection'), handleResultClickedSpy);
    const trackSpy = jest.spyOn(eventTracking.searchIOAnalytics, 'track');

    it('calls searchIOAnalytics.track', () => {
      eventTracking.onRedirect({ id: 'redirect-id', target: '' });
      expect(trackSpy).toHaveBeenCalledWith('redirect', 'redirect-id', metadata);
    });
  });
});
