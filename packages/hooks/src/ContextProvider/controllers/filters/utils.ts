import { groupBy, isEmpty, isEmptyArray } from '@sajari/react-sdk-utils';

import FilterBuilder from './FilterBuilder';
import RangeFilterBuilder from './RangeFilterBuilder';

type Type = 'filter' | 'countFilters';

// Group expressions into an ARRAY_MATCH
const buildArrayMatch = (expressions: Array<string>) => {
  let list = expressions.filter(Boolean);

  if (list.length > 1) {
    list = list.map((expression) => `(${expression})`);
  }

  if (isEmptyArray(list)) {
    return '';
  }

  return `ARRAY_MATCH(${list.join(' AND ')})`;
};

// Group filters together using ARRAY_MATCH
export function groupFilters(
  filters: Array<FilterBuilder | RangeFilterBuilder>,
  type: Type,
  joinOperator: string,
): string {
  let list = filters.map((f) => ({
    group: f.getGroup(),
    field: f.getField(),
    expression: f.filter(),
    count: f instanceof FilterBuilder && f.getCount(),
  }));

  // For filter we only want defined expressions
  if (type === 'filter') {
    list = list.filter(({ expression }) => Boolean(expression));
  }

  // Group and flatten the filter expressions into groups
  const groups = Object.entries(groupBy(list, 'group'))
    .filter(([group]) => Boolean(group))
    .reduce(
      (out, [key, f]: [string, typeof list]) => ({
        ...out,
        [key]: f.map(({ expression }) => expression),
      }),
      {},
    ) as Record<string, Array<string>>;

  // Build filter expression
  if (type === 'filter') {
    // Build the list of non grouped filters
    const basicFilters = list.filter(({ group, count }) => !group && !count).map(({ expression }) => `(${expression})`);

    return Object.entries(groups)
      .reduce((out, [group, expressions]) => {
        if (group !== 'undefined' && !isEmpty(expressions)) {
          return [...out, buildArrayMatch(expressions)];
        }

        return out;
      }, [])
      .concat(...basicFilters)
      .join(joinOperator);
  }

  // Build countFilters expression (has to be one item per filter)
  return list
    .filter(({ field, count }) => !isEmpty(field) && count)
    .map(({ group, expression, count }) => {
      if (group && !isEmpty(groups[group])) {
        return buildArrayMatch(groups[group]);
      }

      return count ? expression : null;
    })
    .filter((e) => e !== null)
    .join(joinOperator);
}
