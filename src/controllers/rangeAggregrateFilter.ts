import { AggregateResponse } from "@sajari/sdk-js";
import { EVENT_RESPONSE_UPDATED, EVENT_SEARCH_SENT } from "../events";
import { Pipeline } from "./pipeline";
import { RangeFilter } from "./rangeFilter";

export class RangeAggregrateFilter extends RangeFilter {
  private _bounce = [0, 0] as [number, number];
  private _prevInput = "";
  private _count = "";

  constructor(
    field: string,
    pipeline: Pipeline,
    limit: [number, number],
    onBounceUpdate: (bounce: [number, number]) => void,
    multi: boolean = false
  ) {
    super(field, limit, multi);

    this._field = field;
    this._multi = multi;

    pipeline.listen(EVENT_SEARCH_SENT, sent => {
      const { q, count } = sent;
      if (this._prevInput !== q || (this._count === "" && count !== "")) {
        const removeListener = pipeline.listen(
          EVENT_RESPONSE_UPDATED,
          response => {
            const aggregates = response.getAggregates();
            const bounce = this._getBounce(aggregates);
            onBounceUpdate(bounce);
            this._bounce = bounce;
            removeListener();
          }
        );
        this._prevInput = q;
        this._count = count;
      }
    });
  }

  public getBounce() {
    return this._bounce;
  }

  public clear = () => {
    this._emitSelectionUpdated();
  };

  private _getBounce(aggregates: AggregateResponse): [number, number] {
    if (isEmpty(aggregates, this._field)) {
      return [...this._limit] as [number, number];
    }

    const min = (aggregates[`min.${this._field}`] as number) || 0;
    const max = (aggregates[`max.${this._field}`] as number) || 0;

    return [min, max];
  }
}
const isEmpty = (aggregates: AggregateResponse, field: string) =>
  !aggregates && (!aggregates[`max.${field}`] || !aggregates[`min.${field}`]);
