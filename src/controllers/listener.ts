export type CallbackFn = (...args: any[]) => void;
export type UnlistenFn = () => void;

export type ListenerMap = Map<string, Listener>;

export class Listener {
  private listeners: CallbackFn[];

  /**
   * Constructs a listener object.
   */
  constructor() {
    this.listeners = [];
  }

  /**
   * Adds a callback to the listener.
   * Returns a function that will unregister the callback from the listener when called.
   * @param callback The callback to be registered.
   * @return The unregister function to remove the callback from the listener.
   */
  listen(callback: CallbackFn): UnlistenFn {
    this.listeners.push(callback);
    return () => this.unlisten(callback);
  }

  /**
   * Removes a callback from the listener.
   */
  unlisten(callback: CallbackFn) {
    const index = this.listeners.indexOf(callback);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Notify takes a function and calls it for every listener.
   * The listener is supplied as the first argument to the function.
   * @param {function(callback: Function)} fn Function to call each of the callbacks in the listener with.
   */
  notify(fn: (callback: CallbackFn) => void) {
    this.listeners.forEach((l) => {
      try {
        fn(l);
      } catch (e) {
        // eslint-disable-next-line no-console
        if (console && console.error) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    });
  }
}
