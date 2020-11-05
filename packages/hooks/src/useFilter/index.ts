import { CountAggregate } from '@sajari/sdk-js';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useContext } from '../SearchContextProvider';
import { EVENT_SELECTION_UPDATED } from '../SearchContextProvider/events';
import { FilterItem } from './types';

function useFilter(name: string) {
  const {
    search: { filters = [], response },
  } = useContext();

  const filter = useMemo(() => {
    return filters.filter((f) => f.getName() === name)[0];
  }, []);

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

  const options = useMemo(() => {
    let output: FilterItem[] = [];

    if (!response) {
      return [];
    }

    const aggregates = response.getAggregates();
    const aggregateFilters = response.getAggregateFilters();
    const fieldCount = filter.getCount();

    if (fieldCount) {
      const repeated = filter.isRepeated();
      let count = {};
      ({ count } = (aggregateFilters || {})[fieldCount] || {});
      if (!count) {
        ({ count = {} } = (aggregates || {})[fieldCount] || {});
      }

      // eslint-disable-next-line @typescript-eslint/no-shadow
      output = Object.entries(count).map(([label, count]: [string, number]) => ({
        label,
        count,
        value: repeated ? `${fieldCount} ~ ['${label}']` : `${fieldCount} = '${label}'`,
      }));

      filter.setOptions(output.reduce((a, c) => ({ ...a, [c.label]: c.value }), {}));

      return output;
    }

    const getBucketCount = (value: string): number => {
      let count: number | CountAggregate = 0;

      if (Object.keys(aggregateFilters?.buckets?.count ?? {}).includes(value)) {
        // @ts-ignore
        ({ count } = aggregateFilters?.buckets);
      } else if (Object.keys(aggregates?.buckets?.count ?? {}).includes(value)) {
        // @ts-ignore
        ({ count } = aggregates?.buckets);
      }

      if (typeof count === 'number') {
        return 0;
      }

      return (count[value] as number) ?? 0;
    };

    // Get items from aggregates for regular facets
    // or map the bucket types to title / filter format
    if (!aggregates?.buckets) {
      return [];
    }

    output = Object.entries(filter.getOptions()).map(([label, value]) => {
      const id = `${name}_${label}`;
      const count = getBucketCount(id);

      return { label, value, count } as FilterItem;
    });

    return output;
  }, [JSON.stringify(response?.getResults())]);

  const setSelected = useCallback((value: string[], merge: boolean = false) => {
    filter.set(value, merge);
  }, []);

  const reset = useCallback(() => {
    filter.reset();
  }, []);

  return {
    options,
    setSelected,
    selected,
    reset,
    multi: filter.isMulti(),
  };
}

export default useFilter;
