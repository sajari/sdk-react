import Listener from "./listener";

import { postChangeEvent } from "./values";

export const searchEvent = "search";
export const errorEvent = "error";
export const resultsEvent = "results";
export const resultClickedEvent = "result-clicked";
export const trackingResetEvent = "tracking-reset";

const events = [
  searchEvent,
  errorEvent,
  resultsEvent,
  resultClickedEvent,
  trackingResetEvent,
];

class Pipeline {
  constructor(client, name, values, tracking) {
    this.client = client;
    this.name = name;
    this.values = values;
    this.tracking = tracking;
    this.afterValuesChanged = this.values.listen(postChangeEvent, this.afterValuesChanged.bind(this));
    this.listeners = {
      [searchEvent]: new Listener(),
      [errorEvent]: new Listener(),
      [resultsEvent]: new Listener(),
      [resultClickedEvent]: new Listener(),
      [trackingResetEvent]: new Listener(),
    }
    this.searchCount = 0;

    this.query = undefined;
    this.error = undefined;
    this.results = undefined;
    this.responseValues = undefined;
  }

  listen(event, callback) {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  _emitError() {
    this.listeners[errorEvent].notify(listener => {
      listener(this.error);
    });
  }

  _emitSearch() {
    this.listeners[searchEvent].notify(listener => {
      listener(this.query);
    });
  }

  _emitResults() {
    this.listeners[resultsEvent].notify(listener => {
      listener(this.results, this.responseValues);
    });
  }

  emitResultClicked(value) {
    this.listeners[resultClickedEvent].notify(listener => {
      listener(value);
    });
  }

  emitTrackingReset() {
    this.listeners[trackingResetEvent].notify(listener => {
      listener();
    });
  }

  search(values = undefined, tracking = undefined) {
    const queryValues = (values || this.values).get();
    const queryTracking = tracking || this.tracking;
    this.searchCount++;
    const currentSearch = this.searchCount;
    this.client.searchPipeline(this.name, queryValues, queryTracking, (error, results = {}, responseValues = {}) => {
      if (currentSearch < this.searchCount) {
        return;
      }

      if (error) {
        this.error = error;
        this.results = undefined;
        this.responseValues = undefined;
        this._emitError();
        return;
      }
      this.error = undefined;
      this.results = results.searchResponse;
      this.responseValues = results.values;
      this._emitResults();
    });
    this.lastQuery = queryValues;
    this._emitSearch();
  }

  afterValuesChanged() {}

  getError() {
    return this.error;
  }

  getResults() {
    return this.results;
  }

  getResponseValues() {
    return this.responseValues;
  }

  clearResults() {
    this.error = undefined;
    this.results = undefined;
    this.responseValues = undefined;
    this._emitResults();
  }
}

export default Pipeline;
