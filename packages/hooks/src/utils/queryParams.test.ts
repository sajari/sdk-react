import { Range } from '../ContextProvider';
import { isRange, paramToRange, rangeToParam } from './queryParams';

test.each([
  [undefined, false],
  [null, false],
  [12, false],
  ['12', false],
  ['abc', false],
  [[], false],
  [[1], false],
  [['1'], false],
  [['1', 1], false],
  [[1, '1'], false],
  [[1, '1', 2], false],
  [[1, 2], true],
  [[2, 1], true],
])('isRange($s)', (input, expected) => {
  expect(isRange(input)).toBe(expected);
});

test.each<[Range, string]>([
  [[1, 2], '1:2'],
  [[3, 1], '3:1'],
  [[4, 5], '4:5'],
])('rangeToParam($o)', (input, expectedOutput) => {
  expect(rangeToParam(input)).toBe(expectedOutput);
});

test.each([
  ['1:2', [1, 2]],
  ['3:5', [3, 5]],
  ['99:42', [99, 42]],
])('paramToRange($o)', (input, expectedOutput) => {
  expect(paramToRange(input)).toStrictEqual(expectedOutput);
});
