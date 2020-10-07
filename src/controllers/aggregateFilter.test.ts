import { filterOptValue } from './aggregateFilter';

test.each([
  ['x', 'y', '~', false, `y~"x"`],
  ['x', 'y', '~', true, `y~["x"]`],
])('filterOptValue(%s, %s, %s, %s)', (name, field, type, listField, out) => {
  expect(filterOptValue(name, field, type, listField)).toEqual(out);
});
