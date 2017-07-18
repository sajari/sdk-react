import Listener from "./listener";

import { postChangeEvent } from "./values";

export const searchEvent = "search";
export const errorEvent = "error";
export const resultsEvent = "results";

class Pipeline {
  constructor(client, name, values, tracking) {
    this.client = client; //.Pipeline(name);
    this.name = name;
    this.values = values;
    this.tracking = tracking;
    this.afterValuesChanged = this.values.listen(postChangeEvent, this.afterValuesChanged.bind(this));
    this.listeners = {
      [searchEvent]: new Listener(),
      [errorEvent]: new Listener(),
      [resultsEvent]: new Listener(),
    }

    this.query = undefined;
    this.error = undefined;
    this.results = undefined;
    this.responseValues = undefined;
  }

  listen(event, callback) {
    if (event !== searchEvent && event !== errorEvent && event !== resultsEvent) {
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

  search() {
    const query = this.values.get();
    this.client.searchPipeline(this.name, query, this.tracking, (error, results, responseValues) => {
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
    this.lastQuery = query;
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
