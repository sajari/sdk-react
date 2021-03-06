import { FilterItem } from '@sajari/react-hooks';

import { TextTransform } from '../types';
import { capitalize, capitalizeFirstLetter, formatLabel, pinItems } from '../utils';

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
    ['Car Electronics & GPS', 'capitalize', 'default', 'Car Electronics & Gps'],

    ['> 200', 'normal-case', 'price', 'rangeOver'],
  ])(
    'formatLabel(%s, {textTransform:%s, format:%s})',
    (label: string, textTransform: TextTransform, format: 'default' | 'price', expected) => {
      expect(formatLabel(label, { textTransform, format, t })).toStrictEqual(expected);
    },
  );
});

describe('capitalize', () => {
  test.each([
    ['', ''],
    ['red', 'Red'],
    ['picton Blue', 'Picton Blue'],
    ['crimsonred', 'Crimsonred'],
    ['CAR & GPS', 'Car & Gps'],
    ['mEssy', 'Messy'],
    ['caPitalIZE all words', 'Capitalize All Words'],
    ['random value', 'Random Value'],
    ['HELLO world', 'Hello World'],
    ['one two', 'One Two'],
  ])('capitalize(%s)', (input, output) => {
    expect(capitalize(input)).toBe(output);
  });
});

describe('capitalize first letter', () => {
  test.each([
    ['', ''],
    ['red', 'Red'],
    ['picton Blue', 'Picton blue'],
    ['crimsonred', 'Crimsonred'],
    ['CAR & GPS', 'Car & gps'],
    ['mEssy', 'Messy'],
    ['caPitalIZE fiRST letter', 'Capitalize first letter'],
    ['random value', 'Random value'],
  ])('capitalize first value(%s)', (input, output) => {
    expect(capitalizeFirstLetter(input)).toBe(output);
  });
});
