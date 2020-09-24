export function replaceAll(
  target: string,
  search: string,
  replacement: string
) {
  return target.split(search).join(replacement);
}
