import { Result } from "@sajari/sdk-js";
import * as React from "react";

import { Response } from "../../../controllers";
import { Consumer as PipelineConsumer } from "../../context/Consumer";
import { ClearFn, SearchFn } from "../../context/pipeline/context";
import { isNotEmptyArray, isNotEmptyString } from "../utils";
import { Context, InputContext } from "./context";

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

  aria: {
    announceAssertive: (message: string) => void;
    announcePolite: (message: string) => void;
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
  public static getDerivedStateFromProps(
    props: ProviderProps,
    state: ProviderState
  ) {
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

    const results =
      pipelines.search.response !== null
        ? pipelines.search.response.getResults() || []
        : [];

    return {
      ...state,
      completion,
      query,
      results,
      suggestions,
      inputValue:
        defaultInputValue === undefined ? state.inputValue : defaultInputValue
    };
  }

  public state = {
    inputValue: "",
    isDropdownOpen: false,
    highlightedIndex: 0,

    query: "",
    completion: "",
    suggestions: [],
    results: []
  } as ProviderState;

  public render() {
    const { pipelines, aria, children } = this.props;

    if (typeof children !== "function") {
      throw new Error("Provider requires children to be a render function");
    }

    const value = {
      ...this.state,

      aria,
      pipelines: {
        instant: {
          clear: pipelines.instant.clear,
          search: pipelines.instant.search
        },
        search: {
          clear: pipelines.search.clear,
          search: pipelines.search.search
        }
      },

      // tslint:disable:object-literal-sort-keys
      setHighlightedIndex: this.setHighlightedIndex,
      getInputProps: this.getInputProps,
      setState: this.handleSetState
      // tslint:enable:object-literal-sort-keys
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
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState(state => ({ ...state, isDropdownOpen: false }));
        if (typeof props.onBlur === "function") {
          props.onBlur(event);
        }
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.setState(state => ({ ...state, inputValue: value }));
        if (typeof props.onChange === "function") {
          props.onChange(event);
        }
      },
      onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState(state => ({ ...state, isDropdownOpen: true }));
        if (typeof props.onFocus === "function") {
          props.onFocus(event);
        }
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = event;

        if (keyCode === InputKeyCodes.Escape) {
          this.setState(
            state =>
              ({
                ...state,
                inputValue: "",
                isDropdownOpen: false,
                highlightedIndex: 0
              } as ProviderState)
          );
        }

        if (typeof props.onKeyDown === "function") {
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
    {({ search, instant, announceAssertive, announcePolite }) => (
      <Provider
        pipelines={{ search, instant }}
        aria={{ announceAssertive, announcePolite }}
        defaultInputValue={defaultInputValue}
      >
        {children}
      </Provider>
    )}
  </PipelineConsumer>
);
