import { filterItems, Item, Option, sortItems, sortOptions } from '../utils';

describe('sortItems and sortOptions', () => {
  // Decending
  const itemToOption = ([value, count]: Item): Option => ({
    value,
    count: Number(count),
    label: value,
  });
  const descendingItems: Item[][][] = [
    [
      [
        ['a', 0],
        ['b', 2],
      ],
      [
        ['b', 2],
        ['a', 0],
      ],
    ],
    [
      [
        ['a', 0],
        ['b', 0],
        ['c', 0],
      ],
      [
        ['c', 0],
        ['b', 0],
        ['a', 0],
      ],
    ],
    [
      [
        ['a', 2],
        ['b', 5],
        ['c', 3],
      ],
      [
        ['c', 3],
        ['b', 5],
        ['a', 2],
      ],
    ],
    [
      [
        ['a', 2],
        ['b', 5],
        ['c', 4],
        ['d', 3],
      ],
      [
        ['d', 3],
        ['c', 4],
        ['b', 5],
        ['a', 2],
      ],
    ],
  ];
  test.each<Array<Item[]>>(descendingItems)("sortItems(%o,'alpha', false)", (list, expected) => {
    expect(sortItems(list, 'alpha', false)).toStrictEqual(expected);
  });
  const descendingOptions: Option[][][] = descendingItems.map(([list, expected]) => [
    list.map(itemToOption),
    expected.map(itemToOption),
  ]);
  test.each<Array<Option[]>>(descendingOptions)("sortOptions(%o,'alpha', false)", (list, expected) => {
    expect(sortOptions(list, 'alpha', false)).toStrictEqual(expected);
  });

  // Ascending
  const ascendingItems: Item[][][] = [
    [
      [
        ['b', 2],
        ['a', 0],
      ],
      [
        ['a', 0],
        ['b', 2],
      ],
    ],
    [
      [
        ['c', 0],
        ['a', 0],
        ['b', 0],
      ],
      [
        ['a', 0],
        ['b', 0],
        ['c', 0],
      ],
    ],
    [
      [
        ['d', 3],
        ['b', 5],
        ['a', 2],
        ['c', 4],
      ],
      [
        ['a', 2],
        ['b', 5],
        ['c', 4],
        ['d', 3],
      ],
    ],
  ];
  test.each<Array<Item[]>>(ascendingItems)("sortItems(%o,'alpha')", (list, expected) => {
    expect(sortItems(list, 'alpha')).toStrictEqual(expected);
  });
  const ascendingOptions: Option[][][] = ascendingItems.map(([list, expected]) => [
    list.map(itemToOption),
    expected.map(itemToOption),
  ]);
  test.each<Array<Option[]>>(ascendingOptions)("sortOptions(%o,'alpha')", (list, expected) => {
    expect(sortOptions(list, 'alpha')).toStrictEqual(expected);
  });

  // No sort
  const noSortItems: Item[][][] = [
    [
      [
        ['b', 2],
        ['a', 0],
      ],
      [
        ['b', 2],
        ['a', 0],
      ],
    ],
    [
      [
        ['c', 0],
        ['a', 0],
        ['b', 0],
      ],
      [
        ['c', 0],
        ['a', 0],
        ['b', 0],
      ],
    ],
    [
      [
        ['d', 3],
        ['b', 5],
        ['a', 2],
        ['c', 4],
      ],
      [
        ['d', 3],
        ['b', 5],
        ['a', 2],
        ['c', 4],
      ],
    ],
  ];
  test.each<Array<Item[]>>(noSortItems)("sortItems(%o,'none')", (list, expected) => {
    expect(sortItems(list, 'none')).toStrictEqual(expected);
  });
  const noSortOptions: Option[][][] = noSortItems.map(([list, expected]) => [
    list.map(itemToOption),
    expected.map(itemToOption),
  ]);
  test.each<Array<Option[]>>(noSortOptions)("sortOptions(%o,'none')", (list, expected) => {
    expect(sortOptions(list, 'none')).toStrictEqual(expected);
  });

  // sort price range
  const priceRangeItems: Item[][][] = [
    [
      [
        ['> 10', 2],
        ['2 - 3', 5],
        ['1 - 2', 3],
        ['3 - 4', 1],
      ],
      [
        ['1 - 2', 3],
        ['2 - 3', 5],
        ['3 - 4', 1],
        ['> 10', 2],
      ],
    ],
    [
      [
        ['15 - 20', 3],
        ['< 10', 2],
        ['20 - 21', 1],
        ['10 - 15', 5],
      ],
      [
        ['< 10', 2],
        ['10 - 15', 5],
        ['15 - 20', 3],
        ['20 - 21', 1],
      ],
    ],
  ];
  test.each<Array<Item[]>>(priceRangeItems)("sortItems(%o,'alpha')", (list, expected) => {
    expect(sortItems(list, 'alpha')).toStrictEqual(expected);
  });
  const priceRangeOptions: Option[][][] = priceRangeItems.map(([list, expected]) => [
    list.map(itemToOption),
    expected.map(itemToOption),
  ]);
  test.each<Array<Option[]>>(priceRangeOptions)("sortOptions(%o,'alpha')", (list, expected) => {
    expect(sortOptions(list, 'alpha')).toStrictEqual(expected);
  });

  // Numbers
  const numbersItems: Item[][][] = [
    [
      [
        ['a', 2],
        ['b', 0],
      ],
      [
        ['b', 0],
        ['a', 2],
      ],
    ],
    [
      [
        ['c', 0],
        ['a', 1],
        ['b', -1],
      ],
      [
        ['b', -1],
        ['c', 0],
        ['a', 1],
      ],
    ],
  ];
  test.each<Array<Item[]>>(numbersItems)("sortItems(%o,'count')", (list, expected) => {
    expect(sortItems(list, 'count')).toStrictEqual(expected);
  });
  const numbersOptions: Option[][][] = numbersItems.map(([list, expected]) => [
    list.map(itemToOption),
    expected.map(itemToOption),
  ]);
  test.each<Array<Option[]>>(numbersOptions)("sortOptions(%o,'count')", (list, expected) => {
    expect(sortOptions(list, 'count')).toStrictEqual(expected);
  });
});

