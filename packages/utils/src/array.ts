/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Group an array of objects by a child property
 * @param collection - The collection to iterate over.
 * @param key - The child property to group by.
 */
export function groupBy<T = Record<string, any>>(collection: Array<T>, key: string) {
  return collection.reduce((out, obj) => ({ ...out, [obj[key]]: (out[obj[key]] || []).concat(obj) }), {});
}
