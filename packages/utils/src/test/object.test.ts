import { filterObject, merge, MergeOptions } from '../object';

class Test {
  public a: Array<number>;

  constructor(value = 1) {
    this.a = [value];
  }
}

test.each([
  [{ a: 2 }, { a: 1 }, { a: 1 }],
  [
    {
      foo: 0,
      baz: 2,
    },
    { bar: 1 },
    {
      foo: 0,
      baz: 2,
      bar: 1,
    },
  ],
  [
    { color: { primary: '#ffffff', secondary: '#000000' } },
    { color: { primary: '#333333' } },
    { color: { primary: '#333333', secondary: '#000000' } },
  ],
  [
    {
      main: {
        header: {
          background: '#fdfdfd',
          foreground: '#999999',
        },
      },
      blog: {
        title: '#dddddd',
      },
    },
    { main: { header: { foreground: '#ffffff' } } },
    {
      main: {
        header: {
          background: '#fdfdfd',
          foreground: '#ffffff',
        },
      },
      blog: {
        title: '#dddddd',
      },
    },
  ],
  [
    {
      a: new Test(1),
    },
    {
      a: new Test(2),
    },
    {
      a: { a: [2] },
    },
  ],
  [
    {
      a: [1, 2, 3],
    },
    {
      a: [3, 4, 5, 6],
    },
    {
      a: [1, 2, 3, 3, 4, 5, 6],
    },
  ],
])('merge(%o, %o)', (target, source, expected) => {
  expect(merge(target, source)).toEqual(expected);
});

test.each([
  [
    new MergeOptions({ arrayHandling: 'concat' }),
    {
      a: [1, 2, 3],
    },
    {
      a: [3, 4, 5, 6],
    },
    {
      a: [1, 2, 3, 3, 4, 5, 6],
    },
  ],
  [
    new MergeOptions({ arrayHandling: 'union' }),
    {
      a: [1, 2, 3],
    },
    {
      a: [3, 4, 5, 6],
    },
    {
      a: [1, 2, 3, 4, 5, 6],
    },
  ],
  [
    new MergeOptions({ arrayHandling: 'replace' }),
    {
      a: [1, 2, 3],
    },
    {
      a: [3, 4, 5, 6],
    },
    {
      a: [3, 4, 5, 6],
    },
  ],
])('mergeWithOptions(%o, %o)', (options, target, source, expected) => {
  expect(merge(options, target, source)).toEqual(expected);
});

test.each([
  [{ foo: 'bar', baz: 1 }, ['foo'], false, { foo: 'bar' }],
  [{ foo: 'bar', baz: 1 }, [], false, {}],
  [{ foo: 'bar', baz: 1 }, ['bar'], false, {}],
  [{ foo: 'bar', baz: 1 }, ['foo'], true, { baz: 1 }],
  [{ foo: 'bar', baz: 1 }, ['fooz'], true, { foo: 'bar', baz: 1 }],
  [{ foo: 'bar', baz: 1 }, [], true, { foo: 'bar', baz: 1 }],
  [{ foo: 'bar', baz: 1 }, [], true, { foo: 'bar', baz: 1 }],
])('filterObject', (obj, keys, isBlacklisting, result) => {
  expect(filterObject(obj, keys, isBlacklisting)).toEqual(result);
});
