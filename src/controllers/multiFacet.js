import Listener from "./listener";

class MultiFacet {
  constructor(options, start = [], joinOperator = "OR") {
    this.current = start;
    this.options = options;
    this.joinOperator = joinOperator;
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

  set(name, on) {
    if (on) {
      this.current = this.current.concat(name);
    } else {
      this.current = this.current.filter(n => n !== name);
    }
    this.notify();
  }

  isSet(name) {
    return this.current.indexOf(name) !== -1;
  }

  get() {
    return this.current;
  }

  filter() {
    return this.current
      .map(c => "(" + this.options[c] + ")")
      .join(" " + this.joinOperator + " ");
  }
}

export default MultiFacet;
