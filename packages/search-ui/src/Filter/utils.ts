/**
 * Sort an array based on a property of child item
 * @param {Array} list
 * @param {Boolean} asc - Ascending order?
 * @param {String} prop - Property of child object to sort on
 */
export function sortItems(list: Record<string, any>[], prop?: string, asc: boolean = true) {
  return [...list].sort((a, b) => {
    const l = prop ? a[prop] : a;
    const r = prop ? b[prop] : b;
    if (l === r) return 0;
    if (asc) {
      if (l > r) return 1;
      return l > r ? 1 : -1;
    }
    return l > r ? -1 : 1;
  });
}

/**
 * Pin items in an array to the start
 * @param {Array} list
 * @param {String} pinned - Items to pin in the array
 * @param {String} prop - Property of child object to get comparation in pinned array
 */
export function pinItems(list: Record<string, any>[], pinned: string[] = [], prop: string) {
  return [...list].sort((a, b) => pinned.indexOf(b[prop]) - pinned.indexOf(a[prop]));
}
