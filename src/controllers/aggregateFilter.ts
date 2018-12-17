import { Filter } from "./filter";
import { EVENT_RESPONSE_UPDATED } from "../events";
import { AggregateResponse, CountResponse } from "@sajari/sdk-js";
import { Pipeline } from "./pipeline";

export class CountAggregateFilter extends Filter {
  private _field: string = "";
  private _counts: { name: string; count: number }[] = [];

  constructor(
    field: string,
    pipeline: Pipeline,
    multi: boolean = false,
    type: string = "~"
  ) {
    super({}, [], multi);

    this._field = field;

    pipeline.listen(EVENT_RESPONSE_UPDATED, response => {
      const current = this.get();
      const aggregates = response.getAggregates();

      this._counts = this._getCounts(aggregates);
      this._clearFilterOptions(current);
      this.setOptions(this._genFilterOptions(current, type));
    });
  }

  public getCounts() {
    return this._counts;
  }

  private _getCounts(aggregates: AggregateResponse) {
    if (!aggregates || !aggregates[`count.${this._field}`]) {
      return [];
    }

    const counts = aggregates[`count.${this._field}`] as CountResponse;
    return Object.keys(counts)
      .map(key => {
        return { name: key, count: counts[key] };
      })
      .filter(x => x.name !== "")
      .sort(({ count: a }, { count: b }) => b - a);
  }

  private _genFilterOptions(current: string[], type = "~") {
    return this._counts.reduce(
      (opts, { name }) => {
        if (!current.includes(name)) {
          opts[name] = `${this._field}${type}"${name}"`;
        }
        return opts;
      },
      {} as { [key: string]: string }
    );
  }

  private _clearFilterOptions(current: string[]) {
    const clear = Object.keys(this.getOptions()).reduce(
      (opts, key) => {
        if (!current.includes(key)) {
          opts[key] = null;
        }
        return opts;
      },
      {} as { [key: string]: string | null }
    );
    this.setOptions(clear);
  }
}
