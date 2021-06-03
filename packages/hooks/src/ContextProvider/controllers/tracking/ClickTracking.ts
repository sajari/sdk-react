import { DefaultSession, InteractiveSession, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class ClickTracking extends Tracking {
  /**
   * Construct a ClickTracking instance.
   * @param field Field to use for click token generation.
   * @param qParam Value to use for full-text query param.
   * @param metadata Metadata fields.
   */
  constructor(field = 'url', qParam = 'q', metadata: Record<string, string> = {}) {
    super();

    this.field = field;
    this.clientTracking = new InteractiveSession(
      qParam,
      new DefaultSession(TrackingType.Click, this.field, { ...getTrackingData(), ...metadata }),
    );
  }
}
