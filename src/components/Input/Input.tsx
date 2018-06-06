import * as React from "react";
// @ts-ignore: module missing type defs file
import memoize from "memoize-one";
// @ts-ignore: module missing type defs file
import isEqual from "deep-is";
import { Result } from "@sajari/sdk-js";

import { Provider, RenderFnProps } from "./context";

import { Container } from "./styled";
import {
  InputBox,
  InputChangeEvent,
  InputFocusEvent,
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

export interface InputProps {
  defaultValue?: string;
  placeholder?: string;

  inputRef?: (element: HTMLInputElement) => void;
}

export interface InputState {
  inputValue: string;
  isDropdownOpen: boolean;
  highlightedIndex: number;
}

export class Input extends React.Component<InputProps, InputState> {
  public state = {
    inputValue: "",
    isDropdownOpen: false,
    highlightedIndex: 0
  };

  private inputContainer?: HTMLFormElement;
  private input?: HTMLInputElement;

  private getProviderValue = memoize(
    (state: InputState) => ({
      ...state
    }),
    isEqual
  );

  static getDerivedStateFromProps(props: InputProps, state: InputState) {
    const { defaultValue } = props;
    if (defaultValue === undefined) {
      return state;
    }

    return {
      ...state,
      inputValue: defaultValue
    };
  }

  public render() {
    const { placeholder } = this.props;
    const value = {
      ...this.state,
      setHighlightedIndex: this.setHighlightedIndex,
      selectItem: this.selectItem
    };

    return (
      <Provider value={value}>
        {({
          inputValue,
          isDropdownOpen,
          suggestions,
          results,
          search,
          instant
        }: RenderFnProps) => (
          <Container>
            <InputBox
              inputRef={this.inputRef}
              inputContainerRef={this.inputContainerRef}
              value={inputValue}
              placeholder={placeholder}
              isDropdownOpen={isDropdownOpen}
              onChange={this.handleInputOnChange(search, instant)}
              onKeyDown={this.handleInputOnKeyDown(
                suggestions,
                results,
                search,
                instant
              )}
              onFocus={this.handleInputOnFocus}
              onBlur={this.handleInputOnBlur}
              onVoiceInput={this.handleOnVoiceInput(search.search)}
              onSearchButtonClick={this.handleSearchButtonClick(search.search)}
            />
            <Dropdown isOpen={isDropdownOpen} element={this.inputContainer}>
              <Suggestions />
            </Dropdown>
          </Container>
        )}
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
    const value = event.target.value;
    this.setState(
      state => ({ ...state, inputValue: value, highlightedIndex: 0 }),
      () => {
        const { inputValue } = this.state;
        instant.search(inputValue, false);
      }
    );
  };

  private handleInputOnKeyDown = (
    suggestions: string[],
    results: Result[],
    search: { search: SearchFn; clear: ClearFn },
    instant: { search: SearchFn; clear: ClearFn }
  ) => (event: InputKeyboardEvent) => {
    const { keyCode } = event;

    if (keyCode === InputKeyCodes.Return) {
      const { inputValue, highlightedIndex } = this.state;
      const suggestion = suggestions[highlightedIndex - 1];

      if (suggestion === undefined) {
        search.search(inputValue, true);
      } else {
        this.setState(state => ({ ...state, inputValue: suggestion }));
        search.search(suggestion, true);
      }

      instant.clear();
      if (this.input !== undefined) {
        this.input.blur();
      }
    }

    if (keyCode === InputKeyCodes.Escape) {
      this.setState(
        state => ({
          ...state,
          inputValue: "",
          isDropdownOpen: false,
          highlightedIndex: 0
        }),
        () => {
          search.clear({ q: "" });
          instant.clear({ q: "" });

          if (this.input !== undefined) {
            this.input.blur();
          }
        }
      );
      return;
    }

    if (keyCode === InputKeyCodes.UpArrow) {
      event.preventDefault();
      const { highlightedIndex } = this.state;
      if (highlightedIndex === 0) {
        this.setState(state => ({
          ...state,
          highlightedIndex: suggestions.length
        }));
        return;
      }

      this.setState(state => ({
        ...state,
        highlightedIndex: ((state.highlightedIndex as number) -= 1)
      }));
      return;
    }

    if (keyCode === InputKeyCodes.DownArrow) {
      const { highlightedIndex } = this.state;
      if (highlightedIndex === suggestions.length) {
        this.setState(state => ({ ...state, highlightedIndex: 0 }));
        return;
      }

      this.setState(state => ({
        ...state,
        highlightedIndex: ((state.highlightedIndex as number) += 1)
      }));
      return;
    }

    if (keyCode === InputKeyCodes.RightArrow) {
      const { highlightedIndex } = this.state;
      const suggestion = suggestions[highlightedIndex - 1];
      if (suggestion === undefined) {
        return;
      }

      this.setState(
        state => ({
          ...state,
          inputValue: suggestions[state.highlightedIndex - 1]
        }),
        () => {
          const { inputValue } = this.state;
          instant.search(inputValue, false);
        }
      );
    }
  };

  private handleInputOnFocus = (event: InputFocusEvent) => {
    this.setState(state => ({ ...state, isDropdownOpen: true }));
  };

  private handleInputOnBlur = (event: InputFocusEvent) => {
    this.setState(state => ({
      ...state,
      isDropdownOpen: false,
      highlightedIndex: 0
    }));
  };

  private handleOnVoiceInput = (search: SearchFn) => (result: string) => {
    this.setState(
      state => ({ ...state, inputValue: result }),
      () => {
        const { inputValue } = this.state;
        search(inputValue, true);
      }
    );
  };

  private handleSearchButtonClick = (search: SearchFn) => (
    event: ButtonMouseEvent
  ) => {
    const { inputValue } = this.state;
    search(inputValue, true);
  };

  private setHighlightedIndex = (index: number) =>
    this.setState(state => ({ ...state, highlightedIndex: index }));

  private selectItem = (search: SearchFn) => (item: string) =>
    this.setState(
      state => ({ ...state, inputValue: item }),
      () => {
        const { inputValue } = this.state;
        search(inputValue, true);
      }
    );
}
