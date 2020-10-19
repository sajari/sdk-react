/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Aggregates, CountAggregate } from '@sajari/sdk-js';

import { EVENT_RESPONSE_UPDATED } from '../events';
import { Filter } from './filter';
import { Pipeline } from './pipeline';
import { Values } from './values';

export function filterOptValue(name: string, field: string, type = '~', listField = false) {
  let item = `"${name}"`;
  if (listField) {
    item = `["${name}"]`;
  }
  return `${field}${type}${item}`;
}

export class CountAggregateFilter extends Filter {
  private _field: string = '';

  private _counts: Array<{ name: string; count: number }> = [];

  constructor(field: string, pipeline: Pipeline, values: Values, multi = false, type = '~', listField = false) {
    super({}, [], multi);

    this._field = field;
    this._addCountToValues(values);

    pipeline.listen(EVENT_RESPONSE_UPDATED, (response) => {
      const current = this.get();
      const aggregates = response.getAggregates();

      this._counts = this._getCounts(aggregates);
      this._clearFilterOptions(current);
      this.setOptions(this._genFilterOptions(current, type, listField));
    });
  }

  public getCounts() {
    return this._counts;
  }

  public reset() {
    this.get().forEach((item) => {
      this.set(item, false);
    });
    this._counts = [];
  }

  private _addCountToValues(values: Values) {
    const { count } = values.get();
    const fields = typeof count === 'string' ? count.split(',') : [];
    if (!fields.includes(this._field)) {
      fields.push(this._field);
      values.set({ count: fields.join(',') });
    }
  }

  private _getCounts(aggregates: Aggregates) {
    if (!aggregates || !aggregates[`count.${this._field}`]) {
      return [];
    }

    // FIXME: mapping object after being changed in types
    // @ts-ignore
    const counts = aggregates[`count.${this._field}`] as CountAggregate;
    return Object.keys(counts)
      .map((key) => {
        return { name: key, count: counts[key] };
      })
      .filter((x) => x.name !== '')
      .sort(({ count: a }, { count: b }) => b - a);
  }

  private _genFilterOptions(current: string[], type = '~', listField = false) {
    return this._counts.reduce((opts, { name }) => {
      if (!current.includes(name)) {
        opts[name] = filterOptValue(name, this._field, type, listField);
      }
      return opts;
    }, {} as { [key: string]: string });
  }

  private _clearFilterOptions(current: string[]) {
    const clear = Object.keys(this.getOptions()).reduce((opts, key) => {
      if (!current.includes(key)) {
        opts[key] = null;
      }
      return opts;
    }, {} as { [key: string]: string | null });
    this.setOptions(clear);
  }
}
