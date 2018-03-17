import { Listener } from "./";

export const selectionUpdatedEvent = "selection-updated";
export const optionsUpdatedEvent = "options-updated";

const events = [selectionUpdatedEvent, optionsUpdatedEvent];

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
    this.listeners = {
      [selectionUpdatedEvent]: new Listener(),
      [optionsUpdatedEvent]: new Listener()
    };
  }

  /**
   * Register a listener for a specific event.
   * @param {string} event Event to listen for
   * @param {function(filter: Filter)} callback Function to run when updates are made.
   * @return {function()} The function to unregister the listener.
   */
  listen(event, callback) {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  /**
   * Emits a selection updated event to the selection updated listener.
   * @private
   */
  _emitSelectionUpdated() {
    this.listeners[selectionUpdatedEvent].notify(listener => {
      listener();
    });
  }

  /**
   * Emits an options updated event to the options updated listener.
   * @private
   */
  _emitOptionsUpdated() {
    this.listeners[optionsUpdatedEvent].notify(listener => {
      listener();
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
    this._emitSelectionUpdated();
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
   * Merge options into the filter options.
   *
   * Set an option to undefined to remove it.
   *
   * @param {*} options
   */
  setOptions(options) {
    Object.keys(options).forEach(k => {
      if (options[k] === undefined) {
        delete this.options[k];
        this.current = this.current.filter(n => n !== k);
      } else {
        this.options[k] = options[k];
      }
    });
    this._emitOptionsUpdated();
  }

  /**
   * Get all the options defined in this filter.
   * @return {Object} Dictionary of name -> filter pairs.
   */
  getOptions() {
    return this.options;
  }

  /**
   * Get the current selection in this filter.
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
  filters.forEach(f => {
    f.listen(selectionUpdatedEvent, () => {
      combFilter._emitSelectionUpdated();
    });
  });

  return combFilter;
};

export { Filter, CombineFilters };
