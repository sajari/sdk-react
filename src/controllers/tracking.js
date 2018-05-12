import { Session, TextSession, TrackingClick, TrackingNone } from "sajari";
import Cookies from "js-cookie";

import { Listener } from "./";

const getTrackingData = () => {
  const data = {};
  const ga = Cookies.get("_ga");
  if (ga) {
    data.ga = ga;
  }
  const sjID = Cookies.get("sjID");
  if (sjID) {
    data.sjID = sjID;
  }
  return data;
};

export const trackingResetEvent = "tracking-reset";

const events = [trackingResetEvent];

class Tracking {
  constructor() {
    this.listeners = {
      [trackingResetEvent]: new Listener()
    };
  }

  /**
   * Register a listener for a specific event.
   * @param {string} event Event to listen for
   * @param {function()} callback Callback to run when the event happens.
   * @return {function()} The unregister function to remove the callback from the listener.
   */
  listen(event, callback) {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  /**
   * Emits a tracking reset event to the tracking reset event listener.
   * @private
   */
  _emitTrackingReset(values) {
    this.listeners[trackingResetEvent].notify(listener => {
      listener(values);
    });
  }

  /**
   * Reset the tracking.
   * @param {Object} values Key-value pair parameters to use in the pipeline.
   */
  reset(/*values*/) {
    throw new Error("method 'reset' unimplemented");
  }

  /**
   * Tracking returns the tracking data to be attached to the pipeline request.
   * @param {Object} values Key-value pair parameters to use in the pipeline.
   * @return {clientTracking} Tracking values to be used in the search request.
   */
  next(/*values*/) {
    throw new Error("method 'tracking' unimplemented");
  }
}

class ClickTracking extends Tracking {
  /**
   * Construct a ClickTracking instance.
   *
   * @param {string} field Field to use for click token generation.
   * @param {string="q"} qParam Value to use for full-text query param.
   */
  constructor(field = "url", qParam = "q") {
    super();

    /** @private */
    this.field = field;
    /** @private */
    this.qParam = qParam;

    const tracking = new TextSession(
      qParam,
      new Session(TrackingClick, field, getTrackingData())
    );
    /** @private */
    this.clientTracking = tracking;

    /** @private */
    this.prevQ = "";
  }

  /**
   * Reset the tracking.
   * @param {Object} values Key-value pair parameters to use in the pipeline.
   */
  reset(values) {
    this.clientTracking.reset();
    this._emitTrackingReset(values);
  }

  /**
   * Construct a tracking session to be used in a search.
   *
   * @param {Object} values Key-value pair parameters to use in the pipeline.
   */
  next(values) {
    const [tracking, error] = this.clientTracking.next(values);
    if (error) {
      throw new Error(error);
    }
    return tracking;
  }
}

class NoTracking extends Tracking {
  /**
   * Construct a NoTracking instance.
   */
  constructor() {
    super();

    /** @private */
    this.clientTracking = new Session(TrackingNone, "_id", getTrackingData());
  }

  /**
   * Reset the tracking.
   * @param {Object} values Key-value pair parameters to use in the pipeline.
   */
  reset(values) {
    this.clientTracking.reset();
    this._emitTrackingReset(values);
  }

  /**
   * Construct a tracking session to be used in a search.
   */
  next(values) {
    const [tracking, error] = this.clientTracking.next(values);
    if (error) {
      throw new Error(error);
    }
    return tracking;
  }
}

export { ClickTracking, NoTracking };
