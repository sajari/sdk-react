import * as React from "react";

import { isNotEmptyString, isNotEmptyArray, trimPrefix } from "./utils";

import { Consumer } from "../context";
import { SearchFn } from "../context/pipeline/context";

import {
  Input as SearchInput,
  InputContainer,
  InputInnerContainer,
  inputResetStyles,
  SearchButton,
  SearchIcon,
  Typeahead
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

  render() {
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
            <InputInnerContainer>
              <SearchInput
                minWidth={1}
                value={value}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                inputRef={this.inputRef}
                style={inputResetStyles.container}
                inputStyle={inputResetStyles.input}
                {...getInputProps({
                  onFocus: () => {
                    openMenu();
                  },
                  onChange: this.handleOnChange(
                    instant
                      ? search
                      : autocomplete && autocomplete !== "dropdown"
                        ? search
                        : instantSearch
                  ),
                  onKeyDown: (event: any) => {
                    if (
                      (!autocomplete ||
                        (autocomplete && autocomplete !== "dropdown")) &&
                      event.keyCode === RETURN_KEYCODE
                    ) {
                      selectItem(event.target.value);
                      return;
                    }

                    this.handleTypeaheadCompletionKeyPress(
                      autocomplete,
                      event,
                      event.keyCode,
                      isNotEmptyString(completion, instantCompletion),
                      [suggestions, instantSuggestions],
                      highlightedIndex - 1,
                      setState
                    );
                  }
                })}
              />
              {autocomplete && isOpen && !isOverride && value !== "" ? (
                <Typeahead>
                  {getTypeaheadValue(
                    autocomplete,
                    [completion, instantCompletion],
                    [suggestions, instantSuggestions],
                    highlightedIndex - 1,
                    value as string
                  )}
                </Typeahead>
              ) : null}
            </InputInnerContainer>
            <SearchButton onClick={this.handleSearchButton(search)}>
              <SearchIcon />
            </SearchButton>
            <div
              style={{ display: "none" }}
              {...getItemProps({ item: value as string })}
            >
              {value}
            </div>
            {autocomplete && autocomplete !== "dropdown" ? (
              <div
                style={{ display: "none" }}
                {...getItemProps({
                  item: isNotEmptyString(completion, instantCompletion)
                })}
              >
                {isNotEmptyString(completion, instantCompletion)}
              </div>
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

      if (autocomplete === "dropdown" && value === undefined) {
        return;
      }

      setState({ inputValue: value });
    }
  };
}

const getTypeaheadValue = (
  autocomplete: boolean | "dropdown",
  completion: string[],
  suggestions: string[][],
  index: number,
  value: string
) => {
  const suggestion =
    autocomplete !== "dropdown"
      ? isNotEmptyString(completion[0], completion[1])
      : isNotEmptyArray(suggestions[0], suggestions[1])[index] || "";

  return trimPrefix(suggestion, value);
};
