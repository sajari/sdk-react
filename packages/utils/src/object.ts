/* eslint-disable no-param-reassign */
import { isObject } from './assertion';

/**
 * Filter an object to keep or remove certain keys
 * @param input Object to filter
 * @param keys Keys that can be kept or removed
 * @param invert Whether the keys are kept (false) or remove (true)
 */
export function filterObject(input: Record<string, any>, keys: Array<string>, invert = false): Record<string, any> {
  return Object.keys(input)
    .filter((key) => (invert ? !keys.includes(key) : keys.includes(key)))
    .reduce((obj, key) => Object.assign(obj, { [key]: input[key] }), {});
}

interface MergeObject {
  [k: string]: any;
}

// Deep extend destination object with N more objects
export function merge(target: MergeObject, ...sources: MergeObject[]) {
  if (!isObject(target) || !sources.length) {
    return target;
  }

  const source = sources.shift();

  if (!source || !isObject(source)) {
    return target;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = merge({ ...targetValue }, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}
