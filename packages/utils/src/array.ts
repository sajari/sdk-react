/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Group an array of objects by a child property
 * @param collection - The collection to iterate over.
 * @param key - The child property to group by.
 */
export function groupBy<T = Record<string, any>>(collection: Array<T>, key: string) {
  return collection.reduce((out, obj) => ({ ...out, [obj[key]]: (out[obj[key]] || []).concat(obj) }), {});
}

export function arraysEqual(a: Array<any>, b: Array<any>, order = true) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  const cA = order ? a : a.sort();
  const cB = order ? b : b.sort();

  for (let i = 0; i < cA.length; i += 1) {
    if (cA[i] !== cB[i]) return false;
  }
  return true;
}
