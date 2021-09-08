/* eslint-disable no-underscore-dangle */
import { isNullOrUndefined, isSSR, isString } from '@sajari/react-sdk-utils';
import { Client } from '@sajari/sdk-js';

import { EVENT_RESPONSE_UPDATED, EVENT_RESULT_CLICKED, EVENT_SEARCH_SENT } from '../events';
import type { ResultValues } from '../types';
import { Analytics, GoogleAnalytics } from './analytics';
import { CallbackFn, Listener, ListenerMap, UnlistenFn } from './Listener';
import { Response } from './Response';
import { ClickTracking, NoTracking, PosNegTracking } from './tracking';

const events = [EVENT_SEARCH_SENT, EVENT_RESPONSE_UPDATED, EVENT_RESULT_CLICKED];

type QueryPipeline = ReturnType<Client['pipeline']>;

type PipelineConfig = {
  account: string;
  collection: string;
  endpoint?: string;
  key?: string;
  secret?: string;
  userAgent?: string;
  clickTokenURL?: string;
};

export class Pipeline {
  public config: PipelineConfig;

  private pipeline: QueryPipeline;

  private client: Client;

  private tracking: ClickTracking | PosNegTracking | NoTracking;

  private listeners: ListenerMap;

  private searchCount: number;

  private response: Response = new Response(null);

  private analytics: Analytics;

  /**
   * Constructs a Pipeline object.
   * @param config Account, Collection config
   * @param name Name of the pipeline.
   * @param tracking Default tracking to use in searches.
   * @param analyticsAdapters
   */
  constructor(
    config: PipelineConfig,
    name: string | { name: string; version?: string },
    tracking: ClickTracking | PosNegTracking | NoTracking = new NoTracking(),
    analyticsAdapters = [GoogleAnalytics],
  ) {
    const { account, collection, endpoint, key, secret } = config;
    this.config = config;

    const p: { name?: string; version?: string } = {
      name: undefined,
      version: undefined,
    };
    if (isString(name)) {
      p.name = name;
    } else if ('name' in name) {
      p.name = name.name;
      p.version = name.version;
    }

    const clientConfig: { [key: string]: string } = {};
    if (!isNullOrUndefined(config.userAgent)) {
      clientConfig.userAgent = config.userAgent;
    }
    if (!isNullOrUndefined(config.clickTokenURL)) {
      clientConfig.clickTokenURL = config.clickTokenURL;
    }

    // Only use key/secret in SSR contexts
    if (isSSR()) {
      this.client = new Client(account, collection, endpoint, key, secret, clientConfig);
    } else {
      this.client = new Client(account, collection, endpoint, undefined, undefined, clientConfig);
    }

    this.pipeline = this.client.pipeline(p.name as string, p.version);
    this.tracking = tracking;
    this.listeners = new Map([
      [EVENT_SEARCH_SENT, new Listener()],
      [EVENT_RESPONSE_UPDATED, new Listener()],
      [EVENT_RESULT_CLICKED, new Listener()],
    ]);
    this.searchCount = 0;
    this.response = new Response(null);

    this.analytics = new Analytics(this, this.tracking);
    analyticsAdapters.forEach((Adapter) => {
      // eslint-disable-next-line no-new
      new Adapter(this.analytics);
    });
  }

  /**
   * Register a listener for a specific event.
   * @param event Event to listen for
   * @param callback Callback to run when the event happens.
   * @return The unregister function to remove the callback from the listener.
   */
  public listen(event: string, callback: CallbackFn): UnlistenFn {
    if (events.indexOf(event) === -1) {
      throw new Error(`Unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Emits a search event to the search event listener.
   * @private
   */
  public _emitSearchSent(variables: { [k: string]: string }): void {
    (this.listeners.get(EVENT_SEARCH_SENT) as Listener).notify((listener) => {
      listener(variables);
    });
  }

  /**
   * Emits a results event to the results event listener.
   * @private
   */
  public _emitResponseUpdated(response: Response): void {
    (this.listeners.get(EVENT_RESPONSE_UPDATED) as Listener).notify((listener) => {
      listener(response);
    });
  }

  /**
   * Emits a result clicked event to the results clicked event listeners.
   * @param args Values to send to the listeners.
   */
  public emitResultClicked(args: { token: string; values: ResultValues }): void {
    (this.listeners.get(EVENT_RESULT_CLICKED) as Listener).notify((listener) => {
      listener(args);
    });
  }

  /**
   * Perform a search.
   * @param variables Key-value parameters to pass to the pipeline.
   */
  public search(variables: { [k: string]: string }): void {
    this.searchCount += 1;
    const currentSearch = this.searchCount;

    this.pipeline
      .search(variables, this.tracking.next(variables))
      .then(([response, responseValues]) => {
        if (currentSearch < this.searchCount) {
          return;
        }

        this.response = new Response(
          null,
          new Map(Object.entries(variables)),
          new Map(Object.entries(response)),
          new Map(Object.entries(responseValues)),
        );
      })
      .catch((error) => {
        // TODO: Should we have a debug option to enable console logging?
        // eslint-disable-next-line no-console
        console.error(error);

        if (currentSearch < this.searchCount) {
          return;
        }

        this.response = new Response(error, new Map(Object.entries(variables)), undefined, undefined);
      })
      .finally(() => {
        this._emitResponseUpdated(this.response);
      });
    this._emitSearchSent(variables);
  }

  /**
   * Clears the error, response, and response variables from this object.
   * @param variables Key-value pair parameters.
   */
  public clearResponse(variables: { [k: string]: string }): void {
    this.tracking.next(variables);
    this.searchCount += 1;
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

  /**
   * The underlying client
   */
  public getClient(): Client {
    return this.client;
  }

  /**
   * The tracking instance
   */
  public getTracking(): ClickTracking | PosNegTracking | NoTracking {
    return this.tracking;
  }
}
