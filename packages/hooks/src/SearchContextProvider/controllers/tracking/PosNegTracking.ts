import { DefaultSession, Session, TrackingType } from '@sajari/sdk-js';

import { Tracking, TrackingValues } from './Tracking';
import { getTrackingData } from './utils';

export class PosNegTracking extends Tracking {
  /**
   * Construct a PosNegTracking instance.
   */
  constructor(field: string) {
    super();
    this.clientTracking = new DefaultSession(TrackingType.PosNeg, field, getTrackingData());
  }

  /**
   * Reset the tracking.
   * @param values Key-value pair parameters to use in the pipeline.
   */
  public reset(values?: TrackingValues) {
    (this.clientTracking as Session).reset();
    if (values !== undefined) {
      // eslint-disable-next-line no-underscore-dangle
      this._emitTrackingReset(values);
    }
  }

  /**
   * Construct a tracking session to be used in a search.
   * @param values Key-value pair parameters to use in the pipeline.
   */
  public next(values: TrackingValues) {
    if (this.clientTracking === null) {
      throw new Error('clientTracking is null');
    }
    return this.clientTracking.next(values);
  }
}
