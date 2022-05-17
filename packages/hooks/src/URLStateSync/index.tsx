import React, { ReactElement, useEffect, useRef, useState } from 'react';

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

const getRandomKey = () => Math.floor(Math.random() * 1000000000000);

const withRemountOnPopstate = <TProps,>(Component: (props: TProps) => ReactElement) => (props: TProps) => {
  const [key, setKey] = useState(getRandomKey());

  useEffect(() => {
    const renewKey = () => {
      setKey(getRandomKey());
    };

    window.addEventListener('popstate', renewKey);

    return () => {
      window.removeEventListener('popstate', renewKey);
    };
  }, []);

  return (
    <div key={key}>
      <Component {...props} />
    </div>
  );
};

const FilterWatcher = ({ filter, replace, delay }: FilterWatcherProps) => {
  const key = filter.getField() || filter.getName();
  const name = filter.getName();
  const { selected } = useFilter(name);
  const params = getSearchParams();
  const setFilterParam = useQueryParam(key, {
    debounce: delay,
    replace,
  });

  useEffect(() => {
    setFilterParam(selected);
  }, [selected]);

  const filterKey = filter.getField() || filter.getName();
  const value = params[filterKey] || '';

  useEffect(() => {
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
  const params = getSearchParams();

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

  useEffect(() => {
    const filterKey = filter.getField() || filter.getName();
    const value = params[filterKey] || '';
    const initialRange = paramToRange(value);
    const limit = (params[`${filterKey}_min_max`] || '').split(':').map(Number) as Range;
    if (isRange(initialRange)) {
      filter.set(initialRange as Range);
    }
    if (isRange(limit)) {
      filter.setMin(limit[0]);
      filter.setMax(limit[1]);
      // Freeze the state of the filterBuilder to avoid the UI from being overridden at the first response
      filter.setFrozen(true);
    }
  }, []);

  return null;
};

const ParamWatcher = ({ delay, replace, queryParam }: ParamWatcherProps) => {
  const { key, defaultValue, value } = queryParam;
  const params = getSearchParams();

  const setParam = useQueryParam(key, {
    debounce: delay,
    replace,
    defaultValue,
  });

  useEffect(() => {
    queryParam.callback?.(params[key]);
  }, []);

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

export default withRemountOnPopstate(URLStateSync);
export * from './types';
