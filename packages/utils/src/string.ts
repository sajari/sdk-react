export function replaceAll(target: string, search: string, replacement: string) {
  return target.split(search).join(replacement);
}

/** Decode any HTML entities in a string */
export function decodeHTML(input = '') {
  const txt = document.createElement('textarea');
  txt.innerHTML = input;
  return txt.value;
}
