import { Result } from "@sajari/sdk-js";
import * as React from "react";

import { Provider } from "./context";

import { ClearFn, SearchFn } from "../context/pipeline/context";
import {
  ButtonMouseEvent,
  InputBox,
  InputChangeEvent,
  InputFocusEvent,
  InputKeyboardEvent
} from "./components/InputBox";
import { Suggestions } from "./components/Suggestions";
import { Dropdown } from "./containers/Dropdown";
import { InputContext } from "./context/context";
import { Container } from "./styled";

enum InputKeyCodes {
  Return = 13,
  Escape = 27,
  UpArrow = 38,
  RightArrow = 39,
  DownArrow = 40
}

export type InputMode = "standard" | "typeahead";
export type DropdownMode = "none" | "suggestions" | "results";

export interface InputProps {
  inputMode?: InputMode;
  dropdownMode?: DropdownMode;
  instantSearch?: boolean;

  defaultValue?: string;
  placeholder?: string;

  styles?: any;

  inputRef?: (element: HTMLInputElement) => void;
  onKeyDown?: (event: InputKeyboardEvent) => void;
  onFocus?: (event: InputFocusEvent) => void;
  onBlur?: (event: InputFocusEvent) => void;
  onSearchButtonClick?: (
    event: ButtonMouseEvent,
    search: SearchFn,
    value: string
  ) => void;
  ResultsDropdownRenderer?: React.ComponentType<{
    highlightedIndex: number;
    setHighlightedIndex: (index: number) => void;
  }>;
}

export class Input extends React.Component<InputProps> {
  public static defaultProps = {
    dropdownMode: "none",
    inputMode: "standard",
    instantSearch: false
  };

  private inputContainer?: HTMLFormElement;
  private input?: HTMLInputElement;

  public render() {
    const {
      inputMode,
      dropdownMode,
      defaultValue,
      placeholder,
      ResultsDropdownRenderer,
      onFocus,
      onBlur,
      styles = {}
    } = this.props;

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
          setHighlightedIndex,
          pipelines
        }: InputContext) => {
          return (
            <Container styles={styles.container}>
              <InputBox
                inputRef={this.inputRef}
                inputContainerRef={this.inputContainerRef}
                value={inputValue}
                placeholder={placeholder}
                isDropdownOpen={isDropdownOpen}
                suggestions={
                  dropdownMode === "suggestions" ? suggestions : undefined
                }
                mode={dropdownMode === "suggestions" ? dropdownMode : inputMode}
                styles={styles.input}
                {...getInputProps({
                  onBlur,
                  onFocus,
                  onChange: this.handleInputOnChange(
                    pipelines.search,
                    pipelines.instant
                  ),
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
                {dropdownMode === "suggestions" ? <Suggestions /> : null}
                {dropdownMode === "results" &&
                ResultsDropdownRenderer !== undefined ? (
                  <ResultsDropdownRenderer
                    highlightedIndex={highlightedIndex}
                    setHighlightedIndex={setHighlightedIndex}
                  />
                ) : null}
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

  private handleInputOnChange = (
    search: { search: SearchFn },
    instant: { search: SearchFn }
  ) => (event: InputChangeEvent) => {
    const { inputMode, dropdownMode, instantSearch } = this.props;
    if (instantSearch || dropdownMode === "results") {
      const value = event.target.value;
      search.search(value, false);
    } else if (inputMode === "typeahead") {
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
    const { inputMode, dropdownMode } = this.props;
    const { keyCode } = event;

    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(event);
    }

    if (dropdownMode !== "results" && keyCode === InputKeyCodes.Return) {
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
        let length = suggestions.length;
        if (dropdownMode === "results") {
          length = results.length;
        }

        setState({ highlightedIndex: length });
        return;
      }

      setState({ highlightedIndex: (highlightedIndex -= 1) });
      return;
    }

    if (keyCode === InputKeyCodes.DownArrow) {
      let length = suggestions.length;
      if (dropdownMode === "results") {
        length = results.length;
      }

      if (highlightedIndex === length) {
        setState({ highlightedIndex: 0 });
        return;
      }

      setState({ highlightedIndex: (highlightedIndex += 1) });
      return;
    }

    if (keyCode === InputKeyCodes.RightArrow) {
      if (inputMode === "typeahead") {
        setState({ inputValue: suggestions[0] }, (state: any) => {
          pipelines.instant.search(state.inputValue, false);
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
          pipelines.instant.search(state.inputValue, false);
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
    if (typeof this.props.onSearchButtonClick === "function") {
      this.props.onSearchButtonClick(event, search, inputValue);
      return;
    }

    search(inputValue, true);
  };
}
