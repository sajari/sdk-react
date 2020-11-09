import { FilterItem } from '@sajari/react-hooks';

import { sortList } from '../utils';

describe('sortList', () => {
  test.each([
    [[{ label: 'a' }, { label: 'b' }], ['b'], [{ label: 'b' }, { label: 'a' }]],
    [
      [{ label: 'a' }, { label: 'b' }, { label: 'c' }],
      ['a', 'c'],
      [{ label: 'a' }, { label: 'c' }, { label: 'b' }],
    ],
    [[{ label: 'a' }, { label: 'b' }, { label: 'c' }], [], [{ label: 'a' }, { label: 'b' }, { label: 'c' }]],
    [
      [{ label: 'a' }, { label: 'b' }, { label: 'c' }, { label: 'd' }],
      ['d', 'b'],
      [{ label: 'b' }, { label: 'd' }, { label: 'a' }, { label: 'c' }],
    ],
  ])('sortList(%o,%o)', (list: FilterItem[], selected, expected) => {
    expect(sortList(list, selected)).toStrictEqual(expected);
  });
});
