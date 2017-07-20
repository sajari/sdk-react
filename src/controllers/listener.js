class Listener {

  constructor() {
    this.listeners = [];
  }

  listen(callback) {
    this.listeners.push(callback);
    return () => this.unlisten(callback);
  }

  unlisten(callback) {
    const index = this.listeners.indexOf(callback);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

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
