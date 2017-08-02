import { Client, Tracking } from "sajari";

import { Listener, ClickTracking } from "./";

export const searchSentEvent = "search-sent";
export const responseUpdatedEvent = "response-updated";
export const resultClickedEvent = "result-clicked";

const events = [searchSentEvent, responseUpdatedEvent, resultClickedEvent];

class Pipeline {
  /**
   * Constructs a Pipeline object.
   * @param {string} project Name of the project
   * @param {string} collection Name of the collection
   * @param {string} name Name of the pipeline.
   * @param {Tracking|undefined} [tracking=ClickTracking()] Default tracking to use in searches.
   */
  constructor(project, collection, name, tracking = new ClickTracking()) {
    /** @private */
    this.client = new Client(project, collection);
    /** @private */
    this.name = name;
    /** @private */
    this.tracking = tracking;
    /** @private */
    this.listeners = {
      [searchSentEvent]: new Listener(),
      [responseUpdatedEvent]: new Listener(),
      [resultClickedEvent]: new Listener()
    };
    /** @private */
    this.searchCount = 0;
    /** @private */
    this.response = new Response();
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
   * Emits a search event to the search event listener.
   * @private
   */
  _emitSearchSent(queryValues) {
    this.listeners[searchSentEvent].notify(listener => {
      listener(queryValues);
    });
  }

  /**
   * Emits a results event to the results event listener.
   * @private
   */
  _emitResponseUpdated(response) {
    this.listeners[responseUpdatedEvent].notify(listener => {
      listener(response);
    });
  }

  /**
   * Emits a result clicked event to the results clicked event listeners.
   * @param {*} value Value to send to the listeners.
   */
  emitResultClicked(value) {
    this.listeners[resultClickedEvent].notify(listener => {
      listener(value);
    });
  }

  /**
   * Perform a search.
   * @param {Values} values Values object.
   */
  search(values) {
    const queryValues = values.get();
    const tracking = this.tracking.tracking(queryValues);

    this.searchCount++;
    const currentSearch = this.searchCount;

    this.client.searchPipeline(
      this.name,
      queryValues,
      tracking,
      (error, response = {}) => {
        if (currentSearch < this.searchCount) {
          return;
        }
        this.response = new Response(
          error ? error : undefined,
          queryValues,
          response ? response.searchResponse : undefined,
          response ? response.values : undefined
        );
        this._emitResponseUpdated(this.response);
      }
    );
    this._emitSearchSent(queryValues);
  }

  /**
   * Clears the error, response, and response values from this object.
   */
  clearResponse() {
    this.response = new Response();
    this._emitResponseUpdated(this.response);
  }

  /**
   * The current response.
   * @return {Response}
   */
  getResponse() {
    return this.response;
  }
}

class Response {
  /**
   * Constructs a Response object.
   * @param {*} error
   * @param {*} queryValues
   * @param {*} response
   * @param {*} values
   */
  constructor(error, queryValues, response, values) {
    /** @private */
    this.error = error;
    /** @private */
    this.queryValues = queryValues;
    /** @private */
    this.response = response;
    /** @private */
    this.values = values;
  }

  /**
   * Is this response empty?
   * @return {boolean}
   */
  isEmpty() {
    return (
      this.error === undefined &&
      this.response === undefined &&
      this.values === undefined &&
      this.queryValues === undefined
    );
  }

  /**
   * Is this response an error?
   * @return {boolean}
   */
  isError() {
    return this.error !== undefined;
  }

  /**
   * The error associated with this response.
   * @return {string|undefined}
   */
  getError() {
    return this.error;
  }

  /**
   * Return the query values used in the search which created this response.
   * @return {Object|undefined}
   */
  getQueryValues() {
    return this.queryValues;
  }

  /**
   * Returns the response, which includes results and aggregates etc.
   * @return {Object|undefined}
   */
  getResponse() {
    return this.response;
  }

  /**
   * Return the pipeline values returned by the search.
   * @return {Object|undefined}
   */
  getValues() {
    return this.values;
  }

  /**
   * Return results from the response.
   * @return {Object|undefined}
   */
  getResults() {
    return this.response !== undefined ? this.response.results : undefined;
  }

  /**
   * Return the total number of results.
   * @return {number|undefined}
   */
  getTotalResults() {
    return this.response !== undefined
      ? parseInt(this.response.totalResults, 10)
      : undefined;
  }

  /**
   * Return time from the response.
   * @return {string|undefined}
   */
  getTime() {
    return this.response !== undefined ? this.response.time : undefined;
  }

  /**
   * Return the aggregates in the response.
   * @return {Object|undefined}
   */
  getAggregates() {
    if (this.response === undefined || this.response.aggregates === undefined) {
      return undefined;
    }
    return this.response.aggregates;
  }
}

export { Pipeline, Response };
