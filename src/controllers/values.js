import Listener from "./listener";

export const changeEvent = "change";
export const postChangeEvent = "post-change";

class Values {
  constructor() {
    this.listeners = {
      [changeEvent]: new Listener(),
      [postChangeEvent]: new Listener(),
    };
    this.values = {};
  }

  listen(event, callback) {
    if (event !== changeEvent && event !== postChangeEvent) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  emitChange(values = {}) {
    this.listeners[changeEvent].notify(listener => {
      listener(values, this._set.bind(this));
    });

    this.listeners[postChangeEvent].notify(listener => {
      listener(values);
    });
  }

  /**
   * Sets values without triggering an event, internal use only.
   * @param {*dict} values
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
   * Assigns multiple values to the values.
   *
   * Set a value to undefined to remove it.
   *
   * @param {*dict} values
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
