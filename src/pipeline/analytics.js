import GA from "sajari-react/ui/Analytics/ga";

import './polyfill' // for .startsWith

class Analytics {
  constructor(state, ga = new GA()) {
    this.state = state;
    this.ga = ga;

    this.enabled = false;
    this.body = "";

    this.beforeunload = this.beforeunload.bind(this);
    this.onChange = this.onChange.bind(this);
    this.resetBody = this.resetBody.bind(this);
    this.resultClicked = this.resultClicked.bind(this);

    window.addEventListener("beforeunload", this.beforeunload);

    state.registerResultsListener(this.onChange);
    state.registerResetListener(this.resetBody);
    state.registerResultClickedListener(this.resultClicked);
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
    const searchResponse = this.state.getResults();
    // Enable analytics once a successful search has been performed
    if (searchResponse && searchResponse.results) {
      this.enabled = true;
    }

    const values = this.state.getValues();
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
