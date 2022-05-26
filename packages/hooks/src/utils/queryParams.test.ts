import { FilterBuilder, Range, RangeFilterBuilder, Variables } from '../ContextProvider';
import { initFiltersFromURLState, initVariableFromURLState, isRange, paramToRange, rangeToParam } from './queryParams';

test.each([
  [undefined, false],
  [null, false],
  [12, false],
  ['12', false],
  ['abc', false],
  [[], false],
  [[1], false],
  [['1'], false],
  [['1', 1], false],
  [[1, '1'], false],
  [[1, '1', 2], false],
  [[1, 2], true],
  [[2, 1], true],
])('isRange($s)', (input, expected) => {
  expect(isRange(input)).toBe(expected);
});

test.each<[Range, string]>([
  [[1, 2], '1:2'],
  [[3, 1], '3:1'],
  [[4, 5], '4:5'],
])('rangeToParam($o)', (input, expectedOutput) => {
  expect(rangeToParam(input)).toBe(expectedOutput);
});

test.each([
  ['1:2', [1, 2]],
  ['3:5', [3, 5]],
  ['99:42', [99, 42]],
])('paramToRange($o)', (input, expectedOutput) => {
  expect(paramToRange(input)).toStrictEqual(expectedOutput);
});

test.each<
  [
    { filters: (FilterBuilder | RangeFilterBuilder)[]; params: Record<string, string> },
    ((string | number)[] | null)[],
    (string | number)[][],
  ]
>([
  [
    {
      filters: [
        new FilterBuilder({
          name: 'brand',
          field: 'brand',
        }),
      ],
      params: { brand: 'Apple,Samsung' },
    },
    [[]],
    [['Apple', 'Samsung']],
  ],
  [
    {
      filters: [
        new FilterBuilder({
          name: 'brand',
          field: 'brand',
        }),
        new RangeFilterBuilder({
          name: 'price',
          field: 'price',
        }),
      ],
      params: { brand: 'Apple,Samsung', price: '1200:4000', price_min_max: '1:5000' },
    },
    [[], null],
    [
      ['Apple', 'Samsung'],
      [1200, 4000],
    ],
  ],
  [
    {
      filters: [
        new FilterBuilder({
          name: 'brand',
          field: 'brand',
          initial: ['HP'],
        }),
      ],
      params: { brand: 'Apple,Samsung' },
    },
    [['HP']],
    [['Apple', 'Samsung']],
  ],
  [
    {
      filters: [
        new FilterBuilder({
          name: 'brand',
          field: 'brand',
          initial: ['HP'],
        }),
      ],
      params: {},
    },
    [['HP']],
    [['HP']],
  ],
  [
    {
      filters: [
        new RangeFilterBuilder({
          name: 'price',
          field: 'price',
          initial: [1000, 4500],
        }),
      ],
      params: { price: '1200:4000', price_min_max: '1:5000' },
    },
    [[1000, 4500]],
    [[1200, 4000]],
  ],
  [
    {
      filters: [
        new RangeFilterBuilder({
          name: 'price',
          field: 'price',
          initial: [1000, 4500],
        }),
      ],
      params: {},
    },
    [[1000, 4500]],
    [[1000, 4500]],
  ],
])('initFiltersFromURLState($o)', ({ filters, params }, beforeOutput, afterOutput) => {
  filters.forEach((filter, index) => {
    expect(filter.get()).toStrictEqual(beforeOutput[index]);
  });
  initFiltersFromURLState({ filters, params });
  filters.forEach((filter, index) => {
    expect(filter.get()).toStrictEqual(afterOutput[index]);
  });
});

test.each<
  [
    {
      variables: Variables;
      params: Record<string, string>;
      mappingKeys: { paramKey: string; variableKey: string; defaultValue?: string }[];
    },
    Record<string, string>,
  ]
>([
  [
    {
      variables: new Variables(),
      params: { q: 'shoes' },
      mappingKeys: [
        { paramKey: 'show', variableKey: 'resultsPerPage', defaultValue: '15' },
        { paramKey: 'sort', variableKey: 'sort' },
        { paramKey: 'q', variableKey: 'q', defaultValue: '' },
      ],
    },
    { q: 'shoes', resultsPerPage: '15' },
  ],
])('initVariableFromURLState($o, %o, %o)', ({ variables, params, mappingKeys }, expectedOutput) => {
  mappingKeys.forEach(({ variableKey, defaultValue }) => {
    expect(variables.get()[variableKey]).toStrictEqual(defaultValue);
  });
  initVariableFromURLState({ variables, params, mappingKeys });
  mappingKeys.forEach(({ variableKey }) => {
    expect(variables.get()[variableKey]).toStrictEqual(expectedOutput[variableKey]);
  });
});
