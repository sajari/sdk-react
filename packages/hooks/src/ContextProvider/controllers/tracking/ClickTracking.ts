import { DefaultSession, InteractiveSession, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class ClickTracking extends Tracking {
  /**
   * Construct a ClickTracking instance.
   * @param field Field to use for click token generation.
   * @param qParam Value to use for full-text query param.
   */
  constructor(field = 'url', metadata = { qParam: 'q' }) {
    super();
    const { qParam, ...rest } = metadata;

    this.field = field;
    this.clientTracking = new InteractiveSession(
      qParam,
      new DefaultSession(TrackingType.Click, this.field, { ...getTrackingData(), ...rest }),
    );
  }
}
