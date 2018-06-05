export const isNotEmptyString = (a: string, b: string) => (a === "" ? b : a);
export const isNotEmptyArray = (a: any[], b: any[]) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error("provided arguments must be arrays");
  }

  return a.length === 0 ? b : a;
};

export const trimPrefix = (str: string, prefix: string) => {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  } else {
    return "";
  }
};
