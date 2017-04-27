import GA from "sajari-react/ui/Analytics/ga";

import { State, RESULTS_CHANGED, TRACKING_RESET, RESULT_CLICKED } from './state'

class Analytics {
  constructor(namespace, ga = new GA()) {
    this.ga = ga;

    this.namespace = namespace;

    this.enabled = false;
    this.body = "";

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
      this.ga.onBodyReset(this.body);
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
    const newBody = values["q.used"] || values.q || "";

    this.body = newBody;
  }

  resultClicked() {
    if (this.enabled && this.body) {
      this.ga.onResultClicked(this.body);
      this.enabled = false;
    }
  }
}

export default Analytics
