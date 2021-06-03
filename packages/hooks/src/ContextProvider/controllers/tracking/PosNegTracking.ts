import { DefaultSession, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class PosNegTracking extends Tracking {
  /**
   * Construct a PosNegTracking instance.
   * @param field Field to use for click token generation.
   * @param metadata Metadata fields.
   */
  constructor(field = 'url', metadata = {}) {
    super();

    this.field = field;
    this.clientTracking = new DefaultSession(TrackingType.PosNeg, this.field, { ...getTrackingData(), ...metadata });
  }
}
