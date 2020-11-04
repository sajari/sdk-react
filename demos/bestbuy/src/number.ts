/**
 * Format a number into a localised format
 *
 * @param input
 * @param currencyCode - The ISO currency code
 */
export function formatNumber(input = 0, currencyCode = '', neutral = false) {
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
