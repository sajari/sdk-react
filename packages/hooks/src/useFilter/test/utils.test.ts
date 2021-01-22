import { Item, sortItems } from '../utils';

describe('sortItems', () => {
  // Decending
  test.each<Array<Item[]>>([
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
  ])("sortItems(%o,'alpha', false)", (list, expected) => {
    expect(sortItems(list, 'alpha', false)).toStrictEqual(expected);
  });

  // Ascending
  test.each<Array<Item[]>>([
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
  ])("sortItems(%o,'alpha')", (list, expected) => {
    expect(sortItems(list, 'alpha')).toStrictEqual(expected);
  });

  // No sort
  test.each<Array<Item[]>>([
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
  ])("sortItems(%o,'none')", (list, expected) => {
    expect(sortItems(list, 'none')).toStrictEqual(expected);
  });

  // sort price range
  test.each<Array<Item[]>>([
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
  ])("sortItems(%o,'alpha')", (list, expected) => {
    expect(sortItems(list, 'alpha')).toStrictEqual(expected);
  });

  // Numbers
  test.each<Array<Item[]>>([
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
  ])("sortItems(%o,'count')", (list, expected) => {
    expect(sortItems(list, 'count')).toStrictEqual(expected);
  });
});
