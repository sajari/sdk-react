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
   * @param variables Key-value pair parameters to use in the pipeline.
   */
  public reset(variables?: TrackingValues) {
    (this.clientTracking as Session).reset();
    if (variables !== undefined) {
      // eslint-disable-next-line no-underscore-dangle
      this._emitTrackingReset(variables);
    }
  }

  /**
   * Construct a tracking session to be used in a search.
   * @param variables Key-value pair parameters to use in the pipeline.
   */
  public next(variables: TrackingValues) {
    if (this.clientTracking === null) {
      throw new Error('clientTracking is null');
    }
    return this.clientTracking.next(variables);
  }
}
