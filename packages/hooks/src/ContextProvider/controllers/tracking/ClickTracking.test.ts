import { TrackingType } from '@sajari/sdk-js';

import { EVENT_TRACKING_RESET } from '../../events';
import { ClickTracking } from './ClickTracking';

describe('ClickTracking', () => {
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
    expect(resetHandler).toHaveBeenCalled();
    expect(resetHandler.mock.results[0].value).toBe(values);
  });
});
