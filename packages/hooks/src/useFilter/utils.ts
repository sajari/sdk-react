import { isSSR } from '@sajari/react-sdk-utils';

import { SortType } from './types';

const priceRangePattern = /\d+\s-\s\d+/gm;
const patternTest = priceRangePattern.test.bind(priceRangePattern);
const collator = new Intl.Collator(!isSSR() ? window.navigator.language : 'en-US', {
  numeric: true,
});

export type Item = [string, number | string | (() => string)];
export type Option = { value: string; count: number; label: string };

const sortComparitor = (byLabel, asc) => ([labelLeft, valueLeft], [labelRight, valueRight]) => {
  const left = String(byLabel ? labelLeft : valueLeft);
  const right = String(byLabel ? labelRight : valueRight);
  // for price range
  switch (true) {
    case [left, right].every(patternTest): {
      const minLeft = left.split(' - ').map(Number)[0];
      const minRight = right.split(' - ').map(Number)[0];
      if (asc) {
        return collator.compare(String(minLeft), String(minRight));
      }
      return collator.compare(String(minRight), String(minLeft));
    }
    case left.startsWith('>'):
    case right.startsWith('<'):
      return asc ? 1 : -1;
    case left.startsWith('<'):
    case right.startsWith('>'):
      return asc ? -1 : 1;
    default:
      break;
  }

  if (asc) {
    return collator.compare(String(left), String(right));
  }
  return collator.compare(String(right), String(left));
};

// Add support to sort price range ("1 - 50", "200 - 500" or "> 2000")
export const sortItems = (list: Item[], sort: SortType = 'alpha', asc = true) => {
  if (sort === 'none') {
    return list;
  }

  const byLabel = sort !== 'count';

  return list.sort(sortComparitor(byLabel, asc));
};

export const sortOptions = (list: Option[], sort: SortType = 'alpha', asc = true) => {
  if (sort === 'none') {
    return list;
  }

  const byLabel = sort !== 'count';

  return list.sort(({ label: labelLeft, count: valueLeft }, { label: labelRight, count: valueRight }) =>
    sortComparitor(byLabel, asc)([labelLeft, valueLeft], [labelRight, valueRight]),
  );
};

/**
 * This is a simple function:
 * if (includes) {
 *   filteredList = filteredList.filter(({ label }) => includes.includes(label));
 * }
 * if (excludes) {
 *   filteredList = filteredList.filter(({ label }) => !excludes.includes(label));
 * }
 * But because it is run over thousands of items we take pains to loop as few times as is reasonable.
 */
export const filterItems = (
  list: Item[],
  { excludes, includes, prefixFilter }: { includes?: string[]; excludes?: string[]; prefixFilter?: string },
): Option[] => {
  if (!includes && !excludes && !prefixFilter) {
    return list.map(([value, count]) => ({
      value,
      count: Number(count),
      label: value,
    }));
  }

  let filteredList: { value: string; count: number; label: string }[] = [];
  // eslint-disable-next-line no-plusplus
  for (let current = 0; current < list.length; current++) {
    const [value, count] = list[current];
    let add = true;
    add = !excludes || !excludes.includes(value);
    add = add && (!includes || includes.includes(value));
    if (add) {
      filteredList.push({
        value,
        count: Number(count),
        label: value,
      });
    }
  }

  if (prefixFilter) {
    filteredList = filteredList
      .filter(({ value }) => value.startsWith(prefixFilter))
      .map(({ value, count }) => ({ label: value.replace(prefixFilter, ''), count, value }));
  }
  return filteredList;
};
