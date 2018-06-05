import { css } from "emotion";
import idx from "idx";
import * as React from "react";

import { isNotEmptyArray, isNotEmptyString, trimPrefix } from "./utils";

import { Consumer } from "../context";
import { SearchFn } from "../context/pipeline/context";
import { Typeahead } from "./Typeahead";

import {
  Input as SearchInput,
  InputContainer,
  InputInnerContainer,
  inputResetStyles,
  SearchButton,
  SearchContainer,
  SearchIcon
} from "./styled";

type DownshiftSetStateFn = (state: { [k: string]: any }) => void;

const RETURN_KEYCODE = 13;
const RIGHT_ARROW_KEYCODE = 39;

export interface InputBoxProps {
  inputValue: string;
  placeholder?: string;
  autocomplete: boolean | "dropdown";
  instant: boolean;
  autofocus: boolean;
  isOverride: boolean;
  isDropdownOpen: boolean;
  highlightedIndex: number;
  containerRef: (el: any) => void;
  onChange: (value: string) => void;
  onSearchButtonClick?: (event: any, search: SearchFn, value: string) => void;
  downshift: {
    isOpen: boolean;
    getInputProps: (props: any) => any;
    getItemProps: (props: any) => any;
    setState: (state: any) => void;
    selectItem: (item: any) => void;
    openMenu: () => void;
  };

  styles?: {
    container?: React.CSSProperties;
    input?: React.CSSProperties;
    typeahead?: React.CSSProperties;
    button?: React.CSSProperties;
  };
}

export class InputBox extends React.Component<InputBoxProps> {
  private input?: HTMLInputElement;

  public render() {
    const {
      inputValue,
      placeholder,
      autocomplete,
      instant,
      autofocus,
      highlightedIndex,
      isOverride,
      isDropdownOpen,
      containerRef,
      downshift: {
        isOpen,
        getInputProps,
        getItemProps,
        setState,
        selectItem,
        openMenu
      },
      styles = {}
    } = this.props;

    return (
      <Consumer>
        {({
          search: { search, suggestions, completion },
          instant: {
            search: instantSearch,
            suggestions: instantSuggestions,
            completion: instantCompletion
          }
        }) => (
          <InputContainer
            innerRef={containerRef}
            isDropdownOpen={isDropdownOpen}
            onClick={this.positionCaret}
            styles={idx(styles, _ => _.container)}
          >
            <SearchContainer role="search">
              <InputInnerContainer styles={idx(styles, _ => _.input)}>
                <SearchInput
                  minWidth={1}
                  value={inputValue}
                  placeholder={!isOpen ? placeholder : undefined}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoFocus={autofocus}
                  spellCheck="false"
                  inputRef={this.inputRef}
                  className={css(inputResetStyles.container)}
                  inputStyle={inputResetStyles.input}
                  {...getInputProps({
                    onChange: this.handleOnChange(
                      instant
                        ? search
                        : autocomplete && autocomplete !== "dropdown"
                          ? search
                          : instantSearch
                    ),
                    onFocus: openMenu,
                    onKeyDown: this.handleKeyDown(
                      autocomplete,
                      [completion, instantCompletion],
                      [suggestions, instantSuggestions],
                      highlightedIndex - 1,
                      setState,
                      selectItem
                    )
                  })}
                />
                <Typeahead
                  isActive={
                    autocomplete &&
                    (autocomplete !== "dropdown" || isOpen) &&
                    !isOverride &&
                    inputValue !== ""
                  }
                  value={inputValue}
                  autocomplete={autocomplete}
                  completion={[completion, instantCompletion]}
                  suggestions={[suggestions, instantSuggestions]}
                  highlightedIndex={highlightedIndex - 1}
                  styles={idx(styles, _ => _.typeahead)}
                />
              </InputInnerContainer>
              <SearchButton
                onClick={this.handleSearchButton(search)}
                aria-label="Do search"
                value="Search"
                styles={idx(styles, _ => _.button)}
              >
                <SearchIcon />
              </SearchButton>
            </SearchContainer>
            <span
              className={css({ display: "none" })}
              {...getItemProps({ item: inputValue })}
            />
            {autocomplete &&
            autocomplete !== "dropdown" &&
            isNotEmptyString(completion, instantCompletion) !== inputValue ? (
              <span
                className={css({ display: "none" })}
                {...getItemProps({
                  item: isNotEmptyString(completion, instantCompletion)
                })}
              />
            ) : null}
          </InputContainer>
        )}
      </Consumer>
    );
  }

  private inputRef = (el: any) => (this.input = el);

  private positionCaret = (event: any) => {
    if (this.input === null || this.input === undefined) {
      return;
    }
    if (event.target.tagName !== "DIV") {
      // only focus the input if pressing on the div
      return;
    }

    this.input.focus();
  };

  private handleSearchButton = (search: SearchFn) => (event: any) => {
    const { inputValue, onSearchButtonClick } = this.props;

    event.preventDefault();

    if (onSearchButtonClick !== undefined) {
      onSearchButtonClick(event, search, inputValue);
      return;
    }

    search(inputValue, true);
  };

  private handleOnChange = (search: SearchFn) => (event: any) => {
    const { autocomplete, onChange } = this.props;
    const value = event.target.value;

    onChange(value);
    if (autocomplete) {
      search(value, !autocomplete);
    }
  };

  private handleKeyDown = (
    autocomplete: boolean | "dropdown",
    completion: string[],
    suggestions: string[][],
    highlightedIndex: number,
    setState: DownshiftSetStateFn,
    selectItem: (item: string) => void
  ) => (event: any) => {
    if (
      (!autocomplete || (autocomplete && autocomplete !== "dropdown")) &&
      event.keyCode === RETURN_KEYCODE
    ) {
      selectItem(event.target.value);
      return;
    }

    this.handleTypeaheadCompletionKeyPress(
      autocomplete,
      event,
      event.keyCode,
      isNotEmptyString(completion[0], completion[1]),
      suggestions,
      highlightedIndex,
      setState
    );
  };

  private handleTypeaheadCompletionKeyPress = (
    autocomplete: boolean | "dropdown",
    event: any,
    keyCode: number,
    completion: string,
    suggestions: string[][],
    index: number,
    setState: DownshiftSetStateFn
  ) => {
    if (!autocomplete) {
      return;
    }

    if (keyCode === RIGHT_ARROW_KEYCODE) {
      const value =
        autocomplete !== "dropdown"
          ? completion
          : isNotEmptyArray(suggestions[0], suggestions[1])[index];

      if (
        value === "" ||
        (autocomplete === "dropdown" && value === undefined)
      ) {
        return;
      }

      setState({ inputValue: value });
    }
  };
}
