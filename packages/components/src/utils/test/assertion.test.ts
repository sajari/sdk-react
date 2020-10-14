import { isNumber } from '../assertion';

test.each([
  // valid
  [1, true],
  [2.4, true],
  [-0, true],
  [-0.1, true],
  [NaN, true],
  // invalid
  ['', false],
  [{}, false],
  [[], false],
  [null, false],
  [undefined, false],
])('isNumber(%o)', (num, expected) => {
  expect(isNumber(num)).toBe(expected);
});
