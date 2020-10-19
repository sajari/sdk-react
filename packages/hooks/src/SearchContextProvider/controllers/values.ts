/* eslint-disable no-underscore-dangle */
import { EVENT_VALUES_UPDATED } from '../events';
import { Listener, ListenerMap } from './listener';

export type ValueFn = () => string;
export type ValuesMap = Map<string, string | string[] | number | boolean | ValueFn>;
export interface ValuesObject {
  [k: string]: string | string[] | number | boolean | ValueFn | undefined;
}
export type CallbackFn = (values: ValuesObject, set: (values: ValuesObject) => void) => void;

export class Values {
  private values: ValuesMap;

  private listeners: ListenerMap;

  /**
   * Constructor for Values object.
   * @param values Initial values.
   */
  constructor(values: { [k: string]: string | string[] | number | boolean | ValueFn } = {}) {
    this.listeners = new Map([[EVENT_VALUES_UPDATED, new Listener()]]);
    this.values = new Map(Object.entries(values));
  }

  /**
   * Register a listener for a specific event.
   * @param event Event to listen for
   * @param callback Callback to run when the event happens.
   */
  public listen(event: string, callback: CallbackFn) {
    if (event !== EVENT_VALUES_UPDATED) {
      throw new Error(`unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Merge values into the value map.
   *
   * Set a value to undefined to remove it.
   */
  public set(values: ValuesObject) {
    this._set(values);
    this._emitUpdated(values);
  }

  /**
   * get returns the current values.
   */
  public get(): { [k: string]: string } {
    const values = {} as { [k: string]: string };

    this.values.forEach((value, key) => {
      if (typeof value === 'function') {
        values[key] = (value as ValueFn)();
      } else if (Array.isArray(value)) {
        values[key] = (value as string[]).join(',');
      } else {
        values[key] = String(value);
      }
    });
    return values;
  }

  /**
   * Emits an event to notify listener that the values have been updated.
   *
   * @private
   */
  private _emitUpdated(changes: ValuesObject) {
    (this.listeners.get(EVENT_VALUES_UPDATED) as Listener).notify((listener) =>
      listener(changes, (values: ValuesObject) => this._set(values)),
    );
  }

  /**
   * Sets values without triggering an event, internal use only.
   */
  private _set(values: ValuesObject) {
    Object.keys(values).forEach((key) => {
      if (values[key] === undefined) {
        this.values.delete(key);
      } else {
        this.values.set(key, values[key] as string | ValueFn);
      }
    });
  }
}
