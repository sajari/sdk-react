import { FilterItem } from '@sajari/react-hooks';

import { pinItems, sortItems } from '../utils';

describe('sortItems', () => {
  // Decending
  test.each([
    [
      [
        { label: 'a', count: 0 },
        { label: 'b', count: 2 },
      ],
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
      [
        { label: 'c', count: 0 },
        { label: 'b', count: 0 },
        { label: 'a', count: 0 },
      ],
    ],
    [
      [
        { label: 'a', count: 2 },
        { label: 'b', count: 5 },
        { label: 'c', count: 3 },
      ],
      [
        { label: 'c', count: 3 },
        { label: 'b', count: 5 },
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
      [
        { label: 'd', count: 3 },
        { label: 'c', count: 4 },
        { label: 'b', count: 5 },
        { label: 'a', count: 2 },
      ],
    ],
  ])("sortItems(%o,'label', false)", (list: FilterItem[], expected) => {
    expect(sortItems(list, 'label', false)).toStrictEqual(expected);
  });

  // Ascending
  test.each([
    [
      [
        { label: 'b', count: 2 },
        { label: 'a', count: 0 },
      ],
      [
        { label: 'a', count: 0 },
        { label: 'b', count: 2 },
      ],
    ],
    [
      [
        { label: 'c', count: 0 },
        { label: 'a', count: 0 },
        { label: 'b', count: 0 },
      ],
      [
        { label: 'a', count: 0 },
        { label: 'b', count: 0 },
        { label: 'c', count: 0 },
      ],
    ],
    [
      [
        { label: 'd', count: 3 },
        { label: 'b', count: 5 },
        { label: 'a', count: 2 },
        { label: 'c', count: 4 },
      ],
      [
        { label: 'a', count: 2 },
        { label: 'b', count: 5 },
        { label: 'c', count: 4 },
        { label: 'd', count: 3 },
      ],
    ],
  ])("sortItems(%o,'label')", (list: FilterItem[], expected) => {
    expect(sortItems(list, 'label')).toStrictEqual(expected);
  });
});

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
