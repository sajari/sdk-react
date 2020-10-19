/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import { Client } from '@sajari/sdk-js';

import { EVENT_RESPONSE_UPDATED, EVENT_RESULT_CLICKED, EVENT_SEARCH_SENT } from '../events';
import { Analytics, GoogleAnalytics } from './analytics';
import { CallbackFn, Listener, ListenerMap } from './listener';
import { Response } from './response';
import { ClickTracking, NoTracking } from './tracking';

const events = [EVENT_SEARCH_SENT, EVENT_RESPONSE_UPDATED, EVENT_RESULT_CLICKED];

type QueryPipeline = ReturnType<Client['pipeline']>;

export class Pipeline {
  public config: {
    project: string;
    collection: string;
    endpoint?: string;
  };

  private pipeline: QueryPipeline;

  private name: string;

  private version?: string;

  private tracking: ClickTracking | NoTracking;

  private listeners: ListenerMap;

  private searchCount: number;

  private response: Response = new Response(null);

  private analytics: Analytics;

  /**
   * Constructs a Pipeline object.
   * @param config Project, Collection config
   * @param name Name of the pipeline.
   * @param [tracking=ClickTracking()] Default tracking to use in searches.
   * @param [analyticsAdapters=GoogleAnalytics]
   */
  constructor(
    config: {
      project: string;
      collection: string;
      endpoint?: string;
    },
    name: string | { name: string; version?: string },
    tracking: ClickTracking | NoTracking = new NoTracking(),
    analyticsAdapters = [GoogleAnalytics],
  ) {
    const { project, collection, endpoint } = config;
    this.config = config;
    // TODO: v0.x import { withEndpoint } from '@sajari/sdk-js';
    // need to check with Ben/look up v0.x code to see why the method has been removed and what is the alternative
    // const opts = endpoint !== undefined ? [withEndpoint(endpoint)] : [];
    // const opts = [];

    const p: { name?: string; version?: string } = {
      name: undefined,
      version: undefined,
    };
    if (typeof name === 'string') {
      p.name = name;
    } else if ('name' in name) {
      p.name = name.name;
      p.version = name.version;
    }

    // this.pipeline = new Client(project, collection, opts).pipeline(p.name as string, p.version);
    this.pipeline = new Client(project, collection, endpoint).pipeline(p.name as string, p.version);
    this.name = p.name as string;
    this.version = p.version;
    // FIXME: this is causing a bad request due to no defined clientTracking
    // this.tracking = tracking;
    this.listeners = new Map([
      [EVENT_SEARCH_SENT, new Listener()],
      [EVENT_RESPONSE_UPDATED, new Listener()],
      [EVENT_RESULT_CLICKED, new Listener()],
    ]);
    this.searchCount = 0;
    this.response = new Response(null);

    // FIXME: this is causing a bad request due to no defined clientTracking
    // this.analytics = new Analytics(this, this.tracking);
    // analyticsAdapters.forEach((Adapter) => {
    //   // eslint-disable-next-line no-new
    //   new Adapter(this.analytics);
    // });
  }

  /**
   * Register a listener for a specific event.
   * @param event Event to listen for
   * @param callback Callback to run when the event happens.
   * @return The unregister function to remove the callback from the listener.
   */
  public listen(event: string, callback: CallbackFn) {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Emits a search event to the search event listener.
   * @private
   */
  public _emitSearchSent(values: { [k: string]: string }) {
    (this.listeners.get(EVENT_SEARCH_SENT) as Listener).notify((listener) => {
      listener(values);
    });
  }

  /**
   * Emits a results event to the results event listener.
   * @private
   */
  public _emitResponseUpdated(response: Response) {
    (this.listeners.get(EVENT_RESPONSE_UPDATED) as Listener).notify((listener) => {
      listener(response);
    });
  }

  /**
   * Emits a result clicked event to the results clicked event listeners.
   * @param value Value to send to the listeners.
   */
  public emitResultClicked(value: string) {
    (this.listeners.get(EVENT_RESULT_CLICKED) as Listener).notify((listener) => {
      listener(value);
    });
  }

  /**
   * Perform a search.
   * @param values Key-value parameters to pass to the pipeline.
   */
  public search(values: { [k: string]: string }) {
    this.searchCount++;
    const currentSearch = this.searchCount;

    this.pipeline
      // TODO: check why tracking type doesn't match
      // @ts-ignore
      .search(values, this.tracking)
      .then(([response, responseValues]) => {
        if (currentSearch < this.searchCount) {
          return;
        }

        this.response = new Response(
          null,
          new Map(Object.entries(values)),
          new Map(Object.entries(response)),
          new Map(Object.entries(responseValues)),
        );

        this._emitResponseUpdated(this.response);
      })
      .catch((error) => {
        console.error(error);
        if (currentSearch < this.searchCount) {
          return;
        }

        this.response = new Response(null, new Map(Object.entries(values)), undefined, undefined);
      });
    this._emitSearchSent(values);
  }

  /**
   * Clears the error, response, and response values from this object.
   * @param values Key-value pair parameters.
   */
  public clearResponse(values: { [k: string]: string }) {
    this.tracking.next(values);

    this.searchCount++;
    this.response = new Response(null);
    this._emitResponseUpdated(this.response);
  }

  /**
   * The current response.
   */
  public getResponse(): Response {
    return this.response;
  }

  /**
   * The analytics adaptor connected to this pipeline.
   */
  public getAnalytics(): Analytics {
    return this.analytics;
  }
}
