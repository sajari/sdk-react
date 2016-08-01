export function MetricAggregate(field, type) {
  return {
    metric: {
      field: field,
      type: type,
    },
  };
}

export function CountAggregate(field) {
  return {
    count: {
      field: field,
    },
  };
}

export function Bucket(name, filter) {
  return {
    name: name,
    filter: filter,
  };
}

export function BucketAggregate(buckets) {
  return {
    bucket: {
      buckets: buckets,
    },
  };
}
