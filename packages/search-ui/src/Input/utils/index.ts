export function lowercaseObjectKeys(obj: object) {
  const newObj = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    newObj[key.toLowerCase()] = obj[key];
  }
  return newObj;
}
