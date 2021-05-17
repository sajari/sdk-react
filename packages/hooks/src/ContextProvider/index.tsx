/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-shadow */
import { createContext, isEmpty, isString } from '@sajari/react-sdk-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Config, defaultConfig } from './Config';
import {
  ClickTracking,
  FilterBuilder,
  FilterOptions,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilterBuilder,
  RangeFilterOptions,
  Response,
  Variables,
} from './controllers';
import combineFilters from './controllers/filters/combineFilters';
import { UnlistenFn } from './controllers/Listener';
import { EVENT_RANGE_UPDATED, EVENT_RESPONSE_UPDATED, EVENT_SELECTION_UPDATED, EVENT_VALUES_UPDATED } from './events';
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

// Map a serialized Response object back into a Response
const parseResponse = (initialResponse?: string) => {
  if (!isString(initialResponse) || isEmpty(initialResponse)) {
    return null;
  }

  const { queryValues = {}, response = {}, values = {} } = JSON.parse(initialResponse);

  return new Response(
    null,
    new Map(Object.entries(queryValues)),
    new Map(Object.entries(response)),
    new Map(Object.entries(values)),
  );
};

const ContextProvider: React.FC<SearchProviderValues> = ({
  children,
  search,
  autocomplete: autocompleteProp,
  defaultFilter,
  searchOnLoad,
  initialResponse: initialResponseProp,
}) => {
  const initialResponse = parseResponse(initialResponseProp);
  const [searching, setSearching] = useState(false);
  const [autocompleteSearching, setAutocompleteSearching] = useState(false);
  const [searchState, setSearchState] = useState({ ...defaultState, response: initialResponse });
  const [autocompleteState, setAutocompleteState] = useState(defaultState);
  const [configDone, setConfigDone] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();
  const searchAutocompleteTimer = useRef<ReturnType<typeof setTimeout>>();
  const autocomplete = useRef(autocompleteProp);
  const variables = useRef(search.variables ?? new Variables());
  const autocompleteVariables = useRef(autocompleteProp?.variables ?? new Variables());
  // Map the initial response
  let response = search.pipeline.getResponse();
  if (response.isEmpty() && initialResponse !== null) {
    response = initialResponse;
  }

  if (!search.variables && !configDone) {
    // For destructing down below (searchFn, clear, handlePaginate)
    Object.assign(search, { variables: variables.current });
  }
  if (autocompleteProp && !autocompleteProp.variables && !configDone) {
    // For destructing down below (searchFn, clear, handlePaginate)
    Object.assign(autocompleteProp, { variables: autocompleteVariables.current });
  }

  if (!configDone) {
    const filter = combineFilters(search.filters ?? []);
    const variablesFilterString = variables.current.get().filter ?? '';
    const defaultFilterString = defaultFilter?.toString() ?? '';

    variables.current.set({
      filter: () => {
        const expression = filter.filter();
        return [defaultFilterString, variablesFilterString, isEmpty(expression) ? '_id != ""' : expression]
          .filter(Boolean)
          .join(' AND ');
      },
      countFilters: () => filter.countFilters(),
      buckets: () => filter.buckets(),
      count: () => filter.count(),
      min: () => filter.min(),
      max: () => filter.max(),
    });
  }

  const searchFn = useCallback(
    (key: 'search' | 'autocomplete') => (inputQuery?: string, override = false) => {
      const func = key === 'autocomplete' ? autocomplete.current : search;
      const state = key === 'autocomplete' ? autocompleteState : searchState;
      const setSearchingState = key === 'autocomplete' ? setAutocompleteSearching : setSearching;
      const timer = key === 'autocomplete' ? searchAutocompleteTimer : searchTimer;
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

      if (timer.current) {
        clearTimeout(timer.current);
      }

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

    setAutocompleteState((state) => ({
      ...state,
      config: { ...defaultConfig, ...search.config },
    }));

    const unregisterFunctions: UnlistenFn[] = [];

    if (search.filters) {
      const filter = combineFilters(search.filters);

      unregisterFunctions.push(
        filter.listen(EVENT_SELECTION_UPDATED, () => searchFn('search')()),
        filter.listen(EVENT_RANGE_UPDATED, () => searchFn('search')()),
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

    if (!autocomplete.current) {
      const { account, collection, endpoint } = search.pipeline.config;
      autocomplete.current = {
        pipeline: new Pipeline({ account, collection, endpoint }, 'autocomplete'),
        variables: autocompleteVariables.current,
      };
    }

    unregisterFunctions.push(
      autocomplete.current.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
        setAutocompleteSearching(false);
        setAutocompleteState((prevState) => ({
          ...prevState,
          response,
          ...responseUpdatedListener(autocompleteVariables.current, prevState.config, response),
        }));
      }),
    );

    unregisterFunctions.push(
      autocompleteVariables.current.listen(EVENT_VALUES_UPDATED, () =>
        setAutocompleteState((prevState) => ({
          ...prevState,
          ...valuesUpdatedListener(
            autocompleteVariables.current,
            (autocomplete.current as ProviderPipelineConfig).pipeline,
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
    (key: 'search' | 'autocomplete') => (vals?: { [k: string]: string | undefined }) => {
      const func = key === 'autocomplete' ? autocomplete.current : search;
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
      setSearching(true);
      pipeline.search(variables.get());
    },
    [search.pipeline, search.variables, searchState.config],
  );

  const handleResultClicked = useCallback((url: string) => search.pipeline.emitResultClicked(url), []);

  const resetFilters = (emitEvent = true) => {
    search.filters?.forEach((f) => f?.reset(emitEvent));
  };

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
        resetFilters,
        fields: search.fields,
        searching,
      },
      autocomplete: {
        ...state.autocomplete,
        variables: autocompleteVariables.current,
        filters: search.filters,
        pipeline: autocomplete.current?.pipeline,
        search: searchFn('autocomplete'),
        clear: clear('autocomplete'),
        resetFilters,
        fields: autocomplete.current?.fields,
        searching: autocompleteSearching,
      },
      resultClicked: handleResultClicked,
      paginate: handlePaginate,
    } as Context);

  return <Provider value={getContext({ autocomplete: autocompleteState, search: searchState })}>{children}</Provider>;
};

export default ContextProvider;
export {
  ClickTracking,
  combineFilters,
  Config,
  FieldDictionary,
  FilterBuilder,
  FilterOptions,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilterBuilder,
  RangeFilterOptions,
  Response,
  useContext,
  Variables,
};
export type { SearchProviderValues };
