/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useState } from 'react';

import { useContext } from '../SearchContextProvider';
import { Pipeline, Response, Values } from '../SearchContextProvider/controllers';
import { EVENT_RESPONSE_UPDATED } from '../SearchContextProvider/events';
import { FieldDictionary } from '../SearchContextProvider/types';
import debounce from '../utils/debounce';
import mapResultFields from '../utils/mapResultFields';
import mapToObject from '../utils/mapToObject';

// Returns results for the current query
function useSearchDefaultQuery<T>() {
  const {
    search: { response, pipeline, values, query, fields = {} },
  } = useContext();

  const { time: latency, totalResults } = mapToObject<{ time?: number; totalResults?: number }>(
    response?.getResponse() as Map<string, any> | undefined,
  );
  const reqResults = response?.getResults();

  const searchFn = useCallback(
    debounce((q: string) => {
      if (q) {
        pipeline.search(values.get());
      } else {
        pipeline.clearResponse(values.get());
      }
    }, 50),
    [],
  );

  useEffect(() => {
    searchFn(query);
  }, [query]);

  return {
    results: reqResults ? mapResultFields<T>(reqResults, fields) : undefined,
    latency,
    totalResults,
  };
}

// Returns results for a given query
function useSearchCustomQuery<T>(query: string) {
  const {
    search: { response, search, fields = {} },
  } = useContext();

  useEffect(() => {
    search(query, true);
  }, [query]);

  const { time: latency, totalResults } = mapToObject<{ time?: number; totalResults?: number }>(
    response?.getResponse() as Map<string, any> | undefined,
  );
  const reqResults = response?.getResults();

  return {
    results: reqResults ? mapResultFields<T>(reqResults, fields) : undefined,
    latency,
    totalResults,
  };
}

// Returns results for pass in Values and Pipeline
function useSearchCustomPipeline<T>(values: Values, pipeline: Pipeline, fields?: FieldDictionary) {
  // TODO: dirty way to get the return type of a generic function
  function inferTypeFunction(...args) {
    // @ts-ignore
    return mapResultFields<T>(...args);
  }

  const [searchOutput, setSearchOutput] = useState<{
    results?: ReturnType<typeof inferTypeFunction>;
    latency?: number;
    totalResults?: number;
  }>({});

  useEffect(() => {
    pipeline.search(values.get());

    return pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
      const { time: latency, totalResults } = mapToObject<{ time?: number; totalResults?: number }>(
        response?.getResponse() as Map<string, any> | undefined,
      );

      const reqResults = response?.getResults();
      const results = reqResults ? mapResultFields<T>(reqResults, fields || {}) : undefined;

      setSearchOutput({ results, latency, totalResults });
    });
  }, []);

  return searchOutput;
}

function useSearch<T = Record<string, string | string[]>>(
  ...args: [] | [string] | [Values, Pipeline, FieldDictionary]
) {
  if (args[0] instanceof Values && args[1] instanceof Pipeline && args[2]) {
    return useSearchCustomPipeline<T>(args[0], args[1], args[2]);
  }

  if (typeof args[0] === 'string') {
    return useSearchCustomQuery<T>(args[0]);
  }

  return useSearchDefaultQuery<T>();
}

export default useSearch;
