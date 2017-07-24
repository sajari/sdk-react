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
      if (this.current.indexOf(name) === -1) {
        this.current = this.current.concat(name);
      }
    } else {
      this.current = this.current.filter(n => n !== name);
    }
    this.notify();
  }

  isSet(name) {
    return this.current.indexOf(name) !== -1;
  }

  setOption(name, value) {
    this.options[name] = value;
  }

  removeOption(name) {
    delete this.options[name];
  }

  get() {
    return this.current;
  }

  filter() {
    let filters = this.current
      .filter(Boolean)
      .map(c => {
        if (typeof c === "function") {
          return c();
        }
        return "(" + this.options[c] + ")";
      });
    if (filters.length > 0) {
      return filters.join(" " + this.joinOperator + " ");
    }
    return "";
  }
}

export default MultiFacet;
