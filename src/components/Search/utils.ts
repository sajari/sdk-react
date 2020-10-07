export function isNotEmptyArray<T>(a: T, b: T): T {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error('provided arguments must be arrays');
  }

  return a.length === 0 ? b : a;
}

export const isNotEmptyString = (a: string, b: string) => (a === '' ? b : a);

export const mapToObject = (map: Map<string, any> | undefined): { [k: string]: string | number } => {
  const obj: { [k: string]: string | number } = {};
  if (map) {
    map.forEach((v, k) => {
      if (typeof v === 'string' || typeof v === 'number') {
        obj[k] = v;
      }
    });
  }
  return obj;
};
