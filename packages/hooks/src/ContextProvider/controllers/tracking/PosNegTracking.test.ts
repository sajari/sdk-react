import { TrackingType } from '@sajari/sdk-js';

import { EVENT_TRACKING_RESET } from '../../events';
import { PosNegTracking } from './PosNegTracking';

describe('PosNegTracking', () => {
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
    expect(resetHandler).toHaveBeenCalled();
    expect(resetHandler.mock.results[0].value).toBe(values);
  });
});
