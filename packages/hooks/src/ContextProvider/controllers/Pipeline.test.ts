import { waitFor } from '@testing-library/react';

import { EVENT_RESPONSE_UPDATED, EVENT_RESULT_CLICKED } from '../events';
import { pipeline1 } from './fixtures/Pipeline';
import { Pipeline } from './Pipeline';
import { ClickTracking, EventTracking } from './tracking';

describe('Pipeline', () => {
  it('should work normally', () => {
    const pipeline = new Pipeline(pipeline1, pipeline1.name, new ClickTracking());

    expect(pipeline.config).toEqual(pipeline1);
  });

  it('should send out search request', async () => {
    const pipeline = new Pipeline(pipeline1, pipeline1.name, new ClickTracking());
    const responseUpdated = jest.fn((response) => response);

    pipeline.listen(EVENT_RESPONSE_UPDATED, responseUpdated);
    pipeline.search({ q: 'some search string' });
    await waitFor(() => expect(responseUpdated).toHaveBeenCalled());

    expect(responseUpdated.mock.results[0].value.isEmpty()).toBeFalsy();
  });

  it('should emit result clicked listener with the right arg', () => {
    const pipeline = new Pipeline(pipeline1, pipeline1.name, new ClickTracking());
    const onResultClick = jest.fn((data) => data);
    const data = {
      token: 'test.token',
      values: {
        _id: 'unique-id',
        url: 'test.url',
        title: 'test.title',
      },
    };

    pipeline.listen(EVENT_RESULT_CLICKED, onResultClick);

    pipeline.emitResultClicked(data);

    expect(onResultClick).toHaveBeenCalled();
    expect(onResultClick.mock.results[0].value).toEqual(data);
  });

  it('should set a custom click token url', () => {
    const clickTokenURL = 'https://example.com';
    const pipeline = new Pipeline({ ...pipeline1, clickTokenURL }, pipeline1.name, new ClickTracking());

    expect(pipeline.getClient().config.clickTokenURL).toEqual(clickTokenURL);
  });

  it('should set a custom user agent', () => {
    const userAgent = 'test user agent';
    const pipeline = new Pipeline({ ...pipeline1, userAgent }, pipeline1.name, new ClickTracking());

    expect(pipeline.getClient().config.userAgent).toEqual(userAgent);
  });

  it('should set up tracking object on construction', () => {
    const eventTracking = new EventTracking();

    expect(eventTracking.client).toBeUndefined();
    expect(eventTracking.handleResultClicked).toBeUndefined();

    const pipeline = new Pipeline(pipeline1, pipeline1.name, eventTracking);

    expect(eventTracking.client).toBe(pipeline.getClient());
    expect(eventTracking.handleResultClicked).toBe(pipeline.emitResultClicked);
  });

  it('should call onQueryResponse on search response', async () => {
    const eventTracking = new EventTracking();
    const onQueryResponseSpy = jest.spyOn(eventTracking, 'onQueryResponse');
    const pipeline = new Pipeline(pipeline1, pipeline1.name, eventTracking);
    const responseUpdated = jest.fn((response) => response);

    pipeline.listen(EVENT_RESPONSE_UPDATED, responseUpdated);
    pipeline.search({ q: 'some search string' });
    await waitFor(() => expect(responseUpdated).toHaveBeenCalled());

    expect(onQueryResponseSpy).toHaveBeenCalled();
  });
});
