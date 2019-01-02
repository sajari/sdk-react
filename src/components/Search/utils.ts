export function isNotEmptyArray<T>(a: T, b: T): T {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error("provided arguments must be arrays");
  }

  return a.length === 0 ? b : a;
}

export const isNotEmptyString = (a: string, b: string) => (a === "" ? b : a);
