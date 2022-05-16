import React, { useEffect, useRef } from 'react';

import { FilterBuilder, Range } from '../ContextProvider';
import useFilter from '../useFilter';
import useQueryParam from '../useQueryParam';
import useRangeFilter from '../useRangeFilter';
import useSearchContext from '../useSearchContext';
import { getSearchParams, isRange, paramToRange, rangeToParam } from '../utils/queryParams';
import { FilterWatcherProps, RangeFilterWatcherProps, URLStateSyncProps } from './types';

const FilterWatcher = ({ filter, replace, delay }: FilterWatcherProps) => {
  const key = filter.getField() || filter.getName();
  const name = filter.getName();
  const { setSelected, selected } = useFilter(name);
  const setFilterParam = useQueryParam(key, {
    debounce: delay,
    replace,
    callback: replace
      ? undefined
      : (value) => {
          setSelected(value === '' ? [] : value.split(','));
        },
  });

  useEffect(() => {
    setFilterParam(selected);
  }, [selected]);

  useEffect(() => {
    const params = getSearchParams();
    const filterKey = filter.getField() || filter.getName();
    const value = params[filterKey] || '';
    filter.set(value ? value.split(',') : []);
  }, []);

  return null;
};

const RangeFilterWatcher = ({ filter, replace, delay }: RangeFilterWatcherProps) => {
  const key = filter.getField() || filter.getName();
  const name = filter.getName();
  const { range, setRange, min, max, reset } = useRangeFilter(name);
  const allowSetParam = useRef(false);
  const { response, results } = useSearchContext();

  const setFilterParam = useQueryParam(key, {
    debounce: delay,
    replace,
    callback: replace
      ? undefined
      : (value) => {
          const rangeValue = paramToRange(value);
          if (!isRange(rangeValue) || rangeValue[0] === rangeValue[1]) {
            if (filter.isAggregate()) {
              // if aggregate, call reset to set range "null"
              reset();
            } else {
              setRange([min, max]);
            }
          } else {
            setRange(rangeValue as Range);
          }
        },
  });

  const setMinMaxParam = useQueryParam(`${key}_min_max`, {
    debounce: delay,
    // Prevent min_max from being a part of the history
    replace: true,
  });

  useEffect(() => {
    if (allowSetParam.current) {
      if (range) {
        const shouldSetNewValue = range[0] !== min || range[1] !== max;
        setFilterParam(shouldSetNewValue ? rangeToParam(range) : '');
        if (filter.isAggregate()) {
          setMinMaxParam(shouldSetNewValue ? filter.getMinMax().join(':') : '');
        }
      } else {
        setMinMaxParam('');
        setFilterParam('');
      }
    }
  }, [range]);

  useEffect(() => {
    // We don't want to populate the params in the URL when there is no interation with the app
    if (response) {
      allowSetParam.current = true;
    }
  }, [response]);

  useEffect(() => {
    if (results && filter.getFrozen()) {
      // wait for the cycle of React to end then releasing the frozen state
      setTimeout(() => {
        filter.setFrozen(false);
      });
    }
  }, [results]);

  return null;
};

const URLStateSync = ({ delay = 500, replace = false }: URLStateSyncProps = {}) => {
  const { filters: filterBuilders = [] } = useSearchContext();

  return (
    <React.Fragment>
      {filterBuilders.map((filter) => {
        return filter instanceof FilterBuilder ? (
          <FilterWatcher key={filter.getField()} {...{ replace, delay, filter }} />
        ) : (
          <RangeFilterWatcher key={filter.getField()} {...{ replace, delay, filter }} />
        );
      })}
    </React.Fragment>
  );
};

export default URLStateSync;
export * from './types';
