import { isEqual } from "lodash-es";
// @ts-ignore: module missing defintion file
import memoize from "memoize-one";
import * as React from "react";
import { defaultConfig, IConfig } from "../../../config";
import { Pipeline, Response, Values } from "../../../controllers";
import { UnlistenFn } from "../../../controllers/listener";
import { EVENT_RESPONSE_UPDATED, EVENT_VALUES_UPDATED } from "../../../events";
import { Context, IContext } from "./context";

export interface IProviderPipelineConfig {
  pipeline: Pipeline;
  values: Values;
  config?: IConfig;
}

export interface IProviderPipelineState {
  response: Response | null;
  query: string;
  config: IConfig;
  completion: string;
  suggestions: string[];
}

export interface IPipelineProviderProps {
  search: IProviderPipelineConfig;
  instant?: IProviderPipelineConfig;

  theme?: any;
}

export interface IPipelineProviderState {
  search: IProviderPipelineState;
  instant: IProviderPipelineState;
}

const defaultState = {
  response: null,
  query: "",
  config: defaultConfig,
  completion: "",
  suggestions: []
};

export class Provider extends React.PureComponent<
  IPipelineProviderProps,
  IPipelineProviderState
> {
  public state = {
    search: defaultState,
    instant: defaultState
  };

  private unregisterFunctions: UnlistenFn[] = [];
  private instant?: IProviderPipelineConfig;

  private getContext = memoize(
    (state: IPipelineProviderState) => ({
      ...state,
      search: {
        ...state.search,
        search: this.search("search")
      },
      instant: {
        ...state.instant,
        search: this.search("instant")
      },
      paginate: this.handlePaginate,
      resultClicked: this.handleResultClicked
    }),
    isEqual
  );

  public componentDidMount() {
    const { search, instant } = this.props;

    this.setState(state => ({
      ...state,
      search: {
        ...state.search,
        config: { ...defaultConfig, ...search.config },
        response: search.pipeline.getResponse()
      },
      instant: {
        ...state.instant,
        config: { ...defaultConfig, ...search.config }
      }
    }));

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
      const { project, collection } = search.pipeline.config;
      this.instant = {
        pipeline: new Pipeline(project, collection, "autocomplete"),
        values: new Values()
      };
    }

    this.unregisterFunctions.push(
      (this.instant as IProviderPipelineConfig).pipeline.listen(
        EVENT_RESPONSE_UPDATED,
        (response: Response) =>
          this.setState(state => ({
            ...state,
            instant: {
              ...state.instant,
              response,
              ...responseUpdatedListener(
                (this.instant as IProviderPipelineConfig).values,
                state.instant.config,
                response
              )
            }
          }))
      )
    );

    this.unregisterFunctions.push(
      (this.instant as IProviderPipelineConfig).values.listen(
        EVENT_VALUES_UPDATED,
        () =>
          this.setState(state => ({
            ...state,
            instant: {
              ...state.instant,
              ...valuesUpdatedListener(
                (this.instant as IProviderPipelineConfig).values,
                (this.instant as IProviderPipelineConfig).pipeline,
                state.instant.config
              )
            }
          }))
      )
    );
  }

  public componentWillUnmount() {
    this.unregisterFunctions.forEach(fn => fn());
    this.unregisterFunctions = [];
  }

  public render() {
    const { children } = this.props;
    const value = this.getContext(this.state);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  private search = (key: "search" | "instant") => (
    query: string,
    override: boolean = false
  ) => {
    const { pipeline, values } =
      (this.props[key] as IProviderPipelineConfig) || this.instant;
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
  config: IConfig,
  response: Response
) => {
  const query = values.get()[config.qParam] || "";
  const responseValues = response.getValues();

  return updateState(query, responseValues, config);
};

const valuesUpdatedListener = (
  values: Values,
  pipeline: Pipeline,
  config: IConfig
) => {
  const query = values.get()[config.qParam] || "";
  const responseValues = pipeline.getResponse().getValues();

  return updateState(query, responseValues, config);
};

const updateState = (
  query: string,
  responseValues: Map<string, string> | undefined,
  config: IConfig
) => {
  const completion =
    query && responseValues ? responseValues.get(config.qParam) || "" : "";

  const suggestions = responseValues
    ? (responseValues.get(config.qSuggestionsParam) || "")
        .split(",")
        .filter((suggestion: string) => suggestion.length > 0)
        .slice(0, config.maxSuggestions)
    : [];

  return {
    completion,
    query,
    suggestions
  };
};
