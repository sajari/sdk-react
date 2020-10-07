import { merge } from '../object';

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
])('merge(%o, %o)', (target, source, expected) => {
  expect(merge(target, source)).toEqual(expected);
});
