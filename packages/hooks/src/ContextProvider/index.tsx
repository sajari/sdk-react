/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-shadow */
import { createContext, isEmpty } from '@sajari/react-sdk-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Config, defaultConfig } from './config';
import {
  ClickTracking,
  FilterBuilder,
  NoTracking,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilterBuilder,
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

const ContextProvider: React.FC<SearchProviderValues> = ({ children, search, instant: instantProp, searchOnLoad }) => {
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
  const variables = useRef(search.variables ?? new Variables());
  const instantVariables = useRef(instantProp?.variables ?? new Variables());

  if (!search.variables && !configDone) {
    // For destructing down below (searchFn, clear, handlePaginate)
    Object.assign(search, { variables: variables.current });
  }
  if (instantProp && !instantProp.variables && !configDone) {
    // For destructing down below (searchFn, clear, handlePaginate)
    Object.assign(instantProp, { variables: instantVariables.current });
  }

  if (search.filters && !configDone) {
    const filter = combineFilters(search.filters);

    variables.current.set({
      filter: isEmpty(filter.filter()) ? '_id != ""' : () => filter.filter(),
      countFilters: () => filter.countFilters(),
      buckets: () => filter.buckets(),
      count: () => filter.count(),
    });
  }

  const searchFn = useCallback(
    (key: 'search' | 'instant') => (inputQuery?: string, override: boolean = false) => {
      const func = key === 'instant' ? instant.current : search;
      const state = key === 'instant' ? instantState : searchState;
      const setSearchingState = key === 'instant' ? setInstantSearching : setSearching;
      const timer = key === 'instant' ? searchInstantTimer : searchTimer;
      setSearchingState(true);
      setSearchState((state) => ({ ...state, query: inputQuery ?? state.query }));
      const { pipeline, variables } = func as Required<ProviderPipelineConfig>;
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

  useEffect(() => {
    const mergedConfig = { ...defaultConfig, ...search.config };
    setSearchState((state) => ({
      ...state,
      response,
      query: variables.current.get()[mergedConfig.qParam] || '',
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
        filter.listen(EVENT_SELECTION_UPDATED, () => searchFn('search')()),
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
              ...responseUpdatedListener(variables.current, prevState.config, response),
            }));
          },
          // Delay slightly longer if no results so if someone is typing they don't get a flash of no results
          response.getResults()?.length === 0 ? 500 : 20,
        );
      }),
    );

    unregisterFunctions.push(
      variables.current.listen(EVENT_VALUES_UPDATED, () =>
        setSearchState((prevState) => ({
          ...prevState,
          ...valuesUpdatedListener(variables.current, search.pipeline, prevState.config),
        })),
      ),
    );

    if (!instant.current) {
      const { account, collection, endpoint } = search.pipeline.config;
      instant.current = {
        pipeline: new Pipeline({ account, collection, endpoint }, 'autocomplete', new NoTracking()),
        variables: instantVariables.current,
      };
    }

    unregisterFunctions.push(
      instant.current.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
        setInstantSearching(false);
        setInstantState((prevState) => ({
          ...prevState,
          response,
          ...responseUpdatedListener(instantVariables.current, prevState.config, response),
        }));
      }),
    );

    unregisterFunctions.push(
      instantVariables.current.listen(EVENT_VALUES_UPDATED, () =>
        setInstantState((prevState) => ({
          ...prevState,
          ...valuesUpdatedListener(
            instantVariables.current,
            (instant.current as ProviderPipelineConfig).pipeline,
            prevState.config,
          ),
        })),
      ),
    );

    if (searchOnLoad) {
      search.pipeline.search(variables.current.get());
    }

    setConfigDone(true);
    return () => {
      unregisterFunctions.forEach((fn) => fn());
    };
  }, []);

  const clear = useCallback(
    (key: 'search' | 'instant') => (vals?: { [k: string]: string | undefined }) => {
      const func = key === 'instant' ? instant.current : search;
      const { pipeline, variables } = func as Required<ProviderPipelineConfig>;

      if (vals !== undefined) {
        variables.set(vals);
      }
      pipeline.clearResponse(variables.get());
    },
    [],
  );

  const handlePaginate = useCallback(
    (page: number) => {
      const { pipeline, variables } = search as Required<ProviderPipelineConfig>;
      const { config } = searchState;

      variables.set({ [config.pageParam]: String(page) });
      pipeline.search(variables.get());
    },
    [search.pipeline, search.variables, searchState.config],
  );

  const handleResultClicked = useCallback((url: string) => search.pipeline.emitResultClicked(url), []);

  const getContext = (state: PipelineProviderState) =>
    ({
      ...state,
      search: {
        ...state.search,
        variables: variables.current,
        filters: search.filters,
        pipeline: search.pipeline,
        search: searchFn('search'),
        clear: clear('search'),
        fields: search.fields,
        searching,
      },
      instant: {
        ...state.instant,
        variables: instantVariables.current,
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

export default ContextProvider;
export {
  ClickTracking,
  FieldDictionary,
  FilterBuilder,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilterBuilder,
  useContext,
  Variables,
};
export type { SearchProviderValues };
