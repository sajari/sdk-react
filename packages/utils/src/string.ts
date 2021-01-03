import { isString } from './assertion';
import { isSSR } from './ssr';

export function replaceAll(target: string, search: string | Record<string, string>, replacement?: string): string {
  if (isString(search)) {
    return target.split(search).join(replacement);
  }

  return Object.entries(search).reduce((current, [find, replace]) => replaceAll(current, find, replace), target);
}

/** Decode any HTML entities in a string */
export function decodeHTML(input = ''): string {
  if (isSSR()) {
    return input;
  }

  const txt = document.createElement('textarea');
  txt.innerHTML = input;
  return txt.value;
}

export function pluralize(input: number, singular: string, plural: string): string {
  if (input === 1) {
    return singular;
  }

  return plural;
}
