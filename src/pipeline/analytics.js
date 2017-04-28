import GA from "sajari-react/ui/Analytics/ga";

import {
  State,
  RESULTS_CHANGED,
  TRACKING_RESET,
  RESULT_CLICKED
} from "./state";

class Analytics {
  constructor(namespace, ga = new GA()) {
    this.ga = ga;

    this.namespace = namespace;

    this.enabled = false;
    this.body = "";

    // longest values are for sending the users last intended query on reset
    this.longestNonAutocompletedBody = "";
    this.longestAutocompletedBody = "";

    // default to working with web pipeline values
    this.bodyLabel = "q";
    this.bodyAutocompletedLabel = "q.used";

    this.beforeunload = this.beforeunload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.resetBody = this.resetBody.bind(this);
    this.resultClicked = this.resultClicked.bind(this);

    window.addEventListener("beforeunload", this.beforeunload);

    State.ns(namespace).registerListener(RESULTS_CHANGED, this.onChange);
    State.ns(namespace).registerListener(TRACKING_RESET, this.resetBody);
    State.ns(namespace).registerListener(RESULT_CLICKED, this.resultClicked);
  }

  beforeunload() {
    if (this.enabled && this.body) {
      this.ga.onPageClose(this.body);
      this.enabled = false;
    }
  }

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

  onChange() {
    const searchResponse = State.ns(this.namespace).getResults();
    // Enable analytics once a successful search has been performed
    if (searchResponse && searchResponse.results) {
      this.enabled = true;
    }

    const values = State.ns(this.namespace).getValues();
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
