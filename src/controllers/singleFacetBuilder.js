import Listener from "./listener";

class SingleFacetBuilder {
  constructor(options, start = undefined) {
    this.current = start;
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
      this.current = name;
    } else {
      this.current = undefined;
    }
    this.notify();
  }

  isSet(name) {
    return this.current === name;
  }

  get() {
    return this.current;
  }

  filter() {
    if (this.current) {
      return this.options[this.current];
    }
    return "";
  }
}

export default SingleFacetBuilder;
