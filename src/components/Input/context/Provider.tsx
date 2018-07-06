import { Result } from "@sajari/sdk-js";
import * as React from "react";

import { Response } from "../../../controllers";
import { Consumer as PipelineConsumer } from "../../context/Consumer";
import {
  ClearFn,
  PipelineContextState,
  SearchFn
} from "../../context/pipeline/context";
import { DropdownMode } from "../Input";
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
    search: PipelineContextState;
    instant: PipelineContextState;
  };

  aria: {
    announceAssertive: (message: string) => void;
    announcePolite: (message: string) => void;
  };

  defaultInputValue?: string;
  dropdownMode?: DropdownMode;
  onDropdownClose?: () => void;
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

let prevInputValLengthWasOne = false;

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

    let inputValue = state.inputValue;
    if (inputValue.length === 1) {
      prevInputValLengthWasOne = true;
    }

    if (defaultInputValue !== undefined) {
      inputValue = defaultInputValue;
    } else if (inputValue === "" && query !== "" && !prevInputValLengthWasOne) {
      prevInputValLengthWasOne = false;
      inputValue = query;
    }

    return {
      ...state,
      completion,
      inputValue,
      query,
      results,
      suggestions
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

  private container?: HTMLDivElement;

  public componentDidMount() {
    const { dropdownMode } = this.props;

    if (dropdownMode === undefined || dropdownMode !== "results") {
      return;
    }

    window.addEventListener("click", this.windowClickHandler);
  }

  public componentWillUnmount() {
    window.removeEventListener("click", this.windowClickHandler);
  }

  public render() {
    const { pipelines, aria, children } = this.props;

    if (typeof children !== "function") {
      // https://reactpatterns.com/#function-as-children
      throw new Error("Provider requires a function as children");
    }

    const value = {
      ...this.state,

      aria,
      pipelines: {
        instant: {
          clear: pipelines.instant.clear,
          config: pipelines.instant.config,
          search: pipelines.instant.search
        },
        search: {
          clear: pipelines.search.clear,
          config: pipelines.search.config,
          search: pipelines.search.search
        }
      },

      // tslint:disable:object-literal-sort-keys
      setHighlightedIndex: this.setHighlightedIndex,
      getInputProps: this.getInputProps,
      getRootProps: this.getContainerProps,
      setState: this.handleSetState
      // tslint:enable:object-literal-sort-keys
    };

    return (
      <Context.Provider value={value as InputContext}>
        <Context.Consumer>{context => children(context)}</Context.Consumer>
      </Context.Provider>
    );
  }

  private containerRef = (element: HTMLDivElement) =>
    (this.container = element);

  private setHighlightedIndex = (index: number) =>
    // @ts-ignore: partial state update
    this.handleSetState({
      highlightedIndex: index
    });

  private getContainerProps = ({ refKey }: { [k: string]: string }) => {
    return {
      [refKey]: this.containerRef
    };
  };

  private getInputProps = (props: { [k: string]: any }) => {
    return {
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        if (this.props.dropdownMode !== "results") {
          // @ts-ignore: partial state update
          this.handleSetState({
            isDropdownOpen: false
          });
        }
        if (typeof props.onBlur === "function") {
          props.onBlur(event);
        }
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // @ts-ignore: partial state update
        this.handleSetState({
          inputValue: value
        });
        if (typeof props.onChange === "function") {
          props.onChange(event);
        }
      },
      onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
        // @ts-ignore: partial state update
        this.handleSetState({
          isDropdownOpen: true
        });
        if (typeof props.onFocus === "function") {
          props.onFocus(event);
        }
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = event;

        if (keyCode === InputKeyCodes.Escape) {
          // @ts-ignore: partial state update
          this.handleSetState({
            inputValue: "",
            isDropdownOpen: false,
            highlightedIndex: 0
          });
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
        if (
          !this.state.isDropdownOpen &&
          typeof this.props.onDropdownClose === "function"
        ) {
          this.props.onDropdownClose();
        } else if (
          !this.state.isDropdownOpen &&
          this.props.onDropdownClose !== undefined
        ) {
          throw new Error(
            `Expected \`onDropdownClose\` listener to be a function, instead got a value of \`${typeof this
              .props.onDropdownClose}\` type`
          );
        }

        if (typeof callback === "function") {
          callback(this.state);
        } else if (callback !== undefined) {
          throw new Error(
            `Expected \`callback\` to be a function, instead got a value of \`${typeof callback}\` type`
          );
        }
      }
    );
  };

  private windowClickHandler = (event: any) => {
    if (this.container === undefined) {
      return;
    }

    const target = event.target;
    if (target === document.body) {
      // @ts-ignore: partial state update
      this.handleSetState({ isDropdownOpen: false });
      return;
    }

    let targetParent = target.parentElement;
    while (targetParent !== document.body) {
      if (targetParent === this.container) {
        return;
      }
      targetParent = targetParent.parentElement;
    }

    // @ts-ignore: partial state update
    this.handleSetState({ isDropdownOpen: false });
  };
}

export interface InputProviderProps {
  defaultInputValue?: string;
  dropdownMode?: DropdownMode;
  onDropdownClose?: () => void;
  children: (props: InputContext) => React.ReactNode;
}

export const InputProvider: React.SFC<InputProviderProps> = ({
  defaultInputValue,
  dropdownMode,
  onDropdownClose,
  children
}: InputProviderProps) => (
  <PipelineConsumer>
    {({ search, instant, announceAssertive, announcePolite }) => (
      <Provider
        pipelines={{ search, instant }}
        aria={{ announceAssertive, announcePolite }}
        defaultInputValue={defaultInputValue}
        dropdownMode={dropdownMode}
        onDropdownClose={onDropdownClose}
      >
        {children}
      </Provider>
    )}
  </PipelineConsumer>
);
