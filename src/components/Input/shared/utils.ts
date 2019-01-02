export function trimPrefix(str: string, prefix: string) {
  if (str === undefined || prefix === "") {
    return "";
  } else if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  } else {
    return "";
  }
}
