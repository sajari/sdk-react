import { Listener, postChangeEvent } from "./";

export const searchEvent = "search";
export const errorEvent = "error";
export const resultsEvent = "results";

const events = [searchEvent, errorEvent, resultsEvent];

class Pipeline {
  /**
   * Constructs a Pipeline object.
   * @param {Sajari.Client} client Client instance from sajari package.
   * @param {string} name Name of the pipeline.
   */
  constructor(client, name) {
    /** @private */
    this.client = client;
    /** @private */
    this.name = name;
    /** @private */
    this.listeners = {
      [searchEvent]: new Listener(),
      [errorEvent]: new Listener(),
      [resultsEvent]: new Listener()
    };
    /** @private */
    this.searchCount = 0;

    /** @private */
    this.queryValues = undefined;
    /** @private */
    this.error = undefined;
    /** @private */
    this.results = undefined;
    /** @private */
    this.responseValues = undefined;
  }

  /**
   * Register a listener for a specific event.
   * @param {string} event Event to listen for
   * @param {function()} callback Callback to run when the event happens.
   * @return {function()} The unregister function to remove the callback from the listener.
   */
  listen(event, callback) {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  /**
   * Emits an error event to the error event listener.
   * @private
   */
  _emitError() {
    this.listeners[errorEvent].notify(listener => {
      listener(this.error);
    });
  }

  /**
   * Emits a search event to the search event listener.
   * @private
   */
  _emitSearch() {
    this.listeners[searchEvent].notify(listener => {
      listener(this.queryValues);
    });
  }

  /**
   * Emits a results event to the results event listener.
   * @private
   */
  _emitResults() {
    this.listeners[resultsEvent].notify(listener => {
      listener(this.results, this.responseValues);
    });
  }

  /**
   * Perform a search.
   * @param {Values} values Values object.
   * @param {Sajari.Tracking} tracking Tracking object from sajari package.
   */
  search(values, tracking) {
    this.queryValues = values.get();
    this.searchCount++;
    const currentSearch = this.searchCount;
    this.client.searchPipeline(
      this.name,
      this.queryValues,
      tracking,
      (error, results = {}, responseValues = {}) => {
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
      }
    );
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
   * @return {Object|undefined}
   */
  getResults() {
    return this.results;
  }

  /**
   * Return the pipeline values returned by the search.
   * @return {Object|undefined}
   */
  getResponseValues() {
    return this.responseValues;
  }

  /**
   * Return the last values used in a search.
   * @return {Object|undefined}
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
