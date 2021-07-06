import { arraysEqual } from '../array';

test.each([
  [[], [], true],
  [[1], [], false],
  [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], true],
  [['a'], [3], false],
  [['a', 1, 'b'], ['a', 1, 'b'], true],
])('arraysEqual(%o, %o)', (arrayA, arrayB, expected) => {
  expect(arraysEqual(arrayA, arrayB)).toBe(expected);
});
