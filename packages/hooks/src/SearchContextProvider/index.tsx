/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-shadow */
import { createContext } from '@sajari/react-sdk-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { isEmpty } from '../utils/assertion';
import debounce from '../utils/debounce';
import { Config, defaultConfig } from './config';
import {
  ClickTracking,
  Filter,
  NoTracking,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilter,
  Response,
  Variables,
} from './controllers';
import combineFilters from './controllers/filters/combineFilters';
import { UnlistenFn } from './controllers/listener';
import { EVENT_RESPONSE_UPDATED, EVENT_SELECTION_UPDATED, EVENT_VALUES_UPDATED } from './events';
import {
  Context,
  FieldDictionary,
  PipelineProviderState,
  ProviderPipelineConfig,
  ProviderPipelineState,
  SearchProviderValues,
} from './types';

const updateState = (query: string, responseValues: Map<string, string> | undefined, config: Config) => {
  const completion = query && responseValues ? responseValues.get(config.qParam) || '' : '';
  let suggestions: string[] = [];
  if (responseValues) {
    suggestions = (responseValues.get(config.qSuggestionsParam) || '')
      .split(',')
      .filter((s) => s.length > 0)
      .slice(0, config.maxSuggestions);
  }

  return {
    completion,
    query,
    suggestions,
  };
};

const responseUpdatedListener = (variables: Variables, config: Config, response: Response) => {
  const query = variables.get()[config.qParam] || '';
  const responseValues = response.getValues();

  return updateState(query, responseValues, config);
};

const valuesUpdatedListener = (variables: Variables, pipeline: Pipeline, config: Config) => {
  const query = variables.get()[config.qParam] || '';
  const responseValues = pipeline.getResponse().getValues();

  return updateState(query, responseValues, config);
};

const [Provider, useContext] = createContext<Context>({
  strict: true,
  name: 'PipelineContext',
});

const defaultState: ProviderPipelineState = {
  response: null,
  query: '',
  completion: '',
  suggestions: [],
  config: defaultConfig,
};

const SearchContextProvider: React.FC<SearchProviderValues> = ({
  children,
  search,
  instant: instantProp,
  searchOnLoad,
}) => {
  const [searching, setSearching] = useState(false);
  const [searchState, setSearchState] = useState(defaultState);
  const [instantState, setInstantState] = useState(defaultState);
  const instant = useRef(instantProp);
  const response = search.pipeline.getResponse();

  useEffect(() => {
    const mergedConfig = { ...defaultConfig, ...search.config };
    setSearchState((state) => ({
      ...state,
      response,
      query: search.variables.get()[mergedConfig.qParam] || '',
      config: mergedConfig,
    }));

    setInstantState((state) => ({
      ...state,
      config: { ...defaultConfig, ...search.config },
    }));

    const unregisterFunctions: UnlistenFn[] = [];

    if (search.filters) {
      const filter = combineFilters(search.filters);

      unregisterFunctions.push(
        filter.listen(EVENT_SELECTION_UPDATED, () => search.pipeline.search(search.variables.get())),
        filter.removeChildFilterListeners,
      );

      search.variables.set({
        filter: () => filter.filter(),
        countFilters: () => filter.countFilters(),
        buckets: () => filter.buckets(),
        count: () => filter.count(),
      });
    }

    let searchRenderTimer: ReturnType<typeof setTimeout>;

    unregisterFunctions.push(
      search.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
        clearTimeout(searchRenderTimer);

        searchRenderTimer = setTimeout(
          () => {
            setSearching(false);
            setSearchState((prevState) => ({
              ...prevState,
              response,
              ...responseUpdatedListener(search.variables, prevState.config, response),
            }));
          },
          // Delay slightly longer if no results so if someone is typing they don't get a flash of no results
          response.getResults()?.length === 0 ? 500 : 20,
        );
      }),
    );

    unregisterFunctions.push(
      search.variables.listen(EVENT_VALUES_UPDATED, () =>
        setSearchState((prevState) => ({
          ...prevState,
          ...valuesUpdatedListener(search.variables, search.pipeline, prevState.config),
        })),
      ),
    );

    if (!instant.current) {
      const { project, collection, endpoint } = search.pipeline.config;
      instant.current = {
        pipeline: new Pipeline({ project, collection, endpoint }, 'autocomplete', new NoTracking()),
        variables: new Variables(),
      };
    }

    unregisterFunctions.push(
      instant.current.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) =>
        setInstantState((prevState) => ({
          ...prevState,
          response,
          ...responseUpdatedListener((instant.current as ProviderPipelineConfig).variables, prevState.config, response),
        })),
      ),
    );

    unregisterFunctions.push(
      instant.current.variables.listen(EVENT_VALUES_UPDATED, () =>
        setInstantState((prevState) => ({
          ...prevState,
          ...valuesUpdatedListener(
            (instant.current as ProviderPipelineConfig).variables,
            (instant.current as ProviderPipelineConfig).pipeline,
            prevState.config,
          ),
        })),
      ),
    );

    if (searchOnLoad) {
      search.pipeline.search(search.variables.get());
    }

    return () => {
      unregisterFunctions.forEach((fn) => fn());
    };
  }, []);

  const searchFn = useCallback(
    (key: 'search' | 'instant') =>
      debounce((inputQuery?: string, override: boolean = false) => {
        if (!searching) {
          setSearching(true);
        }
        const func = key === 'instant' ? instant.current : search;
        const state = key === 'instant' ? instantState : searchState;
        const { pipeline, variables } = func as ProviderPipelineConfig;
        const { config } = state;

        const text = {
          [config.qParam]: inputQuery ?? searchState.query,
          [config.qOverrideParam]: undefined,
        };

        if (override) {
          text[config.qOverrideParam] = 'true';
        }

        variables.set(text);
        const { filter } = variables.get();
        if (isEmpty(filter)) {
          variables.set({ filter: '_id != ""' });
        }
        pipeline.search(variables.get());
      }, 50),
    [searchState.query],
  );

  const clear = useCallback(
    (key: 'search' | 'instant') => (vals?: { [k: string]: string | undefined }) => {
      const func = key === 'instant' ? instant.current : search;
      const { pipeline, variables } = func as ProviderPipelineConfig;

      if (vals !== undefined) {
        variables.set(vals);
      }
      pipeline.clearResponse(variables.get());
    },
    [],
  );

  const handlePaginate = (page: number) => {
    const { pipeline, variables } = search;

    variables.set({ page: String(page) });
    pipeline.search(variables.get());
  };

  const handleResultClicked = useCallback((url: string) => search.pipeline.emitResultClicked(url), []);

  const getContext = (state: PipelineProviderState) =>
    ({
      ...state,
      search: {
        ...state.search,
        variables: search.variables,
        filters: search.filters,
        pipeline: search.pipeline,
        search: searchFn('search'),
        clear: clear('search'),
        fields: search.fields,
        searching,
      },
      instant: {
        ...state.instant,
        variables: instant.current?.variables,
        filters: search.filters,
        pipeline: instant.current?.pipeline,
        search: searchFn('instant'),
        clear: clear('instant'),
        fields: instant.current?.fields,
      },
      resultClicked: handleResultClicked,
      paginate: handlePaginate,
    } as Context);

  return <Provider value={getContext({ instant: instantState, search: searchState })}>{children}</Provider>;
};

export default SearchContextProvider;
export { ClickTracking, PosNegTracking, useContext, Pipeline, Variables, RangeFilter, Range, Filter, FieldDictionary };
export type { SearchProviderValues };
