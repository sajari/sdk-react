import { Filter } from "./filter";

export type Range = [number, number];

export class RangeFilter extends Filter {
  protected _field = "";
  protected _range = [0, 0] as Range;
  protected _limit = [0, 0] as Range; // [min, max]
  protected _current = "";
  protected _filter = "";

  constructor(field: string, limit: Range) {
    super({}, []);

    this._field = field;
    this._limit = limit;
    this._range = limit;
  }

  public range = () => this._range;
  public filter = () => this._filter;
  public limit = () => this._limit;

  public get = () => (this._current === "" ? [] : [this._current]);

  public getRange() {
    return this._range;
  }

  // @ts-ignore: override method
  public set = (from: number, to: number) => {
    this._range = [from, to];
    this._filter = getFilterQuery(this._range, this._limit, this._field);
    this._emitSelectionUpdated();
  };

  public reset = () => {
    this._range = this._limit.map(r => r) as Range;
    if (this._filter !== "") {
      this.clear();
    }
  };

  public clear = () => {
    this._filter = "";
    this._emitSelectionUpdated();
  };
}

export function getFilterQuery(range: Range, limit: Range, field: string) {
  if (range[1] === limit[1] && range[0] === limit[0]) {
    return "";
  }
  return `(${field} >= ${range[0]} AND ${field} <= ${range[1]})`;
}
