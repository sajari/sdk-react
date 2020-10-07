import { trimPrefix } from './utils';

test.each([
  ['hello', 'he', 'llo'],
  ['practice', 'p', 'ractice'],
  ['movement', 'movem', 'ent'],
])('trimPrefix(%s, %s)', (a, b, expected) => {
  expect(trimPrefix(a, b)).toBe(expected);
});
