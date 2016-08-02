export function AddBoost(metaBoost, value) {
  return {
    add: {
      meta_boost: metaBoost,
      value: value,
    },
  };
}

export function FilterBoost(filter, value) {
  return {
    filter: {
      filter: filter,
      value: value,
    },
  };
}

export function GeoBoost(fieldLat, fieldLng, lat, lng, radius, value, region) {
  return {
    geo: {
      field_lat: fieldLat,
      field_lng: fieldLng,
      lat: lat,
      lng: lng,
      radius: radius,
      value: value,
      region: region,
    },
  };
}

export function Point(point, value) {
  return {
    point: point,
    value: value,
  };
}

export function IntervalBoost(field, points) {
  return {
    interval: {
      field: field,
      points: points,
    },
  };
}

export function DistanceBoost(min, max, ref, field, value) {
  return {
    distance: {
      min: min,
      max: max,
      ref: ref,
      field: field,
      value: value,
    },
  };
}

export function ElementBoost(field, elements) {
  return {
    element: {
      field: field,
      elts: elements,
    },
  };
}

export function TextBoost(field, text) {
  return {
    text: {
      field: field,
      text: text,
    },
  };
}
