import { Listener } from "./";

export const searchSentEvent = "search-sent";
export const responseUpdatedEvent = "response-updated";
export const resultClickedEvent = "result-clicked";

const events = [searchSentEvent, responseUpdatedEvent, resultClickedEvent];

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
   * Emits a results cleared event to the results cleared event listener.
   * @private
   */
  _emitResponseCleared() {
    this.listeners[responseClearedEvent].notify(listener => {
      listener();
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
   * @param {Sajari.Tracking} tracking Tracking object from sajari package.
   */
  search(values, tracking) {
    const queryValues = values.get();

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
          response.searchResponse,
          response.values
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
   * Returns the current response.
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
   * Returns true if has a current response.
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
   * Returns true if the response is an error.
   * @return {boolean}
   */
  isError() {
    return this.error !== undefined;
  }

  /**
   * Returns error.
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
}

export { Pipeline, Response };
