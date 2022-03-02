import { TrackingType } from '@sajari/sdk-js';

import { EVENT_TRACKING_RESET } from '../../events';
import { EventTracking } from './EventTracking';

describe('EventTracking', () => {
  it('should work normally', () => {
    const eventTracking = new EventTracking('id', { cartId: '12345' });
    const { data, type } = eventTracking.next({});
    expect(data).toEqual({ cartId: '12345' });
    expect(type).toBe(TrackingType.Event);
  });

  it('should emit reset event', () => {
    const resetHandler = jest.fn((values) => values);
    const values = { key: 'value' };
    const eventTracking = new EventTracking();
    eventTracking.listen(EVENT_TRACKING_RESET, resetHandler);
    eventTracking.reset(values);
    expect(resetHandler).toHaveBeenCalled();
    expect(resetHandler.mock.results[0].value).toBe(values);
  });
});
