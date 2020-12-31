/* eslint-disable @typescript-eslint/no-explicit-any */
export default function mapToObject<T = Record<string, string | number>>(map: Map<string, any> | undefined): T {
  const obj = {} as T;
  if (map) {
    map.forEach((v, k) => {
      if (typeof v === 'string' || typeof v === 'number') {
        obj[k] = v;
      }
    });
  }

  return obj;
}
