// @ts-ignore: module missing defintion file
import { Client } from "sajari";

import {
  EVENT_RESPONSE_UPDATED,
  EVENT_RESULT_CLICKED,
  EVENT_SEARCH_SENT
} from "../events";

import { Analytics, DebugAnalytics, GoogleAnalytics } from "./analytics";
import { CallbackFn, Listener, ListenerMap } from "./listener";
import { Response } from "./response";
import { ClickTracking, NoTracking } from "./tracking";

const events = [
  EVENT_SEARCH_SENT,
  EVENT_RESPONSE_UPDATED,
  EVENT_RESULT_CLICKED
];

export class Pipeline {
  private client: Client;
  private name: string;
  private tracking: ClickTracking | NoTracking;
  private listeners: ListenerMap;
  private searchCount: number;
  private response: Response;
  private analytics: Analytics;

  /**
   * Constructs a Pipeline object.
   * @param project Name of the project
   * @param collection Name of the collection
   * @param name Name of the pipeline.
   * @param [tracking=ClickTracking()] Default tracking to use in searches.
   * @param [analyticsAdapters=GoogleAnalytics]
   */
  constructor(
    project: string,
    collection: string,
    name: string,
    tracking = new ClickTracking(),
    analyticsAdapters = [GoogleAnalytics]
  ) {
    this.client = new Client(project, collection).pipeline(name);
    this.name = name;
    this.tracking = tracking;
    this.listeners = new Map([
      [EVENT_SEARCH_SENT, new Listener()],
      [EVENT_RESPONSE_UPDATED, new Listener()],
      [EVENT_RESULT_CLICKED, new Listener()]
    ]);
    this.searchCount = 0;
    this.response = new Response();
    this.analytics = new Analytics(this, this.tracking);
    analyticsAdapters.forEach(Adapter => {
      new Adapter(this.analytics);
    });
  }

  /**
   * Register a listener for a specific event.
   * @param event Event to listen for
   * @param callback Callback to run when the event happens.
   * @return The unregister function to remove the callback from the listener.
   */
  listen(event: string, callback: CallbackFn) {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Emits a search event to the search event listener.
   * @private
   */
  _emitSearchSent(values: { [k: string]: string }) {
    (this.listeners.get(EVENT_SEARCH_SENT) as Listener).notify(listener => {
      listener(values);
    });
  }

  /**
   * Emits a results event to the results event listener.
   * @private
   */
  _emitResponseUpdated(response: Response) {
    (this.listeners.get(EVENT_RESPONSE_UPDATED) as Listener).notify(
      listener => {
        listener(response);
      }
    );
  }

  /**
   * Emits a result clicked event to the results clicked event listeners.
   * @param value Value to send to the listeners.
   */
  emitResultClicked(value: string) {
    (this.listeners.get(EVENT_RESULT_CLICKED) as Listener).notify(listener => {
      listener(value);
    });
  }

  /**
   * Perform a search.
   * @param values Key-value parameters to pass to the pipeline.
   */
  search(values: { [k: string]: string }) {
    this.searchCount++;
    const currentSearch = this.searchCount;

    this.client.search(
      values,
      this.tracking.clientTracking,
      (error: Error, results = {}, responseValues = {}) => {
        if (currentSearch < this.searchCount) {
          return;
        }

        this.response = new Response(
          error ? error : undefined,
          new Map(Object.entries(values)),
          new Map(Object.entries(results)),
          new Map(Object.entries(responseValues))
        );
        // eslint-disable-next-line no-console
        if (error && console && console.error) {
          console.error(error); // eslint-disable-line no-console
        }
        this._emitResponseUpdated(this.response);
      }
    );
    this._emitSearchSent(values);
  }

  /**
   * Clears the error, response, and response values from this object.
   * @param values Key-value pair parameters.
   */
  clearResponse(values: { [k: string]: string }) {
    this.tracking.next(values);

    this.searchCount++;
    this.response = new Response();
    this._emitResponseUpdated(this.response);
  }

  /**
   * The current response.
   */
  getResponse(): Response {
    return this.response;
  }

  /**
   * The analytics adaptor connected to this pipeline.
   */
  getAnalytics(): Analytics | GoogleAnalytics | DebugAnalytics {
    return this.analytics;
  }
}
