import { waitFor } from '@testing-library/react';

import { EVENT_RESPONSE_UPDATED, EVENT_RESULT_CLICKED } from '../events';
import { pipeline1 } from './fixtures/Pipeline';
import { Pipeline } from './Pipeline';
import { ClickTracking } from './tracking';

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
});
