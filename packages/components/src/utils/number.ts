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
