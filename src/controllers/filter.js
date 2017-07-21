const andFilter = "AND";
const orFilter = "OR";
const singleFilter = "single";

export const ANDFilter = () => new Filter(andFilter);
export const ORFilter = () => new Filter(orFilter);

export class Filter {
  constructor(type) {
    this.filters = {};
    this.type = type;
  }

  setFilter(name, filter) {
    this.filters[name] = filter;
  }

  getFilter(name) {
    return this.filters[name];
  }

  removeFilter(name) {
    delete this.filters[name];
  }

  evaluate() {
    let filters = Object.keys(this.filters)
      .map(k => this.filters[k])
      .filter(Boolean);
    if (this.type === singleFilter) {
      if (filters.length === 1) {
        return "(" + filters[0] + ")";
      } else {
        return undefined;
      }
    }

    filters = filters
      .map(f => {
        if (typeof f === "string") {
          return f;
        } else if (f instanceof Filter) {
          return f.evaluate();
        } else {
          throw new Error(
            "filter value must be either string or instance of Filter, got " +
              typeof f
          );
        }
      })
      .filter(Boolean);
    if (filters.length > 0) {
      return "(" + filters.join(") " + this.type + " (") + ")";
    }
    return undefined;
  }
}
