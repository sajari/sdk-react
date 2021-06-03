import { DefaultSession, InteractiveSession, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class ClickTracking extends Tracking {
  /**
   * Construct a ClickTracking instance.
   * @param field Field to use for click token generation.
   * @param data Data to use for tracking.
   */
  constructor(field = 'url', data: Record<string, string> = { qParam: 'q' }) {
    super();

    this.field = field;
    this.clientTracking = new InteractiveSession(
      data.qParam,
      new DefaultSession(TrackingType.Click, this.field, { ...getTrackingData(), ...data }),
    );
  }
}
