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
    return new Intl.NumberFormat(navigator.language).format(input);
  }

  const lang = neutral ? navigator.language.split('-')[0] : navigator.language;

  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: currencyCode,
  }).format(input);
}
