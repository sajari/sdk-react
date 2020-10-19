import { DefaultSession, Session, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class NoTracking extends Tracking {
  /**
   * Construct a NoTracking instance.
   */
  constructor() {
    super();
    this.clientTracking = new DefaultSession(TrackingType.None, '_id', getTrackingData());
  }

  /**
   * Reset the tracking.
   * @param values Key-value pair parameters to use in the pipeline.
   */
  public reset(values?: { [k: string]: string }) {
    (this.clientTracking as Session).reset();
    if (values !== undefined) {
      // eslint-disable-next-line no-underscore-dangle
      this._emitTrackingReset(values);
    }
  }

  /**
   * Construct a tracking session to be used in a search.
   */
  public next(values: { [k: string]: string }) {
    if (this.clientTracking === null) {
      throw new Error('clientTracking is null');
    }
    return this.clientTracking.next(values);
  }
}
