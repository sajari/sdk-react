import { parseURL } from './url';

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

export function isArray<T>(value: any): value is T[] {
  return Array.isArray(value);
}

export const isEmptyArray = (value: any) => isArray(value) && value.length === 0;

export const isObject = (value: any) => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function') && !isArray(value);
};

export const isEmptyObject = (value: any) => isObject(value) && Object.keys(value).length === 0;

export const isNullOrUndefined = (value: any) => value === null || typeof value === 'undefined';

// Empty assertions
export const isEmpty = (value: any) => {
  if (isNullOrUndefined(value)) {
    return true;
  }

  if (isArray(value)) {
    return isEmptyArray(value);
  }

  if (isObject(value)) {
    return isEmptyObject(value);
  }

  if (isString(value)) {
    return value.trim() === '';
  }

  return false;
};

/**
 * Check if a string is a valid absolute or relative URL
 * @param value
 */
export function isValidURL(value: any, allowRelative = false) {
  if (!value || isEmpty(value)) {
    return false;
  }

  if (allowRelative && value.startsWith('/')) {
    return true;
  }

  return parseURL(value) !== null;
}
