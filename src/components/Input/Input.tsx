import { Result } from "@sajari/sdk-js";
import * as React from "react";

import { Consumer, Provider } from "./context";

import { Config } from "../../config";
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
export type DropdownMode = "none" | "suggestions" | "custom";

export interface InputProps {
  mode?: InputMode;
  dropdownMode?: DropdownMode;
  instantSearch?: boolean;

  defaultValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  enableVoiceSearch?: boolean;

  styles?: {
    container?: React.CSSProperties;
    input?: {
      container?: React.CSSProperties;
      input?: React.CSSProperties;
      typeahead?: React.CSSProperties;
      button?: React.CSSProperties;
    };
  };

  inputRef?: (element: HTMLInputElement) => void;
  onKeyDown?: (event: InputKeyboardEvent) => void;
  onFocus?: (event: InputFocusEvent) => void;
  onBlur?: (event: InputFocusEvent) => void;
  onDropdownClose?: () => void;
  onSearchButtonClick?: (
    event: ButtonMouseEvent,
    search: SearchFn,
    value: string
  ) => void;
  DropdownRenderer?: React.ComponentType<InputContext>;
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
      mode,
      dropdownMode,
      defaultValue,
      placeholder,
      autoFocus,
      enableVoiceSearch,
      DropdownRenderer,
      onFocus,
      onBlur,
      onDropdownClose,
      styles = {}
    } = this.props;

    return (
      <Provider
        dropdownMode={dropdownMode}
        onDropdownClose={onDropdownClose}
        defaultInputValue={defaultValue}
      >
        {({
          inputValue,
          highlightedIndex,
          isDropdownOpen,
          suggestions,
          results,

          getRootProps,
          getInputProps,
          setState,
          pipelines
        }: InputContext) => {
          return (
            <Container
              {...getRootProps({ refKey: "innerRef" })}
              styles={styles.container}
            >
              <InputBox
                inputRef={this.inputRef}
                inputContainerRef={this.inputContainerRef}
                value={inputValue}
                placeholder={placeholder}
                autoFocus={autoFocus}
                enableVoiceInput={enableVoiceSearch}
                isDropdownOpen={isDropdownOpen}
                suggestions={
                  dropdownMode === "suggestions" ? suggestions : undefined
                }
                mode={dropdownMode === "suggestions" ? dropdownMode : mode}
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
              <Dropdown isOpen={isDropdownOpen}>
                {dropdownMode === "suggestions" ? <Suggestions /> : null}
                {dropdownMode === "custom" && DropdownRenderer !== undefined ? (
                  <Consumer>
                    {(context: InputContext) => (
                      <DropdownRenderer {...context} />
                    )}
                  </Consumer>
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
    const { mode, instantSearch } = this.props;
    if (instantSearch) {
      const value = event.target.value;
      search.search(value, false);
    } else if (mode === "typeahead") {
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
      search: { search: SearchFn; clear: ClearFn; config: Config };
      instant: { search: SearchFn; clear: ClearFn; config: Config };
    }
  ) => (event: InputKeyboardEvent) => {
    const { mode, dropdownMode } = this.props;
    const { keyCode } = event;

    if (typeof this.props.onKeyDown === "function") {
      this.props.onKeyDown(event);
    }

    if (dropdownMode !== "custom" && keyCode === InputKeyCodes.Return) {
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
      pipelines.search.clear({ [pipelines.search.config.qParam]: "" });
      pipelines.instant.clear({ [pipelines.instant.config.qParam]: "" });

      if (this.input !== undefined) {
        this.input.blur();
      }
      return;
    }

    if (keyCode === InputKeyCodes.UpArrow) {
      event.preventDefault();
      if (highlightedIndex === 0) {
        let length = suggestions.length;
        if (dropdownMode === "custom") {
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
      if (dropdownMode === "custom") {
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
      if (mode === "typeahead") {
        const value = suggestions[0];
        if (value === undefined) {
          return;
        }

        setState({ inputValue: value }, (state: any) => {
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
