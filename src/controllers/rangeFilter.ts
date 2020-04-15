import { Filter } from "./filter";

export class RangeFilter extends Filter {
  protected _field = "";
  protected _multi = false;
  protected _range = [0, 0] as [number, number];
  protected _limit = [0, 0] as [number, number];
  protected _current = "";
  protected _filter = "";

  constructor(field: string, limit: [number, number], multi: boolean = false) {
    super({}, [], multi);

    this._field = field;
    this._multi = multi;
    this._limit = limit;
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
    this._range = this._limit.map(r => r) as [number, number];
    if (this._filter !== "") {
      this.clear();
    }
  };

  public clear = () => {
    this._filter = "";
    this._emitSelectionUpdated();
  };
}

export function getFilterQuery(
  range: [number, number],
  limit: [number, number],
  field: string
) {
  if (range[1] === limit[1] && range[0] === limit[0]) {
    return "";
  }
  return `(${field} >= ${range[0]} AND ${field} <= ${range[1]})`;
}
