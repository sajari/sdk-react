import * as React from "react";
import { Config, defaultConfig } from "../../../config";
import { NoTracking, Pipeline, Response, Values } from "../../../controllers";
import { UnlistenFn } from "../../../controllers/listener";
import { EVENT_RESPONSE_UPDATED, EVENT_VALUES_UPDATED } from "../../../events";
import { Context, PipelineContext } from "./context";

export interface ProviderPipelineConfig {
  pipeline: Pipeline;
  values: Values;
  config?: Config;
}

export interface ProviderPipelineState {
  response: Response | null;
  query: string;
  config: Config;
  completion: string;
  suggestions: string[];
}

export interface PipelineProviderProps {
  search: ProviderPipelineConfig;
  instant?: ProviderPipelineConfig;

  theme?: any;
  searchOnLoad?: boolean;
}

export interface PipelineProviderState {
  search: ProviderPipelineState;
  instant: ProviderPipelineState;
}

const defaultState = {
  response: null,
  query: "",
  completion: "",
  suggestions: [],
  config: defaultConfig
} as {
  response: Response | null;
  query: string;
  completion: string;
  suggestions: string[];
  config: Config;
};

export class Provider extends React.PureComponent<
  PipelineProviderProps,
  PipelineProviderState
> {
  public state: PipelineProviderState = {
    search: defaultState,
    instant: defaultState
  };

  private unregisterFunctions: UnlistenFn[] = [];
  private instant?: ProviderPipelineConfig;

  public componentDidMount() {
    const { search, instant, searchOnLoad } = this.props;

    const mergedConfig = { ...defaultConfig, ...search.config };
    this.setState(
      state =>
        ({
          ...state,
          search: {
            ...state.search,
            response: search.pipeline.getResponse(),
            query: search.values.get()[mergedConfig.qParam] || "",
            config: mergedConfig
          },
          instant: {
            ...state.instant,
            config: { ...defaultConfig, ...search.config }
          }
        } as PipelineProviderState)
    );

    this.unregisterFunctions.push(
      search.pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) =>
        this.setState(state => ({
          ...state,
          search: {
            ...state.search,
            response,
            ...responseUpdatedListener(
              search.values,
              state.search.config,
              response
            )
          }
        }))
      )
    );

    this.unregisterFunctions.push(
      search.values.listen(EVENT_VALUES_UPDATED, () =>
        this.setState(state => ({
          ...state,
          search: {
            ...state.search,
            ...valuesUpdatedListener(
              search.values,
              search.pipeline,
              state.search.config
            )
          }
        }))
      )
    );

    this.instant = instant;
    if (this.instant === undefined) {
      const { project, collection, endpoint } = search.pipeline.config;
      this.instant = {
        pipeline: new Pipeline(
          { project, collection, endpoint },
          "autocomplete",
          new NoTracking()
        ),
        values: new Values()
      };
    }

    this.unregisterFunctions.push(
      (this.instant as ProviderPipelineConfig).pipeline.listen(
        EVENT_RESPONSE_UPDATED,
        (response: Response) =>
          this.setState(state => ({
            ...state,
            instant: {
              ...state.instant,
              response,
              ...responseUpdatedListener(
                (this.instant as ProviderPipelineConfig).values,
                state.instant.config,
                response
              )
            }
          }))
      )
    );

    this.unregisterFunctions.push(
      (this.instant as ProviderPipelineConfig).values.listen(
        EVENT_VALUES_UPDATED,
        () =>
          this.setState(state => ({
            ...state,
            instant: {
              ...state.instant,
              ...valuesUpdatedListener(
                (this.instant as ProviderPipelineConfig).values,
                (this.instant as ProviderPipelineConfig).pipeline,
                state.instant.config
              )
            }
          }))
      )
    );

    if (searchOnLoad) {
      search.pipeline.search(search.values.get());
    }
  }

  public componentWillUnmount() {
    this.unregisterFunctions.forEach(fn => fn());
    this.unregisterFunctions = [];
  }

  public render() {
    const { children } = this.props;
    const value = this.getContext(this.state);

    return (
      <PipelineContext.Provider value={value}>
        {children}
      </PipelineContext.Provider>
    );
  }

  private getContext = (state: PipelineProviderState) =>
    ({
      ...state,
      search: {
        ...state.search,
        search: this.search("search"),
        clear: this.clear("search")
      },
      instant: {
        ...state.instant,
        search: this.search("instant"),
        clear: this.clear("instant")
      },
      resultClicked: this.handleResultClicked,
      paginate: this.handlePaginate
    } as Context);

  private search = (key: "search" | "instant") =>
    debounce((query: string, override: boolean = false) => {
      const { pipeline, values } =
        (this.props[key] as ProviderPipelineConfig) || this.instant;
      const { config } = this.state[key];

      const text = {
        [config.qParam]: query,
        [config.qOverrideParam]: undefined
      };

      if (override) {
        text[config.qOverrideParam] = "true";
      }

      values.set(text);
      if (text[config.qParam]) {
        pipeline.search(values.get());
      } else {
        pipeline.clearResponse(values.get());
      }
    }, 50);

  private clear = (key: "search" | "instant") => (vals?: {
    [k: string]: string | undefined;
  }) => {
    const { pipeline, values } =
      (this.props[key] as ProviderPipelineConfig) || this.instant;

    if (vals !== undefined) {
      values.set(vals);
    }
    pipeline.clearResponse(values.get());
  };

  private handleResultClicked = (url: string) =>
    this.props.search.pipeline.emitResultClicked(url);

  private handlePaginate = (page: number) => {
    const { search } = this.props;
    const { pipeline, values } = search;

    values.set({ page: String(page) });
    pipeline.search(values.get());
  };
}

const responseUpdatedListener = (
  values: Values,
  config: Config,
  response: Response
) => {
  const query = values.get()[config.qParam] || "";
  const responseValues = response.getValues();

  return updateState(query, responseValues, config);
};

const valuesUpdatedListener = (
  values: Values,
  pipeline: Pipeline,
  config: Config
) => {
  const query = values.get()[config.qParam] || "";
  const responseValues = pipeline.getResponse().getValues();

  return updateState(query, responseValues, config);
};

const updateState = (
  query: string,
  responseValues: Map<string, string> | undefined,
  config: Config
) => {
  const completion =
    query && responseValues ? responseValues.get(config.qParam) || "" : "";

  let suggestions: string[] = [];
  if (responseValues) {
    suggestions = (responseValues.get(config.qSuggestionsParam) || "")
      .split(",")
      .filter(s => s.length > 0)
      .slice(0, config.maxSuggestions);
  }

  return {
    completion,
    query,
    suggestions
  };
};

type Procedure = (...args: any[]) => void;

function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options = {
    isImmediate: false
  }
): F {
  let timeoutId: number | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    const doLater = function() {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}
