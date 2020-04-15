import { AggregateResponse } from "@sajari/sdk-js";
import { EVENT_RESPONSE_UPDATED, EVENT_SEARCH_SENT } from "../events";
import { Pipeline } from "./pipeline";
import { RangeFilter } from "./rangeFilter";

export type LimitUpdateListener = (bounce: [number, number]) => void;

export class RangeAggregrateFilter extends RangeFilter {
  private _prevInput = "";
  private _count = "";
  private _limitChangeListeners: LimitUpdateListener[] = [];

  constructor(
    field: string,
    pipeline: Pipeline,
    limit: [number, number],
    multi: boolean = false
  ) {
    super(field, limit, multi);

    this._field = field;
    this._multi = multi;
    this._limit = limit;

    pipeline.listen(EVENT_SEARCH_SENT, sent => {
      const { q, count } = sent;
      if (this._prevInput !== q || (this._count === "" && count !== "")) {
        const removeListener = pipeline.listen(
          EVENT_RESPONSE_UPDATED,
          response => {
            const aggregates = response.getAggregates();
            const range = this._getLimit(aggregates);
            this._fireLimitChangeEvent(range);
            this._limit = range;
            removeListener();
          }
        );
        this._prevInput = q;
        this._count = count;
      }
    });
  }

  public addLimitChangeListener(listener: LimitUpdateListener) {
    this._limitChangeListeners.push(listener);
  }

  public clear = () => {
    this._emitSelectionUpdated();
  };

  private _fireLimitChangeEvent(bounce: [number, number]) {
    this._limitChangeListeners.forEach(func => func(bounce));
  }
  private _getLimit(aggregates: AggregateResponse): [number, number] {
    if (isEmpty(aggregates, this._field)) {
      return this._limit.map(r => r) as [number, number];
    }

    const min = (aggregates[`min.${this._field}`] as number) || 0;
    const max = (aggregates[`max.${this._field}`] as number) || 0;

    return [min, max];
  }
}
const isEmpty = (aggregates: AggregateResponse, field: string) =>
  !aggregates && (!aggregates[`max.${field}`] || !aggregates[`min.${field}`]);
