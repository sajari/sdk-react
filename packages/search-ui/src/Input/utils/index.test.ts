import { lowercaseObjectKeys } from '.';

test('lowercaseRedirects', () => {
  const redirects = {
    FoO: { id: '1', target: 'a' },
    BAR: { id: '2', target: 'b' },
    baz: { id: '3', target: 'c' },
    test: { id: '4', target: 'd' },
    Test: { id: '5', target: 'e' },
  };
  const want = {
    foo: { id: '1', target: 'a' },
    bar: { id: '2', target: 'b' },
    baz: { id: '3', target: 'c' },
    test: { id: '5', target: 'e' },
  };

  const got = lowercaseObjectKeys(redirects);
  expect(got).toStrictEqual(want);
});
