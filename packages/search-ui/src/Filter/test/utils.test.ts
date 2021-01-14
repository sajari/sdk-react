import { FilterItem } from '@sajari/react-hooks';

import { pinItems } from '../utils';

describe('pinItems', () => {
  test.each([
    [
      [
        {
          label: 'a',
          count: 2,
        },
        {
          label: 'b',
          count: 3,
        },
        {
          label: 'c',
          count: 4,
        },
      ],
      ['b', 'c'],
      [
        {
          label: 'c',
          count: 4,
        },
        {
          label: 'b',
          count: 3,
        },
        {
          label: 'a',
          count: 2,
        },
      ],
    ],
    [
      [
        {
          label: 'b',
          count: 3,
        },
        {
          label: 'a',
          count: 2,
        },
        {
          label: 'd',
          count: 5,
        },
        {
          label: 'c',
          count: 4,
        },
      ],
      ['d', 'a'],
      [
        {
          label: 'a',
          count: 2,
        },
        {
          label: 'd',
          count: 5,
        },
        {
          label: 'b',
          count: 3,
        },
        {
          label: 'c',
          count: 4,
        },
      ],
    ],
  ])("pinItems(%o, %o, 'label')", (list: FilterItem[], pinned, expected) => {
    expect(pinItems(list, pinned, 'label')).toStrictEqual(expected);
  });
});
