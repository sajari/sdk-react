/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import { createContext } from 'sajari-react-sdk-utils';

import { Config, defaultConfig } from './config';
import { NoTracking, Pipeline, Response, Values } from './controllers';
import { UnlistenFn } from './controllers/listener';
import { EVENT_RESPONSE_UPDATED, EVENT_VALUES_UPDATED } from './events';
import { Context, PipelineProviderProps, PipelineProviderState, ProviderPipelineConfig, State } from './types';

function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds = 50,
  options = {
    isImmediate: false,
  },
): F {
  let timeoutId: number | undefined;

  // eslint-disable-next-line func-names
  return function (this: any, ...args: any[]) {
    const context = this;

    const doLater = () => {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    // @ts-ignore
    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}

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

const responseUpdatedListener = (values: Values, config: Config, response: Response) => {
  const query = values.get()[config.qParam] || '';
  const responseValues = response.getValues();

  return updateState(query, responseValues, config);
};

const valuesUpdatedListener = (values: Values, pipeline: Pipeline, config: Config) => {
  const query = values.get()[config.qParam] || '';
  const responseValues = pipeline.getResponse().getValues();

  return updateState(query, responseValues, config);
};

const [Provider, useContext] = createContext<Context>({
  strict: true,
  name: 'PipelineContext',
});

const defaultState: State = {
  response: null,
  query: '',
  completion: '',
  suggestions: [],
  config: defaultConfig,
};

const SearchContextProvider: React.FC<PipelineProviderProps> = ({
  children,
  search,
  instant: instantProp,
  searchOnLoad,
}) => {
  const [searchState, setSearchState] = useState(defaultState);
  const [instantState, setInstantState] = useState(defaultState);
  const instant = useRef(instantProp);
  const response = search.pipeline.getResponse();

  useEffect(() => {
    const mergedConfig = { ...defaultConfig, ...search.config };
    setSearchState((state) => ({
      ...state,
      response,
      query: search.values.get()[mergedConfig.qParam] || '',
      config: mergedConfig,
    }));

    setInstantState((state) => ({
      ...state,
      config: { ...defaultConfig, ...search.config },
    }));

    const unregisterFunctions: UnlistenFn[] = [];

    unregisterFunctions.push(
      search.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) =>
        setSearchState((prevState) => ({
          ...prevState,
          response,
          ...responseUpdatedListener(search.values, prevState.config, response),
        })),
      ),
    );

    unregisterFunctions.push(
      search.values.listen(EVENT_VALUES_UPDATED, () =>
        setSearchState((prevState) => ({
          ...prevState,
          ...valuesUpdatedListener(search.values, search.pipeline, prevState.config),
        })),
      ),
    );

    if (!instant.current) {
      const { project, collection, endpoint } = search.pipeline.config;
      instant.current = {
        pipeline: new Pipeline({ project, collection, endpoint }, 'autocomplete', new NoTracking()),
        values: new Values(),
      };
    }

    unregisterFunctions.push(
      instant.current.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) =>
        setInstantState((prevState) => ({
          ...prevState,
          response,
          ...responseUpdatedListener((instant.current as ProviderPipelineConfig).values, prevState.config, response),
        })),
      ),
    );

    unregisterFunctions.push(
      instant.current.values.listen(EVENT_VALUES_UPDATED, () =>
        setInstantState((prevState) => ({
          ...prevState,
          ...valuesUpdatedListener(
            (instant.current as ProviderPipelineConfig).values,
            (instant.current as ProviderPipelineConfig).pipeline,
            prevState.config,
          ),
        })),
      ),
    );

    if (searchOnLoad) {
      search.pipeline.search(search.values.get());
    }

    return () => {
      unregisterFunctions.forEach((fn) => fn());
    };
  }, []);

  const searchFn = (key: 'search' | 'instant') =>
    debounce((query: string, override: boolean = false) => {
      const func = key === 'instant' ? instant : search;
      const state = key === 'instant' ? instantState : searchState;
      const { pipeline, values } = func as ProviderPipelineConfig;
      const { config } = state;

      const text = {
        [config.qParam]: query,
        [config.qOverrideParam]: undefined,
      };

      if (override) {
        text[config.qOverrideParam] = 'true';
      }

      values.set(text);
      if (text[config.qParam]) {
        pipeline.search(values.get());
      } else {
        pipeline.clearResponse(values.get());
      }
    }, 50);

  const clear = (key: 'search' | 'instant') => (vals?: { [k: string]: string | undefined }) => {
    const func = key === 'instant' ? instant : search;
    const { pipeline, values } = func as ProviderPipelineConfig;

    if (vals !== undefined) {
      values.set(vals);
    }
    pipeline.clearResponse(values.get());
  };

  const handlePaginate = (page: number) => {
    const { pipeline, values } = search;

    values.set({ page: String(page) });
    pipeline.search(values.get());
  };

  const handleResultClicked = (url: string) => search.pipeline.emitResultClicked(url);

  const getContext = (state: PipelineProviderState) =>
    ({
      ...state,
      search: {
        ...state.search,
        search: searchFn('search'),
        clear: clear('search'),
        fields: search.fields,
      },
      instant: {
        ...state.instant,
        search: searchFn('instant'),
        clear: clear('instant'),
        fields: instantProp?.fields,
      },
      resultClicked: handleResultClicked,
      paginate: handlePaginate,
    } as Context);

  return <Provider value={getContext({ instant: instantState, search: searchState })}>{children}</Provider>;
};

export default SearchContextProvider;
export { useContext };
