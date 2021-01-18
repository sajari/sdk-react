import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FilterBuilder, RangeFilterBuilder, useContext } from '../ContextProvider';
import { Range } from '../ContextProvider/controllers/filters/types';
import { EVENT_MINMAX_UPDATED, EVENT_RANGE_UPDATED, EVENT_SELECTION_UPDATED } from '../ContextProvider/events';

function useRangeFilter(name: string) {
  const {
    search: { filters = [], response, query },
  } = useContext();
  const filter = useMemo(
    () => filters.filter((f) => f instanceof RangeFilterBuilder && f.getName() === name)[0] as RangeFilterBuilder,
    [],
  );
  const isStatic = filter.getIsStatic();
  const prevQuery = useRef<string | null>(null);
  const selectionUpdated = useRef<boolean>(false);
  const isAggregate = filter.isAggregate();
  const limit = filter.getMinMax();

  if (!filter) {
    throw new Error(`Filter "${name}" doesn't exist.`);
  }

  const [range, setInternalRange] = useState(filter.get());
  const [min, setMin] = useState<number>(limit[0]);
  const [max, setMax] = useState<number>(limit[1]);

  useEffect(() => {
    filter.listen(EVENT_MINMAX_UPDATED, () => {
      const [minValue, maxValue] = filter.getMinMax();
      setMin(minValue);
      setMax(maxValue);
    });
  }, []);

  useEffect(() => {
    if (!isStatic) {
      filter.reset(false);
    }
  }, [query]);

  useEffect(() => {
    if (!isAggregate) {
      return () => {};
    }

    const removeListeners = filters
      .filter((f) => f instanceof FilterBuilder)
      .map((f) =>
        f.listen(EVENT_SELECTION_UPDATED, () => {
          filter.reset(false);
          selectionUpdated.current = true;
        }),
      );

    return () => {
      removeListeners.forEach((f) => f());
    };
  }, []);

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
    if (isAggregate) {
      filter.set([...filter.getMinMax()] as Range);
    } else {
      filter.reset();
    }
  };

  useEffect(() => {
    if (!isAggregate || isStatic) {
      return;
    }

    if (!response || response?.isEmpty()) {
      setMin(range ? range[0] : limit[0]);
      setMax(range ? range[1] : limit[1]);
      prevQuery.current = query;
      selectionUpdated.current = false;
      return;
    }

    const aggregates = response.getAggregates();
    let newMin = 0;
    let newMax = 0;
    const field = filter.getField();
    const fieldAggregate = (aggregates || {})[field] || {};
    newMin = fieldAggregate.min as number;
    newMax = fieldAggregate.max as number;

    if (!newMin) {
      newMin = 0;
    }
    if (!newMax) {
      newMax = 0;
    }

    if (query !== prevQuery.current || !range || selectionUpdated.current) {
      const formattedLimit = filter.format([newMin, newMax]);
      setMin(formattedLimit[0]);
      setMax(formattedLimit[1]);
      filter.setMin(formattedLimit[0], false);
      filter.setMax(formattedLimit[1], false);

      // attempt to retain the last range
      const newRangeLeft =
        range && range[0] > formattedLimit[0] && range[0] <= formattedLimit[1] ? range[0] : formattedLimit[0];
      const newRangeRight =
        range && range[1] < formattedLimit[1] && range[1] >= formattedLimit[0] ? range[1] : formattedLimit[1];

      const newRange: Range = [newRangeLeft, newRangeRight];

      filter.set(newRange, false);
      setInternalRange(newRange);
    }

    prevQuery.current = query;
    selectionUpdated.current = false;
  }, [JSON.stringify(response?.getResults()), isStatic]);

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
