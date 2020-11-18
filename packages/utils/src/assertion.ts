import { parseURL } from './url';

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

export function isArray<T>(value: any): value is T[] {
  return Array.isArray(value);
}

export const isEmptyArray = (value: any) => isArray(value) && value.length === 0;

export const isObject = (value: any) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function') && !isArray(value);
};

export const isEmptyObject = (value: any) => isObject(value) && Object.keys(value).length === 0;

// Empty assertions
export const isEmpty = (value: any) => {
  if (isArray(value)) {
    return isEmptyArray(value);
  }
  if (isObject(value)) {
    return isEmptyObject(value);
  }
  if (value == null || value === '') {
    return true;
  }
  return false;
};

/**
 * Check if a string is a valid absolute or relative URL
 * @param value
 */
export function isValidURL(value: any, allowRelative = false) {
  if (allowRelative && value.startsWith('/')) {
    return true;
  }

  return parseURL(value) !== null;
}
