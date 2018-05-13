import * as React from "react";
import { Context, IContext } from "./context";
import { Pipeline, Values, Response } from "../../controllers";
import { UnlistenFn } from "../../controllers/listener";
import { EVENT_RESPONSE_UPDATED, EVENT_VALUES_UPDATED } from "../../events";
import { defaultConfig, IConfig } from "../../config";

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
  suggestions: Array<string>;
}

let _unregisterFunctions: Array<UnlistenFn> = [];

export class Provider extends React.PureComponent<
  IProviderProps,
  IProviderState
> {
  static defaultProps = {
    config: defaultConfig
  };

  state = {
    response: null,
    query: "",
    config: defaultConfig,
    completion: "",
    suggestions: []
  };

  componentDidMount() {
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

  componentWillUnmount() {
    _unregisterFunctions.forEach(fn => fn());
    _unregisterFunctions = [];
  }

  render() {
    const { children } = this.props;
    const { response, config, query, completion, suggestions } = this.state;

    return (
      <Context.Provider
        value={{
          response,
          config,
          query,
          completion,
          suggestions,
          search: this.search,
          resultClicked: this.handleResultClicked
        }}
      >
        {children}
      </Context.Provider>
    );
  }

  search = (query: string, override: boolean = false) => {
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

  handleResultClicked = (url: string) =>
    this.props.pipeline.emitResultClicked(url);
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
