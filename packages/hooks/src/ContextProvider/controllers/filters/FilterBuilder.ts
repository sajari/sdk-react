/* eslint-disable no-param-reassign */
import { isEmpty, isFunction, isString, replaceAll } from '@sajari/react-sdk-utils';

import { EVENT_OPTIONS_UPDATED, EVENT_SELECTION_UPDATED } from '../../events';
import { Listener } from '../Listener';
import { FilterOptions, JoinOperator, Options } from './types';

// Escape any characters that will break the request
const escapeValue = (input = '') => {
  let escaped = input;
  const chars = [','];

  chars.forEach((c) => {
    escaped = replaceAll(input, c, `\\${c}`);
  });

  return escaped;
};

const events = [EVENT_SELECTION_UPDATED, EVENT_OPTIONS_UPDATED];

/**
 * Filter is a helper class for building filters from UI components.
 */
export default class FilterBuilder {
  private current: string[];

  private initial: string[];

  private name: string;

  private field: string | undefined;

  private options: Options;

  private multi: boolean;

  private count: boolean;

  private array: boolean;

  private joinOperator: JoinOperator;

  private listeners: { [k: string]: Listener };

  /**
   * Constructs an instance of Filter.
   *
   * @example
   * const filter = new FilterBuilder({});
   */
  constructor({
    initial = [],
    joinOperator = 'OR',
    multi = true,
    options = {},
    array = false,
    name,
    field,
    count = isEmpty(options),
  }: FilterOptions) {
    if (isString(initial)) {
      initial = [initial];
    }

    /** @private */
    this.current = initial;
    /** @private */
    this.initial = initial;
    /** @private */
    this.name = name;
    /** @private */
    this.field = field;
    /** @private */
    this.count = count;
    /** @private */
    this.options = options;
    /** @private */
    this.multi = multi;
    /** @private */
    this.array = array;
    /** @private */
    this.joinOperator = joinOperator;
    /** @private */
    this.listeners = {
      [EVENT_SELECTION_UPDATED]: new Listener(),
      [EVENT_OPTIONS_UPDATED]: new Listener(),
    };
  }

  /**
   * Register a listener for a specific event.
   */
  public listen(event: string, callback: (filter: FilterBuilder) => void): () => void {
    if (!events.includes(event)) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  /**
   * Set the state of the filter.
   */
  public set(values: string[], merge: boolean = false) {
    if (merge) {
      const nonDuplicate = values.filter((v) => !this.current.includes(v));
      this.current = [...this.current, ...nonDuplicate];
    } else {
      this.current = values;
    }

    this.emitSelectionUpdated();
  }

  /**
   * Remove a list of values from the current state
   */
  public remove(values: string[]) {
    this.current = this.current.filter((v) => !values.includes(v));
    this.emitSelectionUpdated();
  }

  /**
   * returns whether the filter is set or not.
   */
  public isSet(name: string): boolean {
    return this.current.includes(name);
  }

  /**
   * Set or merge filter options.
   */
  public setOptions(options: Options, merge: boolean = false) {
    if (merge) {
      this.options = { ...this.options, ...options };
    } else {
      this.options = options;
    }

    this.emitOptionsUpdated();
  }

  public getName() {
    return this.name;
  }

  public getField() {
    return this.field;
  }

  public getCount() {
    return this.count;
  }

  public getOptions() {
    return this.options;
  }

  public get() {
    return this.current;
  }

  public isArray() {
    return this.array;
  }

  public isMulti() {
    return this.multi;
  }

  /**
   * Builds up the filter string from the current filter and it's children.
   */
  public filter() {
    const options = this.current
      .map((c) => {
        let f = this.options[c];
        if (isFunction(f)) {
          f = f();
        }
        if (!isEmpty(f)) {
          f = escapeValue(f);
        }
        return f;
      })
      .filter(Boolean);

    if (options.length < 2) {
      return options.join('');
    }

    return options.map((f) => `(${f})`).join(` ${this.joinOperator} `);
  }

  public getBuckets() {
    return Object.entries(this.options)
      .map(([key, value]) => `${this.name}_${key}:${value}`)
      .join(',');
  }

  /**
   * Reset the current filter to the initial one
   */
  public reset() {
    this.current = [...this.initial];
    this.emitSelectionUpdated();
  }

  /**
   * Emits a selection updated event to the selection updated listener.
   * @private
   */
  protected emitSelectionUpdated() {
    this.listeners[EVENT_SELECTION_UPDATED].notify((listener) => {
      listener();
    });
  }

  /**
   * Emits an options updated event to the options updated listener.
   * @private
   */
  protected emitOptionsUpdated() {
    this.listeners[EVENT_OPTIONS_UPDATED].notify((listener) => {
      listener();
    });
  }
}
