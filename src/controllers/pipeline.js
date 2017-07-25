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
  /**
   * Constructs a Pipeline object.
   * @param {Client} client Client instance from sajari package.
   * @param {string} name Name of the pipeline.
   */
  constructor(client, name) {
    this.client = client;
    this.name = name;
    this.listeners = {
      [searchEvent]: new Listener(),
      [errorEvent]: new Listener(),
      [resultsEvent]: new Listener(),
      [resultClickedEvent]: new Listener(),
      [trackingResetEvent]: new Listener(),
    }
    this.searchCount = 0;

    this.queryValues = undefined;
    this.error = undefined;
    this.results = undefined;
    this.responseValues = undefined;
  }

  /**
   * Register a listener for a specific event.
   * @param {string} event Event to listen for
   * @param {Function} callback Callback to run when the event happens.
   */
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
      listener(this.queryValues);
    });
  }

  _emitResults() {
    this.listeners[resultsEvent].notify(listener => {
      listener(this.results, this.responseValues);
    });
  }

  /**
   * Emits a result clicked event.
   * @param {Object} values
   */
  emitResultClicked(value) {
    this.listeners[resultClickedEvent].notify(listener => {
      listener(value);
    });
  }

  /**
   * Emits a tracking reset event.
   * @param {Object} values
   */
  emitTrackingReset() {
    this.listeners[trackingResetEvent].notify(listener => {
      listener();
    });
  }

  /**
   * Perform a search.
   * @param {Values} values Values object.
   * @param {Tracking} tracking Tracking object from sajari package.
   */
  search(values, tracking) {
    this.queryValues = values.get();
    this.searchCount++;
    const currentSearch = this.searchCount;
    this.client.searchPipeline(this.name, this.queryValues, tracking, (error, results = {}, responseValues = {}) => {
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
    this._emitSearch();
  }

  /**
   * Returns the current error.
   * @return {string|undefined}
   */
  getError() {
    return this.error;
  }

  /**
   * Returns the results.
   * @return {Object}
   */
  getResults() {
    return this.results;
  }

  /**
   * Return the pipeline values returned by the search.
   * @return {Object}
   */
  getResponseValues() {
    return this.responseValues;
  }

  /**
   * Return the last values used in a search.
   * @return {Object}
   */
  getQueryValues() {
    return this.queryValues;
  }

  /**
   * Clears the error, results, and response values from this object.
   */
  clearResults() {
    this.error = undefined;
    this.results = undefined;
    this.responseValues = undefined;
    this._emitResults();
  }
}

export default Pipeline;
