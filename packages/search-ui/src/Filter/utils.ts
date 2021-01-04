import { FilterItem } from '@sajari/react-hooks';
import { formatNumber, isSSR } from '@sajari/react-sdk-utils';
import { TFunction } from 'i18next';

/**
 * Sort an array based on a property of child item
 * @param {Array} list
 * @param {Boolean} asc - Ascending order?
 * @param {String} prop - Property of child object to sort on
 */
const collator = new Intl.Collator(!isSSR() ? window.navigator.language : 'en-US', {
  numeric: true,
});

export function sortItems(list: FilterItem[], prop?: string, asc = true) {
  return [...list].sort((a, b) => {
    const l = prop ? a[prop] : a;
    const r = prop ? b[prop] : b;

    if (asc) {
      return collator.compare(String(l), String(r));
    }

    // Invert the result;
    return collator.compare(String(r), String(l));
  });
}

/**
 * Pin items in an array to the start
 * @param {Array} list
 * @param {String} pinned - Items to pin in the array
 * @param {String} prop - Property of child object to get comparation in pinned array
 */
export function pinItems(list: FilterItem[], pinned: string[] = [], prop: string) {
  return [...list].sort((a, b) => pinned.indexOf(b[prop]) - pinned.indexOf(a[prop]));
}

/**
 * Get the header ID for a name
 * @param name - The filter's unique name
 */
export function getHeaderId(name: string) {
  return `filter-${name}-label`;
}

interface FormatValueParams {
  format?: 'default' | 'price';
  currency?: string;
  t: TFunction;
}

/**
 * Format a value to be presented in the UI
 * @param input - the value to format
 * @param params - formatting options
 */
export function formatLabel(input: string, params: FormatValueParams) {
  const { format = 'default', currency = 'USD', t } = params;
  const formatPrice = (v: number) => formatNumber(v, { style: 'currency', currency }).replace('.00', '');

  switch (format) {
    case 'price':
      switch (true) {
        case /\d+\s-\s\d+/gm.test(input): {
          const [min, max] = input.split(' - ').map(Number).map(formatPrice);
          return `${min} - ${max}`;
        }
        case input.startsWith('>'):
          return t('rangeOver', { value: formatPrice(Number(input.substring(2))) });
        case input.startsWith('<'):
          return t('rangeUnder', { value: formatPrice(Number(input.substring(2))) });
        default:
          return input;
      }

    case 'default':
    default:
      // Return unchanged if it's default
      return input;
  }
}
