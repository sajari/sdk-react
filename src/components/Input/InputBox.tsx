import * as React from "react";
import { css } from "emotion";

import { isNotEmptyArray, isNotEmptyString, trimPrefix } from "./utils";

import { Consumer } from "../context";
import { SearchFn } from "../context/pipeline/context";
import { Typeahead } from "./Typeahead";

import {
  Input as SearchInput,
  InputContainer,
  SearchContainer,
  InputInnerContainer,
  inputResetStyles,
  SearchButton,
  SearchIcon
} from "./styled";

type DownshiftSetStateFn = (state: { [k: string]: any }) => void;

const RETURN_KEYCODE = 13;
const RIGHT_ARROW_KEYCODE = 39;

export interface IInputBoxProps {
  value: string;
  autocomplete: boolean | "dropdown";
  instant: boolean;
  isOverride: boolean;
  isDropdownOpen: boolean;
  highlightedIndex: number;
  containerRef: (el: any) => void;
  onChange: (value: string) => void;
  downshift: {
    isOpen: boolean;
    getInputProps: (props: any) => any;
    getItemProps: (props: any) => any;
    setState: (state: any) => void;
    selectItem: (item: any) => void;
    openMenu: () => void;
  };
}

export class InputBox extends React.Component<IInputBoxProps> {
  private input?: HTMLInputElement;

  public render() {
    const {
      value,
      autocomplete,
      instant,
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
      }
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
          >
            <SearchContainer role="search">
              <InputInnerContainer>
                <SearchInput
                  minWidth={1}
                  value={value}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  inputRef={this.inputRef}
                  className={css(inputResetStyles.container)}
                  inputStyle={inputResetStyles.input}
                  {...getInputProps({
                    onFocus: openMenu,
                    onChange: this.handleOnChange(
                      instant
                        ? search
                        : autocomplete && autocomplete !== "dropdown"
                          ? search
                          : instantSearch
                    ),
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
                    autocomplete && isOpen && !isOverride && value !== ""
                  }
                  value={value}
                  autocomplete={autocomplete}
                  completion={[completion, instantCompletion]}
                  suggestions={[suggestions, instantSuggestions]}
                  highlightedIndex={highlightedIndex - 1}
                />
              </InputInnerContainer>
              <SearchButton
                onClick={this.handleSearchButton(search)}
                aria-label="Do search"
                value="Search"
              >
                <SearchIcon />
              </SearchButton>
            </SearchContainer>
            <span
              className={css({ display: "none" })}
              {...getItemProps({ item: value as string })}
            />
            {autocomplete &&
            autocomplete !== "dropdown" &&
            isNotEmptyString(completion, instantCompletion) !== value ? (
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
    event.preventDefault();

    const { value } = this.props;
    search(value, true);
  };

  private handleOnChange = (search: SearchFn) => (event: any) => {
    const { autocomplete, onChange } = this.props;

    event.persist();
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
