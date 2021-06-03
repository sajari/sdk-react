import { DefaultSession, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class PosNegTracking extends Tracking {
  /**
   * Construct a PosNegTracking instance.
   * @param field Field to use for click token generation.
   * @param data Data to use for tracking.
   */
  constructor(field = 'url', data = {}) {
    super();

    this.field = field;
    this.clientTracking = new DefaultSession(TrackingType.PosNeg, this.field, { ...getTrackingData(), ...data });
  }
}
