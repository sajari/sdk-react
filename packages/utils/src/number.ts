/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * clamp((x * 255), 0, 255)
 *
 * @param input
 * @param min The lower boundary of the output range
 * @param max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
export function clamp(input = 0, min = 0, max = 255) {
  return Math.min(Math.max(input, min), max);
}

/**
 * Find the number closest to a target value
 * @param target The target value
 * @param values The range of values to check
 */
export function closest(target: number, values: number[]) {
  const match = values.reduce((prev, value) => (Math.abs(value - target) < Math.abs(prev - target) ? value : prev));
  return [values.indexOf(match), match];
}

/**
 * Get the number of decimal places
 * @param value
 */
export function getDecimalPlaces(value: number) {
  const match = `${value}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

  if (!match) {
    return 0;
  }

  return Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) -
      // Adjust for scientific notation.
      (match[2] ? +match[2] : 0),
  );
}

/**
 * Round to the nearest step
 * @param number
 * @param step
 */
export function round(number: number, step: number) {
  if (step < 1) {
    const places = getDecimalPlaces(step);
    return parseFloat(number.toFixed(places));
  }

  return Math.round(number / step) * step;
}

/**
 * Format a number into a localised format
 *
 * @param input
 * @param currencyCode - Optional ISO currency code (e.g. USD)
 * @param neutral - Use neutral language (e.g. `en` rather than `en-GB`). This is often useful when presenting currencies.
 */
export function formatNumber(input = 0, currencyCode = '', neutral = true) {
  if (typeof input !== 'number') {
    return input;
  }

  if (!currencyCode) {
    return new Intl.NumberFormat().format(input);
  }

  let lang = neutral ? 'en' : 'en-US';

  if (navigator) {
    lang = neutral ? navigator.language.split('-')[0] : navigator.language;
  }

  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: currencyCode,
  }).format(input);
}
