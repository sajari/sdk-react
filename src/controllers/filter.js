import Listener from "./listener";

/**
 * Filter is a helper class for building filters from UI components.
 */
class Filter {
  /**
   * 
   * @param {*dict} options Dictionary of name -> filter pairs
   * @param {*string|string[]} initial List of initially selected items
   * @param {*bool} multi Multiple selections allowed?
   * @param {*string} joinOperator Join operator used if muli = true ("OR" | "AND")
   */
  constructor(options, initial = [], multi = false, joinOperator = "OR") {
    if (typeof initial === 'string') {
      initial = [initial];
    }
    this.current = initial;
    this.options = options;
    this.multi = multi;
    this.joinOperator = joinOperator;
    this.listener = new Listener();
  }

  /**
   * Register a listener to be run when updates are made to the map.
   * @param {*function} listener Function to run when updates are made.
   */
  register(listener) {
    return this.listener.listen(listener);
  }

  notify() {
    this.listener.notify(l => {
      l(this);
    });
  }

  /**
   * Set the state of the filter.
   * 
   * @param {*string} name Name of the filter to change.
   * @param {*bool} on Enable/disable the filter.
   */
  set(name, on) {
    if (this.multi === false) {
      if (on === false) {
        return;
      }

      if (name) {
        this.current = [name];
      } else {
        this.current = [];
      }
    } else {
      if (on) {
        if (this.current.indexOf(name) === -1) {
          this.current = this.current.concat(name);
        }
      } else {
        this.current = this.current.filter(n => n !== name);
      }
    }
    this.notify();
  }

  /**
   * Is the filter enabled?
   * @param {*string} name Name of the filter to check
   */
  isSet(name) {
    return this.current.indexOf(name) !== -1;
  }

  /**
   * Adds a filter to the available options.
   * @param {*string} name Name of the filter to add
   * @param {*string} value Filter to run if enabled
   */
  add(name, value) {
    this.options[name] = value;
  }

  /**
   * Removes a filter from the available options.
   * @param {*string} name Name of the filter to remove
   */
  remove(name) {
    delete this.options[name];
  }

  /**
   * Get returns the filters.
   */
  get() {
    return this.current;
  }

  filter() {
    let filters = this.current
      .map(c => {
        let f = this.options[c];
        if (typeof f === "function") {
          f = f();
        }
        if (f !== "") {
          f = "(" + f + ")";
        }
        return f;
      })
      .filter(Boolean);
    switch (filters.length) {
      case 0:
        return "";
      case 1:
        return filters[0];
      default:
        return filters.join(" " + this.joinOperator + " ");
    }
  }
}

/**
 * CombinFilters is a helper for combining multiple Filter instances
 * into one.
 * 
 * Whenever any of the combined filters are updated, the events are
 * propagated up to the returned "root" filter.
 * 
 * @param {*Filter[]} filters Array of filters to combine.
 * @param {*string} operator Operator to apply between them ("AND" | "OR").
 */
const CombineFilters = (filters, operator = "AND") => {
  const opts = {};
  let count = 1;
  let on = [];

  filters.forEach(f => {
    opts["" + count] = () => f.filter();
    on = on.concat(["" + count]);
    count++;
  });

  const combFilter = new Filter(opts, on, true, operator);
  count = 1;
  filters.forEach(f => {
    f.register(() => {
      combFilter.notify();
    });
  });

  return combFilter;
}

export { Filter, CombineFilters };
