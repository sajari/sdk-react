import { useEffect, useMemo, useState } from 'react';

import { FilterBuilder, useContext } from '../ContextProvider';
import { EVENT_SELECTION_UPDATED } from '../ContextProvider/events';
import { getBucketCount } from '../utils';
import { FilterItem, SortType } from './types';
import { filterItems, sortItems } from './utils';

function useFilter(
  name: string,
  params: {
    sort?: SortType;
    sortAscending?: boolean;
    includes?: string[];
    excludes?: string[];
    prefixFilter?: string;
  } = {},
) {
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

  const { sort = 'alpha', sortAscending = sort !== 'count', includes, excludes, prefixFilter } = params;

  const options: FilterItem[] = useMemo(() => {
    if (!response || response?.isEmpty()) {
      return [];
    }

    const aggregates = response.getAggregates();
    const aggregateFilters = response.getAggregateFilters();
    const isCount = filter.getCount();
    const field = filter.getField();

    if (isCount && field) {
      const array = filter.isArray();
      let count = {};
      ({ count } = (aggregateFilters || {})[field] || {});
      if (!count) {
        ({ count = {} } = (aggregates || {})[field] || {});
      }

      const temp = filterItems(sortItems(Object.entries(count), sort, sortAscending), {
        includes,
        excludes,
        prefixFilter,
      }).map(({ count: itemCount, label, value }) => ({
        label,
        count: itemCount,
        value: array ? `${field} ~ ["${value}"]` : `${field} = "${value}"`,
      }));

      filter.setOptions(temp.reduce((a, c) => ({ ...a, [c.label]: c.value }), {}));

      return temp;
    }

    return sortItems(Object.entries(filter.getOptions()), sort, sortAscending).map(([label, value]) => {
      const id = `${name}_${label}`;
      const count = getBucketCount(response, id);

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
