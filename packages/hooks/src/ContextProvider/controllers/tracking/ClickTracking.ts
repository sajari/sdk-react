import { DefaultSession, InteractiveSession, Session, TrackingType } from '@sajari/sdk-js';

import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class ClickTracking extends Tracking {
  private field: string;

  private qParam: string;

  private prevQ: string;

  /**
   * Construct a ClickTracking instance.
   *
   * @param field Field to use for click token generation.
   * @param qParam Value to use for full-text query param.
   */
  constructor(field = 'url', qParam = 'q') {
    super();

    this.field = field;
    this.qParam = qParam;
    this.clientTracking = new InteractiveSession(
      qParam,
      new DefaultSession(TrackingType.Click, field, getTrackingData()),
    );
    this.prevQ = '';
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
   *
   * @param variables Key-value pair parameters to use in the pipeline.
   */
  public next(variables: { [k: string]: string }) {
    if (this.clientTracking === null) {
      throw new Error('clientTracking is null');
    }
    return this.clientTracking.next(variables);
  }
}
