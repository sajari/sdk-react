export function FieldBoost(field, value) {
  return {
    field: {
      field: field,
      value: value,
    },
  };
}

export function ScoreBoost(threshold) {
  return {
    score: {
      threshold: threshold,
    },
  };
}
