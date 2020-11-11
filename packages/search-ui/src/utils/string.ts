/** Decode any HTML entities in a string */
export function decodeHTML(input = '') {
  const txt = document.createElement('textarea');
  txt.innerHTML = input;
  return txt.value;
}
