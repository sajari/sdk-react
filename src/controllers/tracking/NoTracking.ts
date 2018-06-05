import {
  DefaultSession,
  Session,
  Tracking as SDKTracking,
  TrackingType
} from "@sajari/sdk-js";

import { Tracking } from "./Tracking";
import { getTrackingData } from "./utils";

export class NoTracking extends Tracking {
  /**
   * Construct a NoTracking instance.
   */
  constructor() {
    super();
    this.clientTracking = new DefaultSession(
      TrackingType.None,
      "_id",
      getTrackingData()
    );
  }

  /**
   * Reset the tracking.
   * @param values Key-value pair parameters to use in the pipeline.
   */
  public reset(values?: { [k: string]: string }) {
    (this.clientTracking as Session).reset();
    if (values !== undefined) {
      this._emitTrackingReset(values);
    }
  }

  /**
   * Construct a tracking session to be used in a search.
   */
  public next(values: { [k: string]: string }) {
    return (this.clientTracking as Session).next(values);
  }
}
