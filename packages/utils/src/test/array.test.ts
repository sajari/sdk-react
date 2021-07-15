import { arraysEqual } from '../array';

test.each([
  [[], [], true, true],
  [[1], [], true, false],
  [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], true, true],
  [['a'], [3], true, false],
  [['a', 1, 'b'], ['a', 1, 'b'], true, true],
  [['a', 'b', 2, 1], [2, 'a', 1, 'b'], false, true],
  [['a', 'b', 'c'], ['c', 'b', 'a'], false, true],
  [['a', 'b', 'c'], ['c', 'b', 'a'], true, false],
])('arraysEqual(%o, %o)', (arrayA, arrayB, order, expected) => {
  expect(arraysEqual(arrayA, arrayB, order)).toBe(expected);
});
