/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useState } from 'react';

import { useContext } from '../ContextProvider';
import { defaultConfig } from '../ContextProvider/Config';
import { Response } from '../ContextProvider/controllers';
import { EVENT_RESPONSE_UPDATED, EVENT_VALUES_UPDATED } from '../ContextProvider/events';
import { UseSearchConfig, UseSearchCustomConfig, UseSearchParams, UseSearchResult } from './types';

function useCustomSearch({ pipeline, variables }: UseSearchCustomConfig): UseSearchResult {
  const [searching, setSearching] = useState(false);
  const searchFn = useCallback(
    (q?: string) => {
      setSearching(true);

      if (q === '') {
        pipeline.clearResponse(variables.get());
      } else {
        if (q) {
          variables.set({ [defaultConfig.qParam]: q });
        }
        pipeline.search(variables.get());
      }
    },
    [pipeline, variables],
  );

  const [searchOutput, setSearchOutput] = useState<Omit<UseSearchResult, 'searching'>>({
    search: searchFn,
    error: null,
    redirects: {},
    activePromotions: [],
    featureScoreWeight: 0,
    banners: [],
  });

  useEffect(() => {
    searchFn();

    return pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
      setSearching(false);

      setSearchOutput((o) => ({
        ...o,
        results: response?.getResults(),
        latency: response?.getTime(),
        totalResults: response?.getTotalResults(),
        error: response?.getError(),
        redirects: response.getRedirects() ?? {},
        activePromotions: response.getActivePromotions() ?? [],
        featureScoreWeight: response.getFeatureScoreWeight() ?? 0,
        banners: response.getBanners() ?? [],
        queryId: response.getQueryId(),
      }));
    });
  }, []);

  useEffect(
    () =>
      variables.listen(EVENT_VALUES_UPDATED, () => {
        searchFn();
      }),
    [],
  );

  return { ...searchOutput, searching };
}

function useNormalSearch({ queryOverride, allowEmptySearch = true }: UseSearchConfig): UseSearchResult {
  const [error, setError] = useState<Error | null>(null);
  const {
    search: { searching, response, search },
    autocomplete: { search: searchInstantFn, suggestions, redirects },
  } = useContext();

  const results = response?.getResults();
  const searchInstant = useCallback((q: string) => searchInstantFn(q), []);

  useEffect(() => {
    if (queryOverride !== undefined) {
      if (allowEmptySearch || queryOverride !== '') {
        search(queryOverride);
      }
    } else {
      search();
    }
  }, [queryOverride]);

  useEffect(() => {
    if (response) {
      switch (true) {
        case response.isError():
          setError(response.getError()?.error ?? new Error('Something went wrong. Please try again.'));
          break;

        case !response.isError():
          setError(null);
          break;

        default:
          break;
      }
    }
  }, [response]);

  return {
    latency: response?.getTime(),
    totalResults: response?.getTotalResults(),
    suggestions: suggestions ?? [],
    redirects,
    activePromotions: response?.getActivePromotions() ?? [],
    featureScoreWeight: response?.getFeatureScoreWeight() ?? 0,
    results,
    search,
    searchInstant,
    searching,
    error,
    banners: response?.getBanners() ?? [],
    queryId: response?.getQueryId(),
  };
}

function useSearch(params?: UseSearchParams) {
  if (typeof params === 'object' && 'pipeline' in params && 'variables' in params) {
    return useCustomSearch(params);
  }

  return useNormalSearch(params ?? {});
}

export default useSearch;
export * from './types';
