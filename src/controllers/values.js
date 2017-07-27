import { Listener } from "./";

export const valuesChangedEvent = "values-changed";

class Values {
  /**
   * Constructor for Values object.
   */
  constructor() {
    this.listeners = {
      [valuesChangedEvent]: new Listener()
    };
    this.values = {};
  }

  /**
   * Register a listener for a specific event.
   * @param {string} event Event to listen for
   * @param {Function} callback Callback to run when the event happens.
   */
  listen(event, callback) {
    if (event !== valuesChangedEvent) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  /**
   * Emits a change event.
   * Use to notify listeners that a value has changed.
   * Manually trigger this if have a value that is a function whos contents will change.
   * @param {Object} values
   */
  emitChange(values = {}) {
    this.listeners[valuesChangedEvent].notify(listener => {
      listener(values, this._set.bind(this));
    });
  }

  /**
   * Sets values without triggering an event, internal use only.
   * @param {Object} values
   */
  _set(values) {
    Object.keys(values).forEach(k => {
      if (values[k] === undefined) {
        delete this.values[k];
      } else {
        this.values[k] = values[k];
      }
    });
  }

  /**
   * Merge values into the value map.
   *
   * Set a value to undefined to remove it.
   *
   * @param {Object} values
   */
  set(values) {
    this._set(values);
    this.emitChange(values);
  }

  /**
   * getValues returns the current values.
   */
  get() {
    const values = {};
    Object.keys(this.values).forEach(k => {
      if (typeof this.values[k] === "function") {
        values[k] = this.values[k]();
      } else {
        values[k] = this.values[k];
      }
    });
    return values;
  }
}

export default Values;
