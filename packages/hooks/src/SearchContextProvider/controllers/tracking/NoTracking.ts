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
   * @param variables Key-value pair parameters to use in the pipeline.
   */
  public reset(variables?: { [k: string]: string }) {
    (this.clientTracking as Session).reset();
    if (variables !== undefined) {
      // eslint-disable-next-line no-underscore-dangle
      this._emitTrackingReset(variables);
    }
  }

  /**
   * Construct a tracking session to be used in a search.
   */
  public next(variables: { [k: string]: string }) {
    if (this.clientTracking === null) {
      throw new Error('clientTracking is null');
    }
    return this.clientTracking.next(variables);
  }
}
