/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { isPlainObject } from './assertion';

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

type MergeArrayHandling = 'concat' | 'union' | 'replace';

export class MergeOptions {
  /**
   * How arrays should be merged
   * 'concat' - Concatenate arrays.
   * 'union' - Union arrays, skipping items that already exist.
   * 'replace' - Replace all array items.
   */
  public arrayHandling: MergeArrayHandling;

  constructor(options?: MergeOptions) {
    this.arrayHandling = options?.arrayHandling ?? 'concat';
  }
}

// Deep extend destination object with N more objects
export function merge(
  options: MergeOptions | MergeObject,
  target: MergeObject,
  ...sources: MergeObject[]
): MergeObject {
  // If options aren't passed
  if (isPlainObject(options)) {
    sources = [target, ...sources];
    target = options;
    options = new MergeOptions();
  }

  if (!isPlainObject(target) || !sources.length) {
    return target;
  }

  const { arrayHandling } = options as MergeOptions;
  const source = sources.shift();

  if (!source || !isPlainObject(source)) {
    return target;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      switch (arrayHandling) {
        case 'concat':
          target[key] = targetValue.concat(sourceValue);
          break;

        case 'replace':
          target[key] = sourceValue;
          break;

        case 'union':
          target[key] = Array.from(new Set([...targetValue, ...sourceValue]));
          break;

        default:
          break;
      }
    } else if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      target[key] = merge(options, { ...targetValue }, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}
