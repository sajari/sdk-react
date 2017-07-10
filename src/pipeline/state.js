import * as Sajari from 'sajari'

import './polyfill' // for .startsWith

const TRACKING_RESET = 'TRACKING_RESET';
const RESULT_CLICKED = 'RESULT_CLICKED';
const RESULTS_CHANGED = 'RESULTS_CHANGED';
const VALUES_CHANGED = 'VALUES_CHANGED';

// beforeSearch is run before a search is started (i.e. sent to the server).
// If it returns false, then we bail.
const websiteBeforeSearch = state => {
  // If q == "" then clear the results immediately and don't run a search.
  if (state.getValues()["q"] === "") {
    state.reset()
    delete state.getValues()["filter"];
    delete state.getValues()["page"];
    return false;
  }
  return true
};

const websiteConstructTracking = state => {
  const tracking = new Sajari.Tracking()

  if (state.pipeline === 'website') {
    tracking.clickTokens('url') // NOTE: this will not be cleared if the pipeline is changed
  }

  // tracking.data is merged into tracking.data (to avoid clearing existing values unless
  // another explicitly replaces it).
  if (state.tracking.data) {
    for (let k in state.tracking.data) {
      tracking.data[k] = state.tracking.data[k];
    }
  }

  // Record the QID and the sequence
  if (state.tracking.qid && state.tracking.seq >= 0) {
    tracking.i = state.tracking.qid;
    tracking.s = state.tracking.seq+1;
  }
  state.tracking.qid = tracking.i;
  state.tracking.seq = tracking.s;

  return tracking;
}

class state {
  constructor(namespace) {
    this.namespace = namespace;
    this.values = {};
    this.responseValues = {};
    this.tracking = {};

    this.listeners = [];
    this.beforeSearch = websiteBeforeSearch;
    this.constructTracking = websiteConstructTracking;

    let proxyListeners = [];
    const unregisterProxyListener = listener => {
      proxyListeners = proxyListeners.filter(l => l !== listener);
    }
    const registerProxyListener = (type, listener) => {
      proxyListeners.push({ type, listener });
      return () => unregisterProxyListener(listener);
    }

    this.proxy = {
      setValues: this.setValues.bind(this),
      listeners: proxyListeners,
      registerListener: registerProxyListener,
      unregisterListener: unregisterProxyListener,
      getValues: this.getValues.bind(this),
      getResponseValues: this.getResponseValues.bind(this),
      getResults: this.getResults.bind(this),
      getError: this.getError.bind(this),
    };
  }

  getProxy() {
    return this.proxy;
  }

  getPipeline() {
    return this.pipeline;
  }

  getNamespace() {
    return this.namespace;
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
    this.tracking.data = data;
  }

  setBeforeSearch(f) {
    this.beforeSearch = f;
  }

  setConstructTracking(f) {
    this.constructTracking = f;
  }

  resetTracking() {
    this.tracking.seq = null;
    this.tracking.qid = null;
    this.notify(TRACKING_RESET);
  }

  reset() {
    this.results = undefined;
    this.error = undefined;
    this.values = {};
    this.responseValues = {};
    this.notify(RESULTS_CHANGED);
    this.resetTracking();
  }

  _runSearch() {
    if (!this.beforeSearch(this)) {
      return
    }

    const client = new Sajari.Client(this.project, this.collection);
    const tracking = this.constructTracking(this);

    client.searchPipeline(this.pipeline, this.values, tracking, (err, res) => {
      // Discard this result if another (more recent query) has been sent through
      // with a different qid.
      if (this.tracking.qid !== tracking.i) {
        return;
      }

      // Discard this result if another (more recent query) has been sent.
      if (this.tracking.seq >= tracking.s) {
        return;
      }

      if (!res) {
        this.error = err || "No response.";
        if (console && console.error) {
          console.error("got error during search", this.error);
        }
        this.notify(RESULTS_CHANGED);
        return;
      }
      this.error = null;

      this.responseValues = res.values;
      this.results = res.searchResponse;
      this.notify(RESULTS_CHANGED);
    })
  }

  registerListener(type, listener) {
    this.listeners.push({ type, listener })
  }

  unregisterListener(type, listener) {
    this.listeners = this.listeners.filter(l => {
      if (l.type === type && l.listener === listener) {
        return false;
      }
      return true;
    });
  }

  notify(type, ...data) {
    this.listeners.concat(this.proxy.listeners).forEach(l => {
      if (l.type === type) {
        try {
          l.listener(...data);
        } catch (e) {
          if (console && console.error) {
            console.error('error in proxy listener', e);
          }
        }
      }
    });
  }

  getError() {
    return this.error;
  }

  getResults() {
    return this.results;
  }

  getValues() {
    return this.values;
  }

  getResponseValues() {
    return this.responseValues;
  }

  beforeMergingValues(values) {
    // Only if values["q"] is set do we check if the value has changed.
    if (values["q"] !== undefined) {
      let prevQ = this.values["q"] || "";
      let currQ = values["q"];

      // Reset the tracking if the new query differs in prefix to the old.
      if (!currQ.startsWith(prevQ.substr(0, Math.min(currQ.length, 3)))) {
        this.resetTracking();
      }

      // If the query has changed then reset the page, but only if
      // we're not already trying to set it.
      if (currQ !== prevQ && values["page"] === undefined) {
        this.values["page"] = "1";
      }

      // Clear q.used when setting q to be "", but only if we're
      // not also setting q.used.
      if (currQ === "" && values["q.used"] === undefined) {
        delete this.responseValues["q.used"];
      }
    }

    // Only if values["filter"] is set do we check if the value has changed.
    if (values["filter"] !== undefined) {
      let prevFilter = this.values["filter"] || "";
      // Reset the page, but only if we're not already trying
      // to set it.
      if (prevFilter !== values["filter"] && values["page"] === undefined) {
        this.values["page"] = "1";
      }
    }
  }

  setValues(values, runSearch = false) {
    this.beforeMergingValues(values);

    // Merge values into this.values.
    for (let k in values) {
      if (values[k] === undefined || values[k] === null) {
        delete this.values[k];
      } else {
        this.values[k] = values[k];
      }
    }

    if (runSearch) {
      this._runSearch();
    }
    this.notify(VALUES_CHANGED);
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
      n = new state(namespace);
      this._ns[namespace] = n
    }
    return n;
  }
}

const _state = new State();

export { _state as State, TRACKING_RESET, RESULT_CLICKED, RESULTS_CHANGED, VALUES_CHANGED }
