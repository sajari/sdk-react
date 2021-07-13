import { isNullOrUndefined } from '@sajari/react-sdk-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { RangeFilterBuilder, useContext } from '../ContextProvider';
import { Range } from '../ContextProvider/controllers/filters/types';
import { EVENT_RANGE_UPDATED } from '../ContextProvider/events';

function useRangeFilter(name: string) {
  const {
    search: { filters = [], response, query },
  } = useContext();

  const prevQuery = useRef<string | null>(null);
  const selectionUpdated = useRef<boolean>(false);
  const filter = useMemo(
    () => filters.filter((f) => f instanceof RangeFilterBuilder && f.getName() === name)[0] as RangeFilterBuilder,
    [],
  );
  const isAggregate = filter.isAggregate();
  const limit = filter.getMinMax();

  if (!filter) {
    throw new Error(`Filter "${name}" doesn't exist.`);
  }

  const [range, setInternalRange] = useState(filter.get());
  const [min, setMin] = useState<number>(limit[0]);
  const [max, setMax] = useState<number>(limit[1]);

  useEffect(() => {
    // Ignore the componentDidMount trigger, only call after the query was changed
    if (isAggregate && prevQuery.current !== null) {
      filter.reset(false);
    }
  }, [query]);

  useEffect(() => {
    const removeListener = filter.listen(EVENT_RANGE_UPDATED, () => {
      setInternalRange(filter.get());
    });

    return () => {
      removeListener();
    };
  }, []);

  const setRange = useCallback((value: Range) => {
    filter.set(value);
  }, []);

  const showReset = useMemo(() => {
    if (!range) {
      return false;
    }
    if (isAggregate) {
      return range[0] !== min || range[1] !== max;
    }

    return filter.hasChanged();
  }, [range, min, max]);

  const reset = () => {
    filter.reset();
  };

  useEffect(() => {
    if (!isAggregate || prevQuery.current === query || filter.getFrozen()) {
      prevQuery.current = query;
      return;
    }

    if (!response || response?.isEmpty()) {
      setMin(range ? range[0] : limit[0]);
      setMax(range ? range[1] : limit[1]);
      selectionUpdated.current = false;
      return;
    }

    const field = filter.getField();
    const aggregates = response.getAggregates();
    const aggregateFilters = response.getAggregateFilters();
    let newMin = 0;
    let newMax = 0;
    const aggregate = (aggregates || {})[field] || {};
    const aggregateFilter = (aggregateFilters || {})[field] || {};

    if (!isNullOrUndefined(aggregateFilter.min)) {
      newMin = aggregateFilter.min as number;
    } else if (!isNullOrUndefined(aggregate.min)) {
      newMin = aggregate.min as number;
    }

    if (!isNullOrUndefined(aggregateFilter.max)) {
      newMax = aggregateFilter.max as number;
    } else if (!isNullOrUndefined(aggregate.max)) {
      newMax = aggregate.max as number;
    }

    [newMin, newMax] = filter.format([newMin, newMax]);

    setMin(newMin);
    setMax(newMax);

    // Set the filter
    filter.setMin(newMin);
    filter.setMax(newMax);

    filter.set([newMin, newMax], false);
    setInternalRange([newMin, newMax]);

    prevQuery.current = query;
  }, [JSON.stringify(response?.getResults())]);

  return {
    min,
    max,
    step: filter.getStep(),
    setRange,
    range,
    reset,
    showReset,
  };
}

export default useRangeFilter;
