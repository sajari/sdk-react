import { isSSR } from './ssr';

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
