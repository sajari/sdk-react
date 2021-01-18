import { isNumber } from '@sajari/react-sdk-utils';
import { CountAggregate } from '@sajari/sdk-js';
import { useEffect, useMemo, useState } from 'react';

import { FilterBuilder, useContext } from '../ContextProvider';
import { EVENT_SELECTION_UPDATED } from '../ContextProvider/events';
import { FilterItem, SortType } from './types';
import { sortItems } from './utils';

function useFilter(name: string, params: { sort?: SortType; sortAscending?: boolean } = {}) {
  const {
    search: { filters = [], response },
  } = useContext();

  const filter = useMemo(
    () => filters.filter((f) => f instanceof FilterBuilder && f.getName() === name)[0] as FilterBuilder,
    [],
  );

  if (!filter) {
    throw new Error(`Filter "${name}" doesn't exist.`);
  }

  const [selected, setInternalSelected] = useState(filter.get());

  useEffect(() => {
    const removeListener = filter.listen(EVENT_SELECTION_UPDATED, () => {
      setInternalSelected(filter.get());
    });

    return () => {
      removeListener();
    };
  }, []);

  const setSelected = (value: string[], merge = false) => {
    filter.set(value, merge);
  };

  const reset = () => {
    filter.reset();
  };

  const { sort = 'alpha', sortAscending = sort !== 'count' } = params;

  const options: FilterItem[] = useMemo(() => {
    if (!response || response?.isEmpty()) {
      return [];
    }

    const aggregates = response.getAggregates();
    const aggregateFilters = response.getAggregateFilters();
    const isCount = filter.getCount();
    const fieldCount = filter.getField();

    if (isCount && fieldCount) {
      const array = filter.isArray();
      let count = {};
      ({ count } = (aggregateFilters || {})[fieldCount] || {});
      if (!count) {
        ({ count = {} } = (aggregates || {})[fieldCount] || {});
      }

      const temp = sortItems(Object.entries(count), sort, sortAscending)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .map(([label, count]: [string, number]) => ({
          label,
          count,
          value: array ? `${fieldCount} ~ ["${label}"]` : `${fieldCount} = "${label}"`,
        }));

      filter.setOptions(temp.reduce((a, c) => ({ ...a, [c.label]: c.value }), {}));

      return temp;
    }

    const getBucketCount = (value: string): number => {
      let count: number | CountAggregate = 0;

      if (aggregateFilters && Object.keys(aggregateFilters.buckets?.count ?? {}).includes(value)) {
        ({ count } = aggregateFilters.buckets);
      } else if (aggregates && Object.keys(aggregates.buckets?.count ?? {}).includes(value)) {
        ({ count } = aggregates.buckets);
      }

      if (isNumber(count)) {
        return 0;
      }

      return (count[value] as number) ?? 0;
    };

    return sortItems(Object.entries(filter.getOptions()), sort, sortAscending).map(([label, value]) => {
      const id = `${name}_${label}`;
      const count = getBucketCount(id);

      return { label, value, count } as FilterItem;
    });
  }, [JSON.stringify(response?.getResults())]);

  return {
    options,
    setSelected,
    selected,
    reset,
    multi: filter.isMulti(),
  };
}

export default useFilter;
export * from './types';
