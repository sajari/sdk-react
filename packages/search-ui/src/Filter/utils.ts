import { FilterItem } from '@sajari/react-hooks';
import { isSSR } from '@sajari/react-sdk-utils';

/**
 * Sort an array based on a property of child item
 * @param {Array} list
 * @param {Boolean} asc - Ascending order?
 * @param {String} prop - Property of child object to sort on
 */
const collator = new Intl.Collator(!isSSR() ? window.navigator.language : 'en-US', {
  numeric: true,
});

export function sortItems(list: FilterItem[], prop?: string, asc: boolean = true) {
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
