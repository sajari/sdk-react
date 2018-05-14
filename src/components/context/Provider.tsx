import { isEqual } from "lodash-es";
// @ts-ignore: module missing defintion file
import memoize from "memoize-one";
import * as React from "react";
import { defaultConfig, IConfig } from "../../config";
import { Pipeline, Response, Values } from "../../controllers";
import { UnlistenFn } from "../../controllers/listener";
import { EVENT_RESPONSE_UPDATED, EVENT_VALUES_UPDATED } from "../../events";
import { Context, IContext } from "./context";

export interface IProviderProps {
  pipeline: Pipeline;
  values: Values;

  config?: IConfig;

  children: React.ReactNode;
}

export interface IProviderState {
  response: Response | null;
  query: string;
  config: IConfig;
  completion: string;
  suggestions: string[];
}

let _unregisterFunctions: UnlistenFn[] = [];

export class Provider extends React.PureComponent<
  IProviderProps,
  IProviderState
> {
  public static defaultProps = {
    config: defaultConfig
  };

  public state = {
    response: null,
    query: "",
    config: defaultConfig,
    completion: "",
    suggestions: []
  };

  public componentDidMount() {
    const { pipeline, values } = this.props;
    const config = { ...defaultConfig, ...this.props.config };

    this.setState(state => ({
      ...state,
      config,
      response: pipeline.getResponse()
    }));

    _unregisterFunctions.push(
      pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) =>
        this.setState(state => ({
          ...state,
          ...repsonseUpdatedListener(values, config, response)
        }))
      )
    );

    _unregisterFunctions.push(
      values.listen(EVENT_VALUES_UPDATED, () =>
        this.setState(state => ({
          ...state,
          ...valuesUpdatedListener(values, pipeline, config)
        }))
      )
    );
  }

  public componentWillUnmount() {
    _unregisterFunctions.forEach(fn => fn());
    _unregisterFunctions = [];
  }

  public render() {
    const { children } = this.props;
    const value = this.getContext(this.state);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  public search = (query: string, override: boolean = false) => {
    const { pipeline, values } = this.props;
    const { config } = this.state;

    const text = {
      [config.qParam]: query
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

  public handleResultClicked = (url: string) =>
    this.props.pipeline.emitResultClicked(url);

  public handlePaginate = (page: number) => {
    const { pipeline, values } = this.props;

    values.set({ page: String(page) });
    pipeline.search(values.get());
  };

  private getContext = memoize(
    (state: IProviderState) => ({
      ...state,
      search: this.search,
      resultClicked: this.handleResultClicked,
      paginate: this.handlePaginate
    }),
    (a: any, b: any) => isEqual(a, b)
  );
}

const repsonseUpdatedListener = (
  values: Values,
  config: IConfig,
  response: Response
) => {
  const query = values.get()[config.qParam] || "";
  const responseValues = response.getValues();

  return {
    response,
    ...updateState(query, responseValues, config)
  };
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
    query,
    completion,
    suggestions
  };
};
