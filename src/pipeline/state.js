import * as Sajari from 'sajari'

class NamespaceState {
  constructor(namespace) {
    this.namespace = namespace;
    this.values = {};

    this.trackingData = {};
    
    this.tracking = null;
    
    this.trackingSeq = 0;
    this.trackingQid = "";

    this.listeners = [];
  }

  getPipeline() {
    return this.pipeline;
  }

  setPipeline(pipeline) {
    this.pipeline = pipeline;
  }

  setProject(project) {
    this.project = project;
  }

  setCollection(collection) {
    this.collection = collection;
  }

  setTrackingData(data) {
    this.trackingData = data;
  }

  _runSearch() {
    // If q == "" then clear the results immediately and don't run a search.
    if (this.values["q"] === "") {
      this.results = undefined;
    }

    const client = new Sajari.Client(this.project, this.collection);
    if (!this.tracking) {
      this.tracking = new Sajari.Tracking();
    }

    if (this.pipeline === 'website') {
      this.tracking.clickTokens('url') // NOTE: this will not be cleared if the pipeline is changed
    }

    // trackingData is merged into the tracking.data (to avoid clearing existing values unless
    // another explicitly replaces it).
    if (this.trackingData) {
      for (let k in this.trackingData) {
        this.tracking.data[k] = this.trackingData[k];
      }
    }

    client.searchPipeline(this.pipeline, this.values, this.tracking, (err, res) => {
      if (res.values) {
        // TODO: Move this out into a method.
        // This stuff is specific to autocomplete only.
        let state = this.getValues();
        if (res.values["q"] && res.values["q"] !== state["q"]) {
          res.values["q.used"] = res.values["q"];
          delete res.values["q"];
        } else {
          res.values["q.used"] = null;
        }
        this.setValues(res.values, false);
      }
      this.results = res.searchResponse;
      this.notify();
    })
  }

  // Changes to values and also changes to results.
  registerChangeListener(listener) {
    this.listeners.push(listener)
  }

  unregisterChangeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener)
  }

  notify() {
    this.listeners.forEach(l => l())
  }

  getStatus() {
    return this.status;
  }

  getResults() {
    return this.results;
  }

  getValues() {
    return this.values;
  }
  
  setValues(values, runSearch = false) {
    // Only if values["q"] is set do we check if the value has changed.
    if (values["q"] !== undefined) {
      let prevQ = this.values["q"] || "";
      let currQ = values["q"];

      if (!currQ.startsWith(prevQ.substr(0, 3))) {
        this.tracking.resetID();
      }

      // Reset the page, but only if we're not already trying
      // to set it.
      if (values["page"] === undefined) {
        this.values["page"] = "1";
      }
    }

    for (let k in values) {
      this.values[k] = values[k]
    }
    if (runSearch) {
      this._runSearch();
    }
    this.notify();
  }
}

class State {
  constructor() {
    this._ns = {}
    
    this.ns = this.ns.bind(this);
  }
  
  default() {
    return this.ns("default");
  }
  
  ns(namespace) {
    let n = this._ns[namespace]
    if (!n) {
      n = new NamespaceState();
      this._ns[namespace] = n
    }
    return n;
  }
}

const _state = new State();

export default _state