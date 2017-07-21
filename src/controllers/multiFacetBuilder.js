import Listener from "./listener";

class MultiFacetBuilder {
  constructor(options, start = []) {
    this.active = start;
    this.options = options;
    this.listener = new Listener();
  }

  register(listener) {
    return this.listener.listen(listener);
  }

  notify() {
    this.listener.notify(l => {
      const active = this.active;
      const activeFilter = active ? this.options[active] : undefined;
      l(active, activeFilter);
    });
  }

  set(name, active) {
    if (active) {
      this.active = this.active.concat(name);
    } else {
      this.active = this.active.filter(n => n !== active);;
    }
    this.notify();
  }

  isSet(name) {
    return this.active.indexOf(name) !== -1;
  }
}

export default MultiFacetBuilder;
