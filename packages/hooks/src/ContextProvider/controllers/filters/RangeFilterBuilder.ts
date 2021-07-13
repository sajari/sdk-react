import { arraysEqual, isArray, roundToStep } from '@sajari/react-sdk-utils';

import { EVENT_RANGE_UPDATED } from '../../events';
import { Listener } from '../Listener';
import { Range, RangeFilterOptions } from './types';

const events = [EVENT_RANGE_UPDATED];

export default class RangeFilterBuilder {
  private initial: Range | null;

  private range: Range | null;

  private name: string;

  private group: string | undefined;

  private field: string;

  private min: number;

  private max: number;

  private step: number;

  private frozen: boolean;

  private aggregate: boolean;

  private listeners: { [k: string]: Listener };

  private formatter: Required<RangeFilterOptions>['formatter'];

  constructor({
    field,
    name,
    group,
    aggregate = true,
    initial,
    min = 0,
    max = aggregate ? 0 : 100,
    step = 1,
    formatter = (value: Range) => value.map((v) => roundToStep(v, step)) as Range,
  }: RangeFilterOptions) {
    if (typeof initial === 'undefined') {
      this.initial = aggregate ? null : [min, max];
    } else {
      this.initial = initial;
    }

    this.range = this.initial;
    this.name = name;
    this.group = group;
    this.field = field;
    this.formatter = formatter;
    this.min = min;
    this.max = max;
    this.step = step;
    this.frozen = false;
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
    if (this.frozen) {
      return;
    }
    this.range = range ? this.formatter(range) : range;

    if (emitEvent) {
      this.emitRangeUpdated();
    }
  }

  public getName() {
    return this.name;
  }

  public getGroup() {
    return this.group;
  }

  public getField() {
    return this.field;
  }

  public getFrozen() {
    return this.frozen;
  }

  public setMin(value: number) {
    if (!this.frozen) {
      this.min = value;
    }
  }

  public setMax(value: number) {
    if (!this.frozen) {
      this.max = value;
    }
  }

  public getMinMax() {
    return [this.min, this.max];
  }

  public getStep() {
    return this.step;
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

  public setFrozen(frozen: boolean) {
    this.frozen = frozen;
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
    if (this.frozen) {
      return;
    }

    if (this.initial === this.range || arraysEqual(this.initial || [], this.range || [])) {
      return;
    }

    if (isArray(this.initial)) {
      this.range = [...this.initial];
    } else {
      this.range = this.initial;
    }

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
