/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseURL } from './url';

const getTag = (value: any) => {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }

  // IE11 (remove if statement after end of life, July 2022)
  if (!toString.call) {
    try {
      return value.toString();
    } catch (err) {
      return 'unknown';
    }
  }

  return toString.call(value);
};

export function isNullOrUndefined(value: any): value is undefined | null {
  return value === null || typeof value === 'undefined';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export const isObject = (value: any) => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function') && !isArray(value);
};

export const isPlainObject = (value: any) => {
  if (!isObject(value) || getTag(value) !== '[object Object]') {
    return false;
  }

  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  let proto = value;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
};

export const isEmptyArray = (value: any) => isArray(value) && value.length === 0;

export const isEmptyObject = (value: any) => isObject(value) && Object.keys(value).length === 0;

// Empty assertions
export function isEmpty(value: any): value is null | undefined {
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
}

/**
 * Check if a string is a valid absolute or relative URL
 * @param value
 */
export function isValidURL(value?: string, allowRelative = false) {
  if (!value || isEmpty(value)) {
    return false;
  }

  if (allowRelative && value.startsWith('/')) {
    return true;
  }

  return parseURL(value) !== null;
}
