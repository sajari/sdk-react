import { DefaultSession, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class NoTracking extends Tracking {
  /**
   * Construct a NoTracking instance.
   */
  constructor() {
    super();

    this.field = '_id';
    this.clientTracking = new DefaultSession(TrackingType.None, this.field, getTrackingData());
  }
}
