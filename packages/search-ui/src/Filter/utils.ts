import { FilterItem } from '@sajari/react-hooks';
import { formatNumber } from '@sajari/react-sdk-utils';
import { TFunction } from 'i18next';

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
