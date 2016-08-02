export function FieldFilter(field, op, value) {
  return {
    field: {
      field: field,
      operator: op,
      value: value,
    },
  };
}

function combinator(filters, op) {
  return {
    combinator: {
      filters: filters,
      operator: op,
    },
  };
}

export function All(filters) {
  return combinator(filters, "ALL");
}

export function Any(filters) {
  return combinator(filters, "ANY");
}

export function One(filters) {
  return combinator(filters, "ONE");
}

export function None(filters) {
  return combinator(filters, "NONE");
}
