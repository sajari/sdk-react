import { DefaultSession, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class EventTracking extends Tracking {
  /**
   * Construct a EventTracking instance.
   * @param field Field to use for event tracking.
   * @param metadata Metadata fields.
   */
  constructor(field = '_id', metadata = {}) {
    super();

    this.field = field;
    this.clientTracking = new DefaultSession(TrackingType.Event, this.field, { ...getTrackingData(), ...metadata });
  }
}
