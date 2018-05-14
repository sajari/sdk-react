// @ts-ignore: module missing defintion file
import { Session, TextSession, TrackingClick, TrackingNone } from "sajari";

import { EVENT_TRACKING_RESET } from "../../events";
import { CallbackFn, Listener, ListenerMap, UnlistenFn } from "../listener";
import { getTrackingData } from "./utils";

const events = [EVENT_TRACKING_RESET];

export class Tracking {
  public clientTracking: Session;
  private listeners: ListenerMap;

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
  public listen(event: string, callback: CallbackFn): UnlistenFn {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Emits a tracking reset event to the tracking reset event listener.
   * @private
   */
  public _emitTrackingReset(values: { [k: string]: string }) {
    (this.listeners.get(EVENT_TRACKING_RESET) as Listener).notify(listener => {
      listener(values);
    });
  }

  /**
   * Reset the tracking.
   * @param values Key-value pair parameters to use in the pipeline.
   */
  public reset(values: { [k: string]: string }) {
    throw new Error("method 'reset' unimplemented");
  }

  /**
   * Tracking returns the tracking data to be attached to the pipeline request.
   * @param values Key-value pair parameters to use in the pipeline.
   * @return Tracking values to be used in the search request.
   */
  public next(values: { [k: string]: string }) {
    throw new Error("method 'next' unimplemented");
  }
}
