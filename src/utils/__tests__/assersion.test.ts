import { isObject } from "../assersion";

test.each([
  // valid
  [{}, true],
  [Object.create({}), true],
  [
    () => {
      return;
    },
    true
  ],
  // invalid
  ["", false],
  [[], false],
  [1, false],
  [0, false],
  [null, false],
  [undefined, false],
  [NaN, false]
])("isObject(%o)", (obj, expected) => {
  expect(isObject(obj)).toBe(expected);
});
