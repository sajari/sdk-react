export const isNotEmptyString = (a: string, b: string) => (a === "" ? b : a);

export function isNotEmptyArray<T>(a: T, b: T): T {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error("provided arguments must be arrays");
  }

  return a.length === 0 ? b : a;
}

export function trimPrefix(str: string, prefix: string) {
  if (str === undefined || prefix === "") {
    return "";
  } else if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  } else {
    return "";
  }
}
