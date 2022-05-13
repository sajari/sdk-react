import { isArray, isNumber, isSSR } from '@sajari/react-sdk-utils';

import { Range } from '../ContextProvider';

export function isRange(value: unknown) {
  return isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1]);
}

export function rangeToParam(value: Range) {
  return value.join(':');
}

export function paramToRange(value: string) {
  return value.split(':').map(Number);
}

export function getSearchParams() {
  if (isSSR()) {
    return {};
  }
  const search: Record<string, string> = {};
  new URLSearchParams(window.location.search).forEach((value, key) => {
    search[key] = value;
  });
  return search;
}
