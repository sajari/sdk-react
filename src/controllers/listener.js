class Listener {
  /**
   * Constructs a listener object.
   */
  constructor() {
    this.listeners = [];
  }

  /**
   * Adds a callback to the listener.
   * Returns a function that will unregister the callback from the listener when called.
   * @param {Function} callback
   * @return {Function}
   */
  listen(callback) {
    this.listeners.push(callback);
    return () => this.unlisten(callback);
  }

  /**
   * Removes a callback from the listener.
   * @param {Function} callback
   */
  unlisten(callback) {
    const index = this.listeners.indexOf(callback);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Notify takes a function and calls it for every listener.
   * The listener is supplied as the first argument to the function.
   * @param {Function} f Function to call each of the callbacks in the listener with.
   */
  notify(f) {
    this.listeners.forEach(l => {
      try {
        f(l);
      } catch (e) {
        if (console && console.error) {
          console.error(e);
        }
      }
    });
  }
}

export default Listener;
