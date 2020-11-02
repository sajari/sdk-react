/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import { Aggregates } from '@sajari/sdk-js';

import { EVENT_RESPONSE_UPDATED, EVENT_SEARCH_SENT } from '../events';
import { Pipeline } from './pipeline';
import { Range, RangeFilter } from './rangeFilter';
import { Values } from './values';

export type LimitUpdateListener = ({ bounce, range }: { bounce: Range; range: Range }) => void;

const isEmpty = (aggregates: Aggregates, field: string) =>
  !aggregates && (!aggregates[`max.${field}`] || !aggregates[`min.${field}`]);

export class RangeAggregateFilter extends RangeFilter {
  private _prevInput = '';

  private _count = '';

  private _limitChangeListeners: LimitUpdateListener[] = [];

  constructor(field: string, pipeline: Pipeline, values: Values) {
    super(field, [0, 0]);

    this._field = field;
    this._addMinMaxToValues(values);
    pipeline.listen(EVENT_SEARCH_SENT, (sent) => {
      const { q, count } = sent;
      if (this._prevInput !== q || (this._count === '' && count !== '')) {
        const removeListener = pipeline.listen(EVENT_RESPONSE_UPDATED, (response) => {
          const aggregates = response.getAggregates();
          const bounce = this._getLimit(aggregates);
          const range = this._calculateRange(bounce);
          this._limit = bounce;
          this._range = range;
          this._fireLimitChangeEvent({ bounce, range });
          removeListener();
        });
        this._prevInput = q;
        this._count = count;
      }
    });
  }

  public addLimitChangeListener(listener: LimitUpdateListener) {
    this._limitChangeListeners.push(listener);
  }

  public removeLimitChangeListener(listener: LimitUpdateListener) {
    this._limitChangeListeners = this._limitChangeListeners.filter((item) => item !== listener);
  }

  private _calculateRange(bounce: Range) {
    const range = this._range.map((r) => r) as Range;
    if (this._range[0] < bounce[0]) {
      range[0] = bounce[0];
    }
    if (this._range[1] > bounce[1] || this._range[1] <= range[0]) {
      range[1] = bounce[1];
    }
    return range;
  }

  private _fireLimitChangeEvent({ bounce, range }: { bounce: Range; range: Range }) {
    this._limitChangeListeners.forEach((func) => func({ bounce, range }));
  }

  private _getLimit(aggregates: Aggregates): Range {
    if (isEmpty(aggregates, this._field)) {
      return this._limit.map((r) => r) as Range;
    }

    // TODO: need to fix this because of data shape from response change
    // may be best to do it when we are doing useFilter hook
    // @ts-ignore
    const min = (aggregates[`min.${this._field}`] as number) || 0;
    // @ts-ignore
    const max = (aggregates[`max.${this._field}`] as number) || 0;

    return [min, max];
  }

  private _addMinMaxToValues(values: Values) {
    const { min, max } = values.get();
    const minFields = typeof min === 'string' ? min.split(',') : [];
    if (!minFields.includes(this._field)) {
      minFields.push(this._field);
      values.set({ min: minFields.join(',') });
    }
    const maxFields = typeof max === 'string' ? max.split(',') : [];
    if (!maxFields.includes(this._field)) {
      maxFields.push(this._field);
      values.set({ max: maxFields.join(',') });
    }
  }
}
