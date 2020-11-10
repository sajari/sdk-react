import { FilterItem } from '@sajari/react-hooks';

import { sortList } from '../utils';

describe('sortList', () => {
  // Decending
  test.each([
    [
      [
        { label: 'a', count: 0 },
        { label: 'b', count: 2 },
      ],
      ['b'],
      [
        { label: 'b', count: 2 },
        { label: 'a', count: 0 },
      ],
    ],
    [
      [
        { label: 'a', count: 0 },
        { label: 'b', count: 0 },
        { label: 'c', count: 0 },
      ],
      ['a', 'c'],
      [
        { label: 'c', count: 0 },
        { label: 'a', count: 0 },
        { label: 'b', count: 0 },
      ],
    ],
    [
      [
        { label: 'a', count: 2 },
        { label: 'b', count: 5 },
        { label: 'c', count: 3 },
      ],
      [],
      [
        { label: 'b', count: 5 },
        { label: 'c', count: 3 },
        { label: 'a', count: 2 },
      ],
    ],
    [
      [
        { label: 'a', count: 2 },
        { label: 'b', count: 5 },
        { label: 'c', count: 4 },
        { label: 'd', count: 3 },
      ],
      ['d', 'b'],
      [
        { label: 'b', count: 5 },
        { label: 'd', count: 3 },
        { label: 'c', count: 4 },
        { label: 'a', count: 2 },
      ],
    ],
  ])("sortList(%o,false,'count','label', %o)", (list: FilterItem[], pinned, expected) => {
    expect(sortList(list, false, 'count', 'label', pinned)).toStrictEqual(expected);
  });

  // Ascending
  test.each([
    [
      [
        { label: 'a', count: 0 },
        { label: 'b', count: 2 },
      ],
      ['b'],
      [
        { label: 'b', count: 2 },
        { label: 'a', count: 0 },
      ],
    ],
    [
      [
        { label: 'a', count: 0 },
        { label: 'b', count: 0 },
        { label: 'c', count: 0 },
      ],
      ['a', 'c'],
      [
        { label: 'c', count: 0 },
        { label: 'a', count: 0 },
        { label: 'b', count: 0 },
      ],
    ],
    [
      [
        { label: 'a', count: 2 },
        { label: 'b', count: 5 },
        { label: 'c', count: 3 },
      ],
      [],
      [
        { label: 'a', count: 2 },
        { label: 'c', count: 3 },
        { label: 'b', count: 5 },
      ],
    ],
    [
      [
        { label: 'a', count: 2 },
        { label: 'b', count: 5 },
        { label: 'c', count: 4 },
        { label: 'd', count: 3 },
      ],
      ['d', 'b'],
      [
        { label: 'b', count: 5 },
        { label: 'd', count: 3 },
        { label: 'a', count: 2 },
        { label: 'c', count: 4 },
      ],
    ],
  ])("sortList(%o,true,'count','label', %o)", (list: FilterItem[], pinned, expected) => {
    expect(sortList(list, true, 'count', 'label', pinned)).toStrictEqual(expected);
  });
});
