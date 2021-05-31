import { isSSR } from '@sajari/react-sdk-utils';

import { SortType } from './types';

const priceRangePattern = /\d+\s-\s\d+/gm;
const patternTest = priceRangePattern.test.bind(priceRangePattern);
const collator = new Intl.Collator(!isSSR() ? window.navigator.language : 'en-US', {
  numeric: true,
});

export type Item = [string, number | string | (() => string)];

// Add support to sort price range ("1 - 50", "200 - 500" or "> 2000")
export const sortItems = (list: Item[], sort: SortType = 'alpha', asc = true) => {
  if (sort === 'none') {
    return list;
  }

  const byLabel = sort !== 'count';

  return [...list].sort(([labelLeft, valueLeft], [labelRight, valueRight]) => {
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
  });
};

export const filterItems = (
  list: Item[],
  { excludes, includes, prefixFilter }: { includes?: string[]; excludes?: string[]; prefixFilter?: string },
) => {
  let filteredList: { value: string; count: number; label: string }[] = list.map(([value, count]) => ({
    value,
    count: Number(count),
    label: value,
  }));

  if (includes) {
    filteredList = filteredList.filter(({ label }) => includes.includes(label));
  }

  if (excludes) {
    filteredList = filteredList.filter(({ label }) => !excludes.includes(label));
  }

  if (prefixFilter) {
    filteredList = filteredList
      .filter(({ label }) => label.startsWith(prefixFilter))
      .map(({ label, count, value }) => ({ label: label.replace(prefixFilter, ''), count, value }));
  }
  return filteredList;
};
