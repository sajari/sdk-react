import * as React from "react";
import { Result } from "@sajari/sdk-js";

import { Consumer as PipelineConsumer } from "../../context/pipeline/Consumer";
import { Context, InputContext } from "./context";
import { isNotEmptyString, isNotEmptyArray } from "../utils";
import { SearchFn, ClearFn } from "../../context/pipeline/context";
import { Response } from "../../../controllers";

enum InputKeyCodes {
  Return = 13,
  Escape = 27,
  UpArrow = 38,
  RightArrow = 39,
  DownArrow = 40
}

export interface ProviderProps {
  pipelines: {
    search: {
      query: string;
      completion: string;
      suggestions: string[];
      response: Response | null;

      search: SearchFn;
      clear: ClearFn;
    };
    instant: {
      query: string;
      completion: string;
      suggestions: string[];
      response: Response | null;

      search: SearchFn;
      clear: ClearFn;
    };
  };

  defaultInputValue?: string;
  children: (props: InputContext) => React.ReactNode;
}

export interface ProviderState {
  inputValue: string;
  isDropdownOpen: boolean;
  highlightedIndex: number;

  query: string;
  completion: string;
  suggestions: string[];
  results: Result[];
}

export class Provider extends React.Component<ProviderProps, ProviderState> {
  public state = {
    inputValue: "",
    highlightedIndex: 0,
    isDropdownOpen: false,

    query: "",
    completion: "",
    suggestions: [],
    results: []
  };

  static getDerivedStateFromProps(props: ProviderProps, state: ProviderState) {
    const { defaultInputValue, pipelines } = props;

    const query = isNotEmptyString(
      pipelines.search.query,
      pipelines.instant.query
    );
    const completion = isNotEmptyString(
      pipelines.search.completion,
      pipelines.instant.completion
    );
    const suggestions = isNotEmptyArray(
      pipelines.search.suggestions,
      pipelines.instant.suggestions
    );

    return {
      ...state,
      completion,
      query,
      suggestions,
      inputValue:
        defaultInputValue === undefined ? state.inputValue : defaultInputValue
    };
  }

  render() {
    const { pipelines, children } = this.props;

    if (typeof children !== "function") {
      throw new Error("Provider requires children to be a render function");
    }

    const value = {
      ...this.state,

      pipelines: {
        search: {
          search: pipelines.search.search,
          clear: pipelines.search.clear
        },
        instant: {
          search: pipelines.instant.search,
          clear: pipelines.instant.clear
        }
      },

      setHighlightedIndex: this.setHighlightedIndex,
      getInputProps: this.getInputProps,
      setState: this.handleSetState
    };

    return (
      <Context.Provider value={value as InputContext}>
        <Context.Consumer>{context => children(context)}</Context.Consumer>
      </Context.Provider>
    );
  }

  private setHighlightedIndex = (index: number) =>
    this.setState(state => ({ ...state, highlightedIndex: index }));

  private getInputProps = (props: { [k: string]: any }) => {
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.setState(state => ({ ...state, inputValue: value }));
        if (typeof props["onChange"] === "function") {
          props.onChange(event);
        }
      },
      onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState(state => ({ ...state, isDropdownOpen: true }));
        if (typeof props["onFocus"] === "function") {
          props.onFocus(event);
        }
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState(state => ({ ...state, isDropdownOpen: false }));
        if (typeof props["onBlur"] === "function") {
          props.onBlur(event);
        }
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = event;

        if (keyCode === InputKeyCodes.Escape) {
          this.setState(state => ({
            ...state,
            inputValue: "",
            isDropdownOpen: false,
            highlightedIndex: 0
          }));
        }

        if (typeof props["onKeyDown"] === "function") {
          props.onKeyDown(event);
        }
      }
    };
  };

  private handleSetState = (
    newState: ProviderState,
    callback?: (state: ProviderState) => void
  ) => {
    this.setState(
      state => ({ ...state, ...newState }),
      () => {
        if (typeof callback === "function") {
          callback(this.state);
        }
      }
    );
  };
}

export interface InputProviderProps {
  defaultInputValue?: string;
  children: (props: InputContext) => React.ReactNode;
}

export const InputProvider: React.SFC<InputProviderProps> = ({
  defaultInputValue,
  children
}: InputProviderProps) => (
  <PipelineConsumer>
    {({ search, instant }) => (
      <Provider
        pipelines={{ search, instant }}
        defaultInputValue={defaultInputValue}
      >
        {children}
      </Provider>
    )}
  </PipelineConsumer>
);
