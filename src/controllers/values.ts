import { EVENT_VALUES_UPDATED } from "../events";
import { Listener, ListenerMap } from "./listener";

export type ValueFn = () => string;
export type ValuesMap = Map<string, string | ValueFn>;

export class Values {
  private values: ValuesMap;
  private listeners: ListenerMap;

  /**
   * Constructor for Values object.
   * @param {Object} values Initial values.
   */
  constructor(values: { [k: string]: string | ValueFn } = {}) {
    this.listeners = new Map([[EVENT_VALUES_UPDATED, new Listener()]]);
    this.values = new Map(Object.entries(values));
  }

  /**
   * Register a listener for a specific event.
   * @param {string} event Event to listen for
   * @param {Function} callback Callback to run when the event happens.
   */
  public listen(event: string, callback: () => void) {
    if (event !== EVENT_VALUES_UPDATED) {
      throw new Error(`unknown event type "${event}"`);
    }
    return (this.listeners.get(event) as Listener).listen(callback);
  }

  /**
   * Emits an event to notify listener that the values have been updated.
   *
   * @private
   */
  public _emitUpdated() {
    (this.listeners.get(EVENT_VALUES_UPDATED) as Listener).notify(listener =>
      listener()
    );
  }

  /**
   * Sets values without triggering an event, internal use only.
   */
  private _set(values: { [k: string]: string | ValueFn | undefined }) {
    Object.keys(values).forEach(key => {
      if (values[key] === undefined) {
        this.values.delete(key);
      } else {
        this.values.set(key, values[key] as string | ValueFn);
      }
    });
  }

  /**
   * Merge values into the value map.
   *
   * Set a value to undefined to remove it.
   */
  public set(values: { [k: string]: string | ValueFn }) {
    this._set(values);
    this._emitUpdated();
  }

  /**
   * get returns the current values.
   */
  public get(): { [k: string]: string } {
    const values = {} as { [k: string]: string };

    this.values.forEach((value, key) => {
      if (typeof value === "function") {
        values[key] = (value as ValueFn)();
      } else {
        values[key] = value as string;
      }
    });
    return values;
  }
}
