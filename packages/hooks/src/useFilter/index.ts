import { isNumber } from '@sajari/react-sdk-utils';
import { CountAggregate } from '@sajari/sdk-js';
import { useEffect, useMemo, useState } from 'react';

import { useContext } from '../SearchContextProvider';
import { EVENT_SELECTION_UPDATED } from '../SearchContextProvider/events';
import { FilterItem } from './types';

function useFilter(name: string) {
  const {
    search: { filters = [], response, searching },
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

  const setSelected = (value: string[], merge: boolean = false) => {
    filter.set(value, merge);
  };

  const reset = () => {
    filter.reset();
  };

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

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const temp = Object.entries(count).map(([label, count]: [string, number]) => ({
        label,
        count,
        value: array ? `${fieldCount} ~ ["${label}"]` : `${fieldCount} = "${label}"`,
      }));

      filter.setOptions(temp.reduce((a, c) => ({ ...a, [c.label]: c.value }), {}));

      return temp;
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

      if (isNumber(count)) {
        return 0;
      }

      return (count[value] as number) ?? 0;
    };

    // Get items from aggregates for regular facets
    // or map the bucket types to title / filter format
    if (!aggregates?.buckets) {
      return [];
    }

    return Object.entries(filter.getOptions()).map(([label, value]) => {
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
export type { FilterItem };
