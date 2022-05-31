import { join } from './resultTemplateHelpers';

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
