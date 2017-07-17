const andFilter = "AND";
const orFilter = "OR";
const singleFilter = "single";

const notUndefined = x => x !== undefined;

class Filter {
  constructor(type) {
    this.filters = {};
    this.type = type;
  }

  setFilter(name, filter) {
    this.filters[name] = filter;
  }

  removeFilter(name) {
    delete this.filters[name];
  }

  evaluate() {
    let filters = Object
      .keys(this.filters)
      .map(k => this.filters[k])
      .filter(notUndefined);
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
        } else {
          return f.evaluate();
        }
      })
      .filter(notUndefined);
    if (filters.length > 0) {
      return "(" + filters.join(") " + this.type + " (") + ")";
    }
    return undefined;
  }
}

export { Filter, andFilter, orFilter, singleFilter };
