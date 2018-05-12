// @ts-ignore: module missing defintion file
import { Session, TextSession, TrackingClick, TrackingNone } from "sajari";
// @ts-ignore: module missing defintion file
import Cookies from "js-cookie";

import { EVENT_TRACKING_RESET } from "../events";
import { CallbackFn, Listener, UnlistenFn, ListenerMap } from "./listener";

const events = [EVENT_TRACKING_RESET];

export class Tracking {
  private listeners: ListenerMap;
  protected clientTracking: Session;

  constructor() {
    this.listeners = new Map(
      Object.entries({
        [EVENT_TRACKING_RESET]: new Listener()
      })
    );
  }

  /**
   * Register a listener for a specific event.
   * @param event Event to listen for
   * @param callback Callback to run when the event happens.
   * @return The unregister function to remove the callback from the listener.
   */
  listen(event: string, callback: CallbackFn): UnlistenFn {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Emits a tracking reset event to the tracking reset event listener.
   * @private
   */
  _emitTrackingReset(values: { [k: string]: string }) {
    (this.listeners.get(EVENT_TRACKING_RESET) as Listener).notify(listener => {
      listener(values);
    });
  }

  /**
   * Reset the tracking.
   * @param values Key-value pair parameters to use in the pipeline.
   */
  reset(values: { [k: string]: string }) {
    throw new Error("method 'reset' unimplemented");
  }

  /**
   * Tracking returns the tracking data to be attached to the pipeline request.
   * @param values Key-value pair parameters to use in the pipeline.
   * @return Tracking values to be used in the search request.
   */
  next(values: { [k: string]: string }) {
    throw new Error("method 'next' unimplemented");
  }
}

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
  reset(values: { [k: string]: string }) {
    this.clientTracking.reset();
    this._emitTrackingReset(values);
  }

  /**
   * Construct a tracking session to be used in a search.
   *
   * @param values Key-value pair parameters to use in the pipeline.
   */
  next(values: { [k: string]: string }) {
    const [tracking, error] = this.clientTracking.next(values);
    if (error) {
      throw new Error(error);
    }
    return tracking;
  }
}

export class NoTracking extends Tracking {
  /**
   * Construct a NoTracking instance.
   */
  constructor() {
    super();
    this.clientTracking = new Session(TrackingNone, "_id", getTrackingData());
  }

  /**
   * Reset the tracking.
   * @param values Key-value pair parameters to use in the pipeline.
   */
  reset(values: { [k: string]: string }) {
    this.clientTracking.reset();
    this._emitTrackingReset(values);
  }

  /**
   * Construct a tracking session to be used in a search.
   */
  next(values: { [k: string]: string }) {
    const [tracking, error] = this.clientTracking.next(values);
    if (error) {
      throw new Error(error);
    }
    return tracking;
  }
}

const getTrackingData = () => {
  const data = {} as { [k: string]: string };
  const ga = Cookies.get("_ga");
  if (ga) {
    data["ga"] = ga;
  }
  const sjID = Cookies.get("sjID");
  if (sjID) {
    data["sjID"] = sjID;
  }
  return data;
};
