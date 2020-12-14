export function isSSR() {
  return typeof window === 'undefined';
}
