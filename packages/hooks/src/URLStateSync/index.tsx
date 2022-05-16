import React, { useEffect, useRef } from 'react';

import { FilterBuilder, Range } from '../ContextProvider';
import useFilter from '../useFilter';
import useQuery from '../useQuery';
import useQueryParam from '../useQueryParam';
import useRangeFilter from '../useRangeFilter';
import useResultsPerPage from '../useResultsPerPage';
import useSearchContext from '../useSearchContext';
import useSorting from '../useSorting';
import { getSearchParams, isRange, paramToRange, rangeToParam } from '../utils/queryParams';
import { FilterWatcherProps, ParamWatcherProps, QueryParam, RangeFilterWatcherProps, URLStateSyncProps } from './types';

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

const ParamWatcher = ({ delay, replace, queryParam }: ParamWatcherProps) => {
  const { key, callback, defaultValue, value } = queryParam;

  const setParam = useQueryParam(key, {
    debounce: delay,
    replace,
    defaultValue,
    callback: replace ? undefined : callback,
  });

  useEffect(() => {
    setParam(value);
  }, [value]);

  return null;
};

const URLStateSync = ({ delay = 500, replace = false, extendedParams = [] }: URLStateSyncProps = {}) => {
  const {
    filters: filterBuilders = [],
    config: { qParam = 'q' },
  } = useSearchContext();
  const { query, setQuery } = useQuery();
  const { sorting, setSorting } = useSorting();
  const { resultsPerPage, setResultsPerPage } = useResultsPerPage();
  const params = getSearchParams();
  const paramWatchers: QueryParam[] = [
    {
      key: qParam,
      value: query,
      callback: setQuery,
    },
    {
      key: 'sort',
      value: sorting,
      callback: setSorting,
    },
    {
      key: 'show',
      value: resultsPerPage,
      defaultValue: 15,
      callback: (value) => {
        setResultsPerPage(Number(value) || 15);
      },
    },
    ...extendedParams.filter(({ key }) => ![qParam, 'sort', 'show'].includes(key)),
  ];

  useEffect(() => {
    filterBuilders.forEach((filter) => {
      if (filter instanceof FilterBuilder) {
        const key = filter.getField() || filter.getName();
        const value = params[key] || '';
        filter.set(value ? value.split(',') : []);
      }
    });
    paramWatchers.forEach(({ key, callback }) => {
      if (params[key] && callback) {
        callback(params[key]);
      }
    });
  }, []);

  return (
    <React.Fragment>
      {filterBuilders.map((filter) => {
        return filter instanceof FilterBuilder ? (
          <FilterWatcher key={filter.getField()} {...{ replace, delay, filter }} />
        ) : (
          <RangeFilterWatcher key={filter.getField()} {...{ replace, delay, filter }} />
        );
      })}
      {paramWatchers.map((queryParam) => (
        <ParamWatcher key={queryParam.key} {...{ replace, delay, queryParam }} />
      ))}
    </React.Fragment>
  );
};

export default URLStateSync;
export * from './types';
