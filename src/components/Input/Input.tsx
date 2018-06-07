import * as React from "react";
import { Result } from "@sajari/sdk-js";

import { Provider } from "./context";

import { Container } from "./styled";
import {
  InputBox,
  InputChangeEvent,
  InputKeyboardEvent,
  ButtonMouseEvent
} from "./components/InputBox";
import { Dropdown } from "./containers/Dropdown";
import { Suggestions } from "./components/Suggestions";
import { InputContext } from "./context/context";
import { SearchFn, ClearFn } from "../context/pipeline/context";

enum InputKeyCodes {
  Return = 13,
  Escape = 27,
  UpArrow = 38,
  RightArrow = 39,
  DownArrow = 40
}

export type InputMode = "suggestions" | "results" | "typeahead" | "standard";

export interface InputProps {
  mode?: InputMode;
  defaultValue?: string;
  placeholder?: string;

  inputRef?: (element: HTMLInputElement) => void;
}

export class Input extends React.Component<InputProps> {
  public static defaultProps = {
    mode: "standard"
  };

  private inputContainer?: HTMLFormElement;
  private input?: HTMLInputElement;

  public render() {
    const { mode, defaultValue, placeholder } = this.props;

    return (
      <Provider defaultInputValue={defaultValue}>
        {({
          inputValue,
          highlightedIndex,
          isDropdownOpen,
          suggestions,
          results,

          getInputProps,
          setState,
          pipelines
        }: InputContext) => {
          return (
            <Container>
              <InputBox
                inputRef={this.inputRef}
                inputContainerRef={this.inputContainerRef}
                value={inputValue}
                placeholder={placeholder}
                isDropdownOpen={isDropdownOpen}
                mode={mode === "results" ? undefined : mode}
                {...getInputProps({
                  onChange: this.handleInputOnChange(pipelines.instant),
                  onKeyDown: this.handleInputOnKeyDown(
                    inputValue,
                    highlightedIndex,
                    suggestions,
                    results,
                    setState,
                    pipelines
                  )
                })}
                onVoiceInput={this.handleOnVoiceInput(
                  setState,
                  pipelines.search.search
                )}
                onSearchButtonClick={this.handleSearchButtonClick(
                  inputValue,
                  pipelines.search.search
                )}
              />
              <Dropdown isOpen={isDropdownOpen} element={this.inputContainer}>
                {mode === "suggestions" ? <Suggestions /> : null}
              </Dropdown>
            </Container>
          );
        }}
      </Provider>
    );
  }

  private inputContainerRef = (element: HTMLFormElement) =>
    (this.inputContainer = element);

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
    if (typeof this.props.inputRef === "function") {
      this.props.inputRef(element);
    }
  };

  private handleInputOnChange = (instant: { search: SearchFn }) => (
    event: InputChangeEvent
  ) => {
    const { mode } = this.props;
    if (mode !== "standard") {
      const value = event.target.value;
      instant.search(value, false);
    }
  };

  private handleInputOnKeyDown = (
    inputValue: string,
    highlightedIndex: number,
    suggestions: string[],
    results: Result[],
    setState: any,
    pipelines: {
      search: { search: SearchFn; clear: ClearFn };
      instant: { search: SearchFn; clear: ClearFn };
    }
  ) => (event: InputKeyboardEvent) => {
    const { mode } = this.props;
    const { keyCode } = event;

    if (keyCode === InputKeyCodes.Return) {
      const suggestion = suggestions[highlightedIndex - 1];

      if (suggestion === undefined) {
        pipelines.search.search(inputValue, true);
      } else {
        setState({ inputValue: suggestion });
        pipelines.search.search(suggestion, true);
      }

      pipelines.instant.clear();
      if (this.input !== undefined) {
        this.input.blur();
      }
    }

    if (keyCode === InputKeyCodes.Escape) {
      pipelines.search.clear({ q: "" });
      pipelines.instant.clear({ q: "" });

      if (this.input !== undefined) {
        this.input.blur();
      }
      return;
    }

    if (keyCode === InputKeyCodes.UpArrow) {
      event.preventDefault();
      if (highlightedIndex === 0) {
        setState({ highlightedIndex: suggestions.length });
        return;
      }

      setState({ highlightedIndex: (highlightedIndex -= 1) });
      return;
    }

    if (keyCode === InputKeyCodes.DownArrow) {
      if (highlightedIndex === suggestions.length) {
        setState({ highlightedIndex: 0 });
        return;
      }

      setState({ highlightedIndex: (highlightedIndex += 1) });
      return;
    }

    if (keyCode === InputKeyCodes.RightArrow) {
      if (mode === "typeahead") {
        setState({ inputValue: suggestions[0] }, (state: any) => {
          const { inputValue } = state;
          pipelines.instant.search(inputValue, false);
        });
        return;
      }

      const suggestion = suggestions[highlightedIndex - 1];
      if (suggestion === undefined) {
        return;
      }

      setState(
        { inputValue: suggestions[highlightedIndex - 1] },
        (state: any) => {
          const { inputValue } = state;
          pipelines.instant.search(inputValue, false);
        }
      );
    }
  };

  private handleOnVoiceInput = (setState: any, search: SearchFn) => (
    result: string
  ) => {
    setState({ inputValue: result }, (state: any) => {
      const { inputValue } = state;
      search(inputValue, true);
    });
  };

  private handleSearchButtonClick = (inputValue: string, search: SearchFn) => (
    event: ButtonMouseEvent
  ) => {
    search(inputValue, true);
  };
}
