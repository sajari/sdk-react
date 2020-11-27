/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-shadow */
import { createContext, isEmpty } from '@sajari/react-sdk-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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
  ResultViewType,
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
  const [instantSearching, setInstantSearching] = useState(false);
  const [searchState, setSearchState] = useState(defaultState);
  const [instantState, setInstantState] = useState(defaultState);
  const [viewType, setViewType] = useState<ResultViewType>('list');
  const [configDone, setConfigDone] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();
  const searchInstantTimer = useRef<ReturnType<typeof setTimeout>>();
  const instant = useRef(instantProp);
  const response = search.pipeline.getResponse();

  if (!search.variables && !configDone) {
    Object.assign(search, { variables: new Variables() });
  }

  if (search.filters && !configDone) {
    const filter = combineFilters(search.filters);

    search.variables.set({
      filter: isEmpty(filter.filter()) ? '_id != ""' : () => filter.filter(),
      countFilters: () => filter.countFilters(),
      buckets: () => filter.buckets(),
      count: () => filter.count(),
    });
  }

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
      const { account, collection, endpoint } = search.pipeline.config;
      instant.current = {
        pipeline: new Pipeline({ account, collection, endpoint }, 'autocomplete', new NoTracking()),
        variables: new Variables(),
      };
    }

    unregisterFunctions.push(
      instant.current.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
        setInstantSearching(false);
        setInstantState((prevState) => ({
          ...prevState,
          response,
          ...responseUpdatedListener((instant.current as ProviderPipelineConfig).variables, prevState.config, response),
        }));
      }),
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

    setConfigDone(true);
    return () => {
      unregisterFunctions.forEach((fn) => fn());
    };
  }, []);

  const searchFn = useCallback(
    (key: 'search' | 'instant') => (inputQuery?: string, override: boolean = false) => {
      const func = key === 'instant' ? instant.current : search;
      const state = key === 'instant' ? instantState : searchState;
      const setSearchingState = key === 'instant' ? setInstantSearching : setSearching;
      const timer = key === 'instant' ? searchInstantTimer : searchTimer;
      setSearchingState(true);
      setSearchState((state) => ({ ...state, query: inputQuery ?? state.query }));
      const { pipeline, variables } = func as ProviderPipelineConfig;
      const { config } = state;

      const text = {
        [config.qParam]: inputQuery ?? variables.get()[config.qParam],
        [config.qOverrideParam]: undefined,
        [config.pageParam]: undefined,
      };

      // TODO(tuand): ask the backend the use of this property
      if (override) {
        text[config.qOverrideParam] = 'true';
      }

      variables.set(text);

      // @ts-ignore
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        pipeline.search(variables.get());
      }, 50);
    },
    [],
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
    const { config } = searchState;

    variables.set({ [config.pageParam]: String(page) });
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
        searching: instantSearching,
      },
      resultClicked: handleResultClicked,
      paginate: handlePaginate,
      viewType,
      setViewType,
    } as Context);

  return <Provider value={getContext({ instant: instantState, search: searchState })}>{children}</Provider>;
};

export default SearchContextProvider;
export { ClickTracking, FieldDictionary, Filter, Pipeline, PosNegTracking, Range, RangeFilter, useContext, Variables };
export type { SearchProviderValues };
