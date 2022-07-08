import { date, join } from './resultTemplateHelpers';

describe('resultTemplateHelpers - join', () => {
  test.each([
    [['the', 'lazy', 'fox'], undefined, 'thelazyfox'],
    [['the', 'lazy', 'fox'], ', ', 'the, lazy, fox'],
    [[], ', ', ''],
    [['the'], ', ', 'the'],
  ])('join(%p, %s) == "%s"', (items, joiner, result) => {
    expect(join({ items, joiner })).toBe(result);
  });
});

describe('resultTemplateHelpers - date', () => {
  test.each([
    ['2022-07-06T18:08Z', undefined, '06 July 2022 18:08 (UTC)'],
    ['2020-12-15T23:00Z', 'HH:mm - DD/MM/YYYY', '23:00 - 15/12/2020'],
  ])('date(%p, %s) == "%s"', (value, format, result) => {
    expect(date({ value, format })).toBe(result);
  });
});
