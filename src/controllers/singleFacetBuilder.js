import Listener from "./listener";

class SingleFacetBuilder {
  constructor(options, start = undefined) {
    this.active = start;
    this.options = options;
    this.listener = new Listener();
  }

  register(listener) {
    return this.listener.listen(listener);
  }

  notify() {
    this.listener.notify(l => {
      l(this);
    });
  }

  set(name) {
    if (name) {
      this.active = name;
    } else {
      this.active = undefined;
    }
    this.notify();
  }

  isSet(name) {
    return this.active === name;
  }

  getActive() {
    return this.active;
  }
}

export default SingleFacetBuilder;