describe('filterItems', () => {
  const items: Item[] = [
    ['paint', 0],
    ['recrop', 0],
    ['t-shirt', 0],
    ['undergarment', 0],
    ['yellow', 0],
    ['zip', 0],
    ['age_Babies', 0],
    ['age_Toddlers', 0],
  ];

  type ItemMaped = { label: string; count: number; value: string };

  test.each<[Item[], string[] | undefined, string[] | undefined, string | undefined, ItemMaped[]]>([
    [
      items,
      undefined,
      undefined,
      undefined,
      [
        { label: 'paint', count: 0, value: 'paint' },
        { label: 'recrop', count: 0, value: 'recrop' },
        { label: 't-shirt', count: 0, value: 't-shirt' },
        { label: 'undergarment', count: 0, value: 'undergarment' },
        { label: 'yellow', count: 0, value: 'yellow' },
        { label: 'zip', count: 0, value: 'zip' },
        { label: 'age_Babies', count: 0, value: 'age_Babies' },
        { label: 'age_Toddlers', count: 0, value: 'age_Toddlers' },
      ],
    ],
    [
      items,
      ['paint', 'not in', 'recrop'],
      undefined,
      undefined,
      [
        { label: 'paint', count: 0, value: 'paint' },
        { label: 'recrop', count: 0, value: 'recrop' },
      ],
    ],
    [
      items,
      undefined,
      ['paint', 'not in', 't-shirt'],
      undefined,
      [
        { label: 'recrop', count: 0, value: 'recrop' },
        { label: 'undergarment', count: 0, value: 'undergarment' },
        { label: 'yellow', count: 0, value: 'yellow' },
        { label: 'zip', count: 0, value: 'zip' },
        { label: 'age_Babies', count: 0, value: 'age_Babies' },
        { label: 'age_Toddlers', count: 0, value: 'age_Toddlers' },
      ],
    ],
    [
      items,
      undefined,
      undefined,
      'age_',
      [
        { label: 'Babies', count: 0, value: 'age_Babies' },
        { label: 'Toddlers', count: 0, value: 'age_Toddlers' },
      ],
    ],
    [items, undefined, ['age_Babies'], 'age_', [{ label: 'Toddlers', count: 0, value: 'age_Toddlers' }]],
  ])('filterItems(%o, %o, %o, %s, %o)', (list, includes, excludes, prefixFilter, expected) => {
    expect(filterItems(list, { includes, excludes, prefixFilter })).toStrictEqual(expected);
  });
});
