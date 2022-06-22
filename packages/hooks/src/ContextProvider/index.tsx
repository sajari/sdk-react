/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-shadow */
import { getSearchParams, isEmpty, isNumber, isString } from '@sajari/react-sdk-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import URLStateSync from '../URLStateSync';
import { initFiltersFromURLState, initVariableFromURLState } from '../utils/queryParams';
import { Config, defaultConfig } from './Config';
import { Provider, useContext } from './context';
import {
  ClickTracking,
  EventTracking,
  FilterBuilder,
  FilterOptions,
  NoTracking,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilterBuilder,
  RangeFilterOptions,
  Response,
  Tracking,
  VariableFieldValue,
  VariableFn,
  Variables,
  VariablesMap,
  VariablesObject,
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
  ResultClickedFn,
  ResultValues,
  SearchProviderValues,
} from './types';

const updateState = (query: string, response: Response, config: Config): Partial<ProviderPipelineState> => {
  const responseValues = response.getValues();
  const completion = (query && responseValues ? responseValues.get(config.qParam) || '' : '') as string;
  let suggestions: string[] = [];
  if (responseValues) {
    suggestions = ((responseValues.get(config.qSuggestionsParam) || '') as string)
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

const responseUpdatedListener = (variables: Variables, prevState: ProviderPipelineState, response: Response) => {
  const {
    config,
    config: { qParam },
    redirects,
  } = prevState;
  const query = variables.get()[qParam] || '';
  const newState = updateState(query, response, config);
  newState.redirects = { ...redirects, ...response.getRedirects() };

  return newState;
};

const valuesUpdatedListener = (variables: Variables, pipeline: Pipeline, prevState: ProviderPipelineState) => {
  const query = variables.get()[prevState.config.qParam] || '';

  return updateState(query, pipeline.getResponse(), prevState.config);
};

const defaultState: ProviderPipelineState = {
  response: null,
  query: '',
  completion: '',
  suggestions: [],
  config: defaultConfig,
  redirects: {},
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
  syncURLState,
}) => {
  const initialResponse = parseResponse(initialResponseProp);
  const [searching, setSearching] = useState(false);
  const [autocompleteSearching, setAutocompleteSearching] = useState(false);
  const [searchState, setSearchState] = useState<ProviderPipelineState>({ ...defaultState, response: initialResponse });
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

  const resultsPerPageValue = parseInt(variables.current.get()[searchState.config.resultsPerPageParam], 10);
  const defaultResultsPerPage = React.useRef(isNumber(resultsPerPageValue) ? resultsPerPageValue : 15);

  if (!configDone) {
    if (syncURLState) {
      const params = getSearchParams();
      initFiltersFromURLState({
        filters: search.filters || [],
        params,
      });
      initVariableFromURLState({
        variables: variables.current,
        params,
        mappingKeys: [
          {
            paramKey: 'show',
            variableKey: searchState.config.resultsPerPageParam,
            defaultValue: defaultResultsPerPage.current.toString(),
          },
          { paramKey: 'sort', variableKey: 'sort' },
          { paramKey: autocompleteState.config.qParam, variableKey: autocompleteState.config.qParam },
          { paramKey: searchState.config.qParam, variableKey: searchState.config.qParam },
          { paramKey: searchState.config.pageParam, variableKey: searchState.config.pageParam },
        ],
      });
    }
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
    [autocompleteState.config, searchState.config],
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
              ...responseUpdatedListener(variables.current, prevState, response),
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
          ...valuesUpdatedListener(variables.current, search.pipeline, prevState),
        })),
      ),
    );

    if (!autocomplete.current) {
      const { account, collection, endpoint } = search.pipeline.config;
      autocomplete.current = {
        pipeline: new Pipeline({ account, collection, endpoint }, 'autocomplete', search.pipeline.getTracking()),
        variables: autocompleteVariables.current,
      };
    }

    unregisterFunctions.push(
      autocomplete.current.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
        setAutocompleteSearching(false);
        setAutocompleteState((prevState) => ({
          ...prevState,
          response,
          ...responseUpdatedListener(autocompleteVariables.current, prevState, response),
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
            prevState,
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
        defaultResultsPerPage: defaultResultsPerPage.current,
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
      resultClicked: search.pipeline.emitResultClicked,
      paginate: handlePaginate,
    } as Context);

  return (
    <Provider value={getContext({ autocomplete: autocompleteState, search: searchState })}>
      {syncURLState && <URLStateSync {...(typeof syncURLState !== 'boolean' ? syncURLState : {})} />}
      {children}
    </Provider>
  );
};

export default ContextProvider;
export {
  ClickTracking,
  combineFilters,
  Config,
  EventTracking,
  FieldDictionary,
  FilterBuilder,
  FilterOptions,
  NoTracking,
  Pipeline,
  PosNegTracking,
  Range,
  RangeFilterBuilder,
  RangeFilterOptions,
  Response,
  Tracking,
  useContext,
  Variables,
};
export type {
  ResultClickedFn,
  ResultValues,
  SearchProviderValues,
  VariableFieldValue,
  VariableFn,
  VariablesMap,
  VariablesObject,
};
