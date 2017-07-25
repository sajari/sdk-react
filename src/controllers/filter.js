import Listener from "./listener";

/**
 * Filter is a helper class for building filters from UI components.
 */
class Filter {
  /**
   * Constructs an instance of Filter.
   *
   * @example
   * const filter = new Filter({});
   *
   * @param {Object} options Dictionary of name -> filter pairs
   * @param {string|string[]} [initial=[]] List of initially selected items
   * @param {boolean} [multi=false] Multiple selections allowed?
   * @param {string} [joinOperator="OR"] Join operator used if multi = true ("OR" | "AND")
   */
  constructor(options, initial = [], multi = false, joinOperator = "OR") {
    if (typeof initial === "string") {
      initial = [initial];
    }
    /** @private */
    this.current = initial;
    /** @private */
    this.options = options;
    /** @private */
    this.multi = multi;
    /** @private */
    this.joinOperator = joinOperator;
    /** @private */
    this.listener = new Listener();
  }

  /**
   * Register a listener to be run when updates are made to the map.
   * @param {function(filter: Filter)} listener Function to run when updates are made.
   * @return {function()} The unregister function.
   */
  register(listener) {
    return this.listener.listen(listener);
  }

  /**
   * Notifies the listeners that the filter has been updated.
   * All listeners receive a reference to the instance of the Filter object as the first argument.
   */
  notify() {
    this.listener.notify(l => {
      l(this);
    });
  }

  /**
   * Set the state of the filter.
   *
   * @param {string} name Name of the filter to change.
   * @param {boolean} on Enable/disable the filter.
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
   * @param {string} name Name of the filter to check
   * @return {boolean} Whether the filter is set or not.
   */
  isSet(name) {
    return this.current.indexOf(name) !== -1;
  }

  /**
   * Adds a filter to the available options.
   * @param {string} name Name of the filter to add
   * @param {string} value Filter to run if enabled
   */
  add(name, value) {
    this.options[name] = value;
  }

  /**
   * Removes a filter from the available options.
   * @param {string} name Name of the filter to remove
   */
  remove(name) {
    delete this.options[name];
  }

  /**
   * Get returns the filters.
   * @return {string[]}
   */
  get() {
    return this.current;
  }

  /**
   * Builds up the filter string from the current filter and it's children.
   * @return {string} The evaluated filter string.
   */
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
 * CombineFilters is a helper for combining multiple Filter instances
 * into one.
 *
 * Whenever any of the combined filters are updated, the events are
 * propagated up to the returned "root" filter.
 *
 * @param {Filter[]} filters Array of filters to combine.
 * @param {string} [operator="AND"] Operator to apply between them ("AND" | "OR").
 * @return {Filter} The resulting Filter.
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
};

export { Filter, CombineFilters };
