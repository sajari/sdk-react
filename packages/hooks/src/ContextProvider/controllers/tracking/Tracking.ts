/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { isEmptyObject } from '@sajari/react-sdk-utils';
import { Banner, Client, RedirectTarget, Session, Token } from '@sajari/sdk-js';

import { EVENT_TRACKING_RESET } from '../../events';
import { ResultClickedFn, ResultValues } from '../../types';
import { CallbackFn, Listener, ListenerMap, UnlistenFn } from '../Listener';
import { Response } from '../Response';

const events = [EVENT_TRACKING_RESET];

export type TrackingValues = Record<string, string>;

export class Tracking {
  public clientTracking: Session | null = null;

  private listeners: ListenerMap;

  protected client: Client;

  public handleResultClicked: ResultClickedFn;

  constructor(protected readonly field: string) {
    this.listeners = new Map(
      Object.entries({
        [EVENT_TRACKING_RESET]: new Listener(),
      }),
    );
  }

  public bootstrap(client: Client, handleResultClicked: ResultClickedFn) {
    this.client = this.client ?? client;
    this.handleResultClicked = handleResultClicked;
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
   * Emits a tracking reset event to the tracking reset event listener.
   */
  private emitTrackingReset(values: TrackingValues) {
    (this.listeners.get(EVENT_TRACKING_RESET) as Listener).notify((listener) => {
      listener(values);
    });
  }

  /**
   * Reset the tracking.
   * @param variables Key-value pair parameters to use in the pipeline.
   */
  public reset(variables?: TrackingValues) {
    (this.clientTracking as Session).reset();

    if (variables !== undefined) {
      // eslint-disable-next-line no-underscore-dangle
      this.emitTrackingReset(variables);
    }
  }

  /**
   * Construct a tracking session to be used in a search.
   * @param variables Key-value pair parameters to use in the pipeline.
   */
  public next(variables: TrackingValues) {
    if (this.clientTracking === null) {
      throw new Error('clientTracking is null');
    }

    return this.clientTracking.next(variables);
  }

  protected getMetadata(): Record<string, string> | undefined {
    const metadata = this.next({}).data;
    return !isEmptyObject(metadata) ? metadata : undefined;
  }

  public onQueryResponse(response: Response) {}

  public onResultClick(values: ResultValues, token?: Token) {}

  public onPromotionClick(banner: Banner) {}

  public onRedirect(redirect: RedirectTarget) {}

  public getResultHref({ url }: ResultValues, token?: Token): string {
    return url;
  }
}
