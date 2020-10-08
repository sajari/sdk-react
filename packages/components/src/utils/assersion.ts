/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
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

export const __DEV__ = process.env.NODE_ENV !== 'production';
