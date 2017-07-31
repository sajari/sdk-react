import GA from "./ga";

import {
  trackingResetEvent,
  responseUpdatedEvent,
  resultClickedEvent
} from "../controllers";

class Analytics {
  /**
   * Constructs an analytics object that operates on the specified pipeline.
   * @param {Pipeline} pipeline
   * @param {Sajari.Tracking} tracking
   * @param {GA} [ga=GoogleAnalytics]
   */
  constructor(pipeline, tracking, ga = new GA()) {
    this.ga = ga;

    this.enabled = false;
    this.body = "";

    this.pipeline = pipeline;
    this.tracking = tracking;

    // longest values are for sending the users last intended query on reset
    this.longestNonAutocompletedBody = "";
    this.longestAutocompletedBody = "";

    // default to working with web pipeline values
    this.bodyLabel = "q";
    this.bodyAutocompletedLabel = "q.used";

    this.beforeunload = this.beforeunload.bind(this);
    this.responseUpdated = this.responseUpdated.bind(this);
    this.resetBody = this.resetBody.bind(this);
    this.resultClicked = this.resultClicked.bind(this);

    window.addEventListener("beforeunload", this.beforeunload);

    this.pipeline.listen(responseUpdatedEvent, this.responseUpdated);
    this.pipeline.listen(resultClickedEvent, this.resultClicked);
    this.tracking.listen(trackingResetEvent, this.resetBody);
  }

  /**
   * Runs before the page is closed/navigated away from. Can trigger a ga onPageClose call.
   */
  beforeunload() {
    if (this.enabled && this.body) {
      this.ga.onPageClose(this.body);
      this.enabled = false;
    }
  }

  /**
   * Resets the currently held parameters. Can trigger a ga onBodyReset call.
   */
  resetBody() {
    if (this.enabled) {
      // Send the longest body since the last time the body was cleared.
      // Use completion if available.
      this.ga.onBodyReset(
        this.longestAutocompletedBody || this.longestNonAutocompletedBody
      );
      this.longestNonAutocompletedBody = "";
      this.longestAutocompletedBody = "";
      this.enabled = false;
    }
  }

  /**
   * Runs when the response has been updated. Updates the currently held search parameters.
   */
  responseUpdated(response) {
    if (response.isEmpty() || response.isError()) {
      return;
    }

    this.enabled = true;

    const values = response.getQueryValues() || {};
    const originalBody = values[this.bodyLabel] || "";
    const newBody = values[this.bodyAutocompletedLabel] || originalBody;

    // Here we check the lengths of the non-autocompleted bodies.
    // We do this because while the user is backspacing their query
    // the new autocompleted body may be longer than their actual input,
    // but we want to record their input rather than a completion resulting
    // from them removing chars.
    if (originalBody.length >= this.longestNonAutocompletedBody.length) {
      this.longestNonAutocompletedBody = originalBody;
      this.longestAutocompletedBody = values[this.bodyAutocompletedLabel];
    }

    this.body = newBody;
  }

  /**
   * Runs when a result has been clicked. Can trigger a ga onResultClicked call.
   */
  resultClicked() {
    if (this.enabled && this.body) {
      this.ga.onResultClicked(this.body);
      this.longestNonAutocompletedBody = "";
      this.longestAutocompletedBody = "";
      this.enabled = false;
    }
  }
}

export default Analytics;
