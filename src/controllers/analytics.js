import {
  Listener,
  trackingResetEvent,
  responseUpdatedEvent,
  resultClickedEvent
} from "./";

export const pageClosedAnalyticsEvent = "page-close-analytics";
export const bodyResetAnalyticsEvent = "body-reset-analytics";
export const resultClickedAnalyticsEvent = "result-clicked-analytics";

const events = [
  pageClosedAnalyticsEvent,
  bodyResetAnalyticsEvent,
  resultClickedAnalyticsEvent
];

/**
 * Analytics is an adaptor which listens for events on Pipeline and
 * Tracking and re-emits them as analytics-based events.
 */
class Analytics {
  /**
   * Constructs an analytics object that operates on the specified pipeline.
   * @param {Pipeline} pipeline
   * @param {Sajari.Tracking} tracking
   */
  constructor(pipeline, tracking) {
    this.enabled = false;
    this.body = "";

    this.pipeline = pipeline;
    this.tracking = tracking;

    this.listeners = {
      [pageClosedAnalyticsEvent]: new Listener(),
      [bodyResetAnalyticsEvent]: new Listener(),
      [resultClickedAnalyticsEvent]: new Listener()
    };

    // longest values are for sending the users last intended query on reset
    this.longestNonAutocompletedBody = "";
    this.longestAutocompletedBody = "";

    // default to working with website pipeline values
    this.bodyLabel = "q";
    this.bodyAutocompletedLabel = "q";

    window.addEventListener("beforeunload", this.beforeunload);

    this.pipeline.listen(responseUpdatedEvent, this.responseUpdated);
    this.pipeline.listen(resultClickedEvent, this.resultClicked);
    this.tracking.listen(trackingResetEvent, this.resetBody);
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
   * Runs before the page is closed/navigated away from. Can trigger a ga onPageClose call.
   */
  beforeunload = () => {
    if (this.enabled && this.body) {
      this.listeners[pageClosedAnalyticsEvent].notify(callback => {
        callback(this.body);
      });
      this.enabled = false; // TODO(tbillington): unload -> disable!!
    }
  };

  /**
   * Resets the currently held parameters. Can trigger a ga onBodyReset call.
   */
  resetBody = () => {
    if (this.enabled) {
      this.listeners[bodyResetAnalyticsEvent].notify(callback => {
        callback(this.body);
      });

      this.longestNonAutocompletedBody = "";
      this.longestAutocompletedBody = "";
      this.enabled = false;
    }
  };

  /**
   * Runs when the response has been updated. Updates the currently held search parameters.
   */
  responseUpdated = response => {
    if (response.isEmpty() || response.isError()) {
      return;
    }

    this.enabled = true;

    const originalBody = response.getQueryValues()[this.bodyLabel] || "";
    const responseBody =
      response.getValues()[this.bodyAutocompletedLabel] || originalBody;

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
      this.listeners[resultClickedAnalyticsEvent].notify(callback => {
        callback(this.body);
      });
      this.longestNonAutocompletedBody = "";
      this.longestAutocompletedBody = "";
      this.enabled = false;
    }
  };
}

export { Analytics };
