import { Listener, CallbackFn, ListenerMap } from "../listener";

import { Pipeline } from "../pipeline";
import { Response } from "../response";
import { Tracking } from "../tracking";

import {
  EVENT_RESPONSE_UPDATED,
  EVENT_RESULT_CLICKED,
  EVENT_ANALYTICS_PAGE_CLOSED,
  EVENT_ANALYTICS_BODY_RESET,
  EVENT_ANALYTICS_RESULT_CLICKED,
  EVENT_TRACKING_RESET
} from "../../events";

const events = [
  EVENT_ANALYTICS_PAGE_CLOSED,
  EVENT_ANALYTICS_BODY_RESET,
  EVENT_ANALYTICS_RESULT_CLICKED
];

/**
 * Analytics is an adaptor which listens for events on Pipeline and
 * Tracking and re-emits them as analytics-based events.
 */
export class Analytics {
  private enabled: boolean;
  private body: string;
  private pipeline: Pipeline;
  private tracking: Tracking;
  private listeners: ListenerMap;

  private longestNonAutocompletedBody: string;
  private longestAutocompletedBody: string;
  private bodyLabel: string;
  private bodyAutocompletedLabel: string;

  /**
   * Constructs an analytics object that operates on the specified pipeline.
   */
  constructor(pipeline: Pipeline, tracking: Tracking) {
    this.enabled = false;
    this.body = "";

    this.pipeline = pipeline;
    this.tracking = tracking;

    this.listeners = new Map(
      Object.entries({
        [EVENT_ANALYTICS_PAGE_CLOSED]: new Listener(),
        [EVENT_ANALYTICS_BODY_RESET]: new Listener(),
        [EVENT_ANALYTICS_RESULT_CLICKED]: new Listener()
      })
    );

    // longest values are for sending the users last intended query on reset
    this.longestNonAutocompletedBody = "";
    this.longestAutocompletedBody = "";

    // default to working with website pipeline values
    this.bodyLabel = "q";
    this.bodyAutocompletedLabel = "q";

    window.addEventListener("beforeunload", this.beforeunload);

    this.pipeline.listen(EVENT_RESPONSE_UPDATED, this.responseUpdated);
    this.pipeline.listen(EVENT_RESULT_CLICKED, this.resultClicked);
    this.tracking.listen(EVENT_TRACKING_RESET, this.resetBody);
  }

  /**
   * Register a listener for a specific event.
   * @param event Event to listen for
   * @param callback Callback to run when the event happens.
   * @return The unregister function to remove the callback from the listener.
   */
  public listen(event: string, callback: CallbackFn) {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Runs before the page is closed/navigated away from. Can trigger a ga onPageClose call.
   */
  beforeunload = () => {
    if (this.enabled && this.body) {
      (this.listeners.get(EVENT_ANALYTICS_PAGE_CLOSED) as Listener).notify(
        (callback) => {
          callback(this.body);
        }
      );
      this.enabled = false; // TODO(tbillington): unload -> disable!!
    }
  };

  /**
   * Resets the currently held parameters. Can trigger a ga onBodyReset call.
   */
  resetBody = () => {
    if (this.enabled) {
      (this.listeners.get(EVENT_ANALYTICS_BODY_RESET) as Listener).notify(
        (callback) => {
          callback(this.body);
        }
      );

      this.longestNonAutocompletedBody = "";
      this.longestAutocompletedBody = "";
      this.enabled = false;
    }
  };

  /**
   * Runs when the response has been updated. Updates the currently held search parameters.
   */
  responseUpdated = (response: Response) => {
    if (response.isEmpty() || response.isError()) {
      return;
    }

    this.enabled = true;

    const originalBody =
      (response.getQueryValues() as Map<string, string>).get(this.bodyLabel) ||
      "";
    const responseBody =
      (response.getValues() as Map<string, string>).get(
        this.bodyAutocompletedLabel
      ) || originalBody;

    this.body = responseBody;

    // Here we check the lengths of the non-autocompleted bodies.
    // We do this because while the user is backspacing their query
    // the new autocompleted body may be longer than their actual input,
    // but we want to record their input rather than a completion resulting
    // from them removing chars.
    if (originalBody.length >= this.longestNonAutocompletedBody.length) {
      this.longestNonAutocompletedBody = originalBody;
      this.longestAutocompletedBody = responseBody;
    }
  };

  /**
   * Runs when a result has been clicked. Can trigger a ga onResultClicked call.
   */
  resultClicked = () => {
    if (this.enabled && this.body) {
      (this.listeners.get(EVENT_ANALYTICS_RESULT_CLICKED) as Listener).notify(
        (callback) => {
          callback(this.body);
        }
      );
      this.longestNonAutocompletedBody = "";
      this.longestAutocompletedBody = "";
      this.enabled = false;
    }
  };
}
