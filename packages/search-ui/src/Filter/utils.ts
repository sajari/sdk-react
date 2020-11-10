/**
 * Sort an array based on a property of child item
 * @param {Array} list
 * @param {Boolean} asc - Ascending order?
 * @param {String} prop - Child item property to sort on
 * @param {String} pinKey - Property of object to get comparation in pinned array
 * @param {Array} pinned - Pin some items to the top (handy for checkbox lists where you may want to pin selected to the top)
 */
export function sortList(
  list: Record<string, any>[],
  asc: boolean = true,
  prop: string,
  pinKey: string,
  pinned: string[] = [],
) {
  const sortedList = [...list];

  sortedList
    .sort((a, b) => {
      const l = a[prop];
      const r = b[prop];

      return asc ? l - r : r - l;
    })
    .sort((a, b) => pinned.indexOf(b[pinKey]) - pinned.indexOf(a[pinKey]));

  return sortedList;
}
