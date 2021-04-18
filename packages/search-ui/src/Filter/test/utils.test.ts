import { FilterItem } from '@sajari/react-hooks';

import { TextTransform } from '../types';
import { formatLabel, pinItems } from '../utils';

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

describe('formatLabel', () => {
  const t = (s) => s;
  test.each([
    ['', 'normal-case', 'default', ''],
    ['', 'uppercase', 'default', ''],
    ['', 'capitalize', 'default', ''],
    ['', 'capitalize-first-letter', 'default', ''],
    ['all', 'capitalize-first-letter', 'default', 'All'],

    ['text', 'normal-case', 'default', 'text'],
    ['Car Electronics & GPS', 'uppercase', 'default', 'CAR ELECTRONICS & GPS'],
    ['Car Electronics & GPS', 'lowercase', 'default', 'car electronics & gps'],
    ['Car Electronics & GPS', 'capitalize', 'default', 'Car Electronics & GPS'],

    ['> 200', 'normal-case', 'price', 'rangeOver'],
  ])(
    'formatLabel(%s, {textTransform:%s, format:%s})',
    (label: string, textTransform: TextTransform, format: 'default' | 'price', expected) => {
      expect(formatLabel(label, { textTransform, format, t })).toStrictEqual(expected);
    },
  );
});
