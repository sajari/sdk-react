import { EVENT_OPTIONS_UPDATED, EVENT_SELECTION_UPDATED } from "../events";
import { Listener } from "./listener";

const events = [EVENT_SELECTION_UPDATED, EVENT_OPTIONS_UPDATED];

export type OptionsFn = () => string;
export interface Options {
  [k: string]: string | OptionsFn;
}
export type CallbackFn = (filter: Filter) => void;

/**
 * Filter is a helper class for building filters from UI components.
 */
export class Filter {
  private current: string[];
  private options: Options;
  private multi: boolean;
  private joinOperator: "OR" | "AND";
  private listeners: { [k: string]: Listener };

  /**
   * Constructs an instance of Filter.
   *
   * @example
   * const filter = new Filter({});
   */
  constructor(
    options: Options, // Dictionary of name -> filter pairs
    initial: string | string[] = [], // List of initially selected items
    multi: boolean = false, // Multiple selections allowed?
    joinOperator: "OR" | "AND" = "OR" // Join operator used if multi = true
  ) {
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
      [EVENT_SELECTION_UPDATED]: new Listener(),
      [EVENT_OPTIONS_UPDATED]: new Listener()
    };
  }

  /**
   * Register a listener for a specific event.
   */
  public listen(event: string, callback: CallbackFn): () => void {
    if (events.indexOf(event) === -1) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  /**
   * Set the state of the filter.
   */
  public set(name: string, on: boolean) {
    if (this.multi) {
      this._setMulti(name, on);
      return;
    }

    // if on add to current
    if (on) {
      this.current = [name];
    } else {
      // clear current
      this.current = [];
    }

    this._emitSelectionUpdated();
  }

  /**
   * returns whether the filter is set or not.
   */
  public isSet(name: string): boolean {
    return this.current.indexOf(name) !== -1;
  }

  /**
   * Merge options into the filter options.
   *
   * Set an option to null to remove it.
   */
  public setOptions(options: { [k: string]: string | null }) {
    Object.keys(options).forEach(k => {
      if (options[k] === null) {
        delete this.options[k];
        this.current = this.current.filter(n => n !== k);
      } else {
        this.options[k] = options[k] as string;
      }
    });
    this._emitOptionsUpdated();
  }

  /**
   * Get all the options defined in this filter.
   */
  public getOptions(...fields: string[]): Options {
    return this.options;
  }

  /**
   * Get the current selection in this filter.
   */
  public get(...fields: string[]): string[] {
    return this.current;
  }

  /**
   * Builds up the filter string from the current filter and it's children.
   */
  public filter(): string {
    const filters = this.current
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
        return filters.join(` ${this.joinOperator} `);
    }
  }

  /**
   * Emits a selection updated event to the selection updated listener.
   * @private
   */
  protected _emitSelectionUpdated() {
    this.listeners[EVENT_SELECTION_UPDATED].notify(listener => {
      listener();
    });
  }

  /**
   * Emits an options updated event to the options updated listener.
   * @private
   */
  protected _emitOptionsUpdated() {
    this.listeners[EVENT_OPTIONS_UPDATED].notify(listener => {
      listener();
    });
  }

  /** @private */
  private _setMulti(name: string, on: boolean) {
    if (on && this.current.indexOf(name) === -1) {
      this.current = this.current.concat(name);
    } else {
      this.current = this.current.filter(n => n !== name);
    }

    this._emitSelectionUpdated();
  }
}

/**
 * CombineFilters is a helper for combining multiple Filter instances
 * into one.
 *
 * Whenever any of the combined filters are updated, the events are
 * propagated up to the returned "root" filter.
 *
 * @param filters Array of filters to combine.
 * @param  [operator="AND"] Operator to apply between them ("AND" | "OR").
 * @return The resulting Filter.
 */
export const CombineFilters = (
  filters: Filter[],
  operator: "AND" | "OR" = "AND"
) => {
  const opts: { [k: string]: () => string } = {};
  let count = 1;
  let on: string[] = [];

  filters.forEach(f => {
    opts["" + count] = () => f.filter();
    on = on.concat(["" + count]);
    count++;
  });

  const combFilter = new Filter(opts, on, true, operator);
  filters.forEach(f => {
    f.listen(EVENT_SELECTION_UPDATED, () => {
      // @ts-ignore
      combFilter._emitSelectionUpdated();
    });
    f.listen(EVENT_OPTIONS_UPDATED, () => {
      // @ts-ignore
      combFilter._emitOptionsUpdated();
    });
  });

  return combFilter;
};
