import { Tracking } from "./sajari";

const changeEvent = "change";
const searchEvent = "search";
const resultsEvent = "results";
const errorEvent = "error";

const defaultOptions = () => {
  const timeout = 2000; // 2 seconds
  const tracking = new Tracking(); // Construct tracking from sajari package
  return { timeout, tracking };
};

class State {
  constructor(client, pipeline, options = {}) {
    this.client = client;
    this.pipeline = pipeline;

    this.listeners = {
      [changeEvent]: [],
      [searchEvent]: [],
      [resultsEvent]: [],
      [errorEvent]: [],
    };

    this.lastResults = null;
    this.querySequence = 0;

    const combinedOptions = Object.assign(defaultOptions(), options); // Needs polyfill
    this.queryTimeout = combinedOptions.timeout;
    this.tracking = combinedOptions.tracking;

    this.state = {
      filters: [],
      values: {}
    };
  }

  getClient() {
    return this.client;
  }

  setClient(client) {
    this.client = client;
  }

  getTracking() {
    return this.tracking;
  }

  setTracking(tracking) {
    this.tracking = tracking;
  }

  listen(event, callback) {
    if (!this.listeners[event]) {
      throw new Error("unknown event type `" + event + "`");
    }
    this.listeners[event].push(callback);
    return () => this.removeListener(event, callback);
  }

  emit(event, data) {
    this.listeners[event].forEach(c => {
      try {
        c(data);
      } catch (e) {
        if (console && console.error) {
          console.error(e);
        }
      }
    });
  }

  removeListener(event, callback) {
    if (!this.listeners[event]) {
      throw new Error("unknown event type`" + event + "`");
    }
    const index = this.listeners[event].indexOf(callback);
    if (index >= 0) {
      this.listeners[event].splice(index, 1);
    }
  }

  removeAllListeners(event) {
    if (!this.listeners[event]) {
      throw new Error("unknown event type`" + event + "`");
    }
    this.listeners[event] = [];
  }

  addFilter(field, operation, value) {
    this.state.filters.push({ field, operation, value });
    this.emit(changeEvent, this.getState());
    return () => this.removeFilter(field, operation, value);
  }

  removeFilter(field, operation, value) {
    this.state.filters = this.state.filters.filter(f => {
      if (
        (f.field === field) &&
        (operation ? f.operation === operation : true) &&
        (value ? f.value === value : true)
      ) {
        return false;
      }
      return true;
    });
    this.emit(changeEvent, this.getState());
  }

  setValue(name, value) {
    this.state.values[name] = value;
    this.emit(changeEvent, this.getState());
  }

  clearValue(name) {
    delete this.state.values[name];
    this.emit(changeEvent, this.getState());
  }

  clearValues() {
    this.values = {};
  }

  getValue(name, value) {
    return this.state.values[name];
  }

  getState() {
    return this.state;
  }

  getQuery() {
    return this.state;
  }

  search() {
    this.emit(searchEvent, { state: this.getState(), lastResults: this.lastResults });
    const tracking = this.tracking;
    const currentSequence = this.querySequence + 1;
    this.querySequence++;
    if (this.lastRequest) {
      this.lastRequest.abort();
    }
    const request = this.client.search(this.state.values, tracking, (err, res, pipelineValues) => {
      // Discard this result if another (more recent query) has been sent through
      // with a different qid.
      // if (this.tracking.qid !== tracking.i) {
      //   return;
      // }

      // // Discard this result if another (more recent query) has been sent.
      if (this.querySequence > currentSequence) {
        return;
      }

      // if (!res) {
      //   this.error = err || "No response.";
      //   if (console && console.error) {
      //     console.error("got error during search", this.error);
      //   }
      //   this.notify(RESULTS_CHANGED);
      //   return;
      // }
      // this.error = null;

      // this.responseValues = res.values;
      // this.results = res.searchResponse;
      // this.notify(RESULTS_CHANGED);
      if (err) {
        this.emit(errorEvent, err);
        return
      }
      this.emit(resultsEvent, res);
      this.lastResults = res;
    });
    this.lastRequest = request;
    setTimeout(() => {
      request.abort();
    }, this.queryTimeout);
    return this.lastRequest;
  }
}

export default State;