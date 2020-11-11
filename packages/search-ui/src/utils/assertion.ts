/**
 * Parse a string to URL object
 * @param url
 */
export function parseURL(url = '') {
  let string = url;

  // Add the protocol if required
  if (!/^https?:\/\/*/.test(url)) {
    string = `http://${url}`;
  }

  try {
    return new URL(string);
  } catch (e) {
    return null;
  }
}

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
