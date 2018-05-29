// @ts-ignore: module missing defintion file
import { Session, TextSession, TrackingClick } from "@sajari/sdk-js";

import { Tracking } from "./Tracking";
import { getTrackingData } from "./utils";

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
  constructor(field = "url", qParam = "q") {
    super();

    this.field = field;
    this.qParam = qParam;
    this.clientTracking = new TextSession(
      qParam,
      new Session(TrackingClick, field, getTrackingData())
    );
    this.prevQ = "";
  }

  /**
   * Reset the tracking.
   * @param values Key-value pair parameters to use in the pipeline.
   */
  public reset(values: { [k: string]: string }) {
    this.clientTracking.reset();
    this._emitTrackingReset(values);
  }

  /**
   * Construct a tracking session to be used in a search.
   *
   * @param values Key-value pair parameters to use in the pipeline.
   */
  public next(values: { [k: string]: string }) {
    return this.clientTracking.next(values);
  }
}
