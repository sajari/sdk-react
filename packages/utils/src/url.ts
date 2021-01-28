/**
 * Parse a string to URL object
 * @param url
 */
export function parseURL(url = '') {
  try {
    return new URL(url);
  } catch (e) {
    return null;
  }
}
