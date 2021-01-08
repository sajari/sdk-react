import { isArray } from '@sajari/react-sdk-utils';

import { EVENT_RANGE_UPDATED } from '../../events';
import { Listener } from '../Listener';
import { Range, RangeFilterOptions } from './types';

const events = [EVENT_RANGE_UPDATED];

export default class RangeFilterBuilder {
  private initial: Range | null;

  private range: Range | null;

  private name: string;

  private field: string;

  private min: number;

  private max: number;

  private aggregate: boolean;

  private listeners: { [k: string]: Listener };

  private formatter: Required<RangeFilterOptions>['formatter'];

  constructor({
    field,
    name,
    aggregate = true,
    initial,
    min = 0,
    max = aggregate ? 0 : 100,
    formatter = (value: Range) => value.map(Math.round) as Range,
  }: RangeFilterOptions) {
    if (typeof initial === 'undefined') {
      this.initial = aggregate ? null : [min, max];
    } else {
      this.initial = initial;
    }

    this.range = this.initial;
    this.name = name;
    this.field = field;
    this.formatter = formatter;
    this.min = min;
    this.max = max;
    this.aggregate = aggregate;
    this.listeners = {
      [EVENT_RANGE_UPDATED]: new Listener(),
    };
  }

  /**
   * Register a listener for a specific event.
   */
  public listen(event: string, callback: (filter: RangeFilterBuilder) => void): () => void {
    if (!events.includes(event)) {
      throw new Error(`Unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  public get() {
    return this.range;
  }

  public set(range: Range | null, emitEvent = true) {
    this.range = range ? this.formatter(range) : range;
    if (emitEvent) {
      this.emitRangeUpdated();
    }
  }

  public getName() {
    return this.name;
  }

  public getField() {
    return this.field;
  }

  public setMin(value: number) {
    this.min = value;
  }

  public setMax(value: number) {
    this.max = value;
  }

  public getMinMax() {
    return [this.min, this.max];
  }

  /**
   * Builds up the filter string from the current state.
   */
  public filter() {
    if (!this.range) {
      return '';
    }

    return `${this.field} >= ${this.range[0]} AND ${this.field} <= ${this.range[1]}`;
  }

  public isAggregate() {
    return this.aggregate;
  }

  /**
   * Check if the current range is different to the initial value
   */
  public hasChanged() {
    if (!this.range || !this.initial) {
      return this.range === this.initial;
    }

    return this.range[0] !== this.initial[0] || this.range[1] !== this.initial[1];
  }

  /**
   * Reset the current state to the initial value
   */
  public reset(emitEvent = true) {
    this.range = isArray(this.initial) ? [...this.initial] : this.initial;
    if (emitEvent) {
      this.emitRangeUpdated();
    }
  }

  public format(value: Range) {
    return this.formatter(value);
  }

  /**
   * Emits a range updated event to the selection updated listener.
   * @private
   */
  protected emitRangeUpdated() {
    this.listeners[EVENT_RANGE_UPDATED].notify((listener) => {
      listener(this);
    });
  }
}
