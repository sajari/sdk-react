import Downshift, { DownshiftState } from "downshift";
import * as React from "react";
// @ts-ignore: module missing definition file
import AutosizeInput from "react-input-autosize";

import { Consumer } from "../context";
import { SearchFn } from "../context/pipeline/context";
import { IRenderFnProps, Resizer } from "./Resizer";

import {
  Container,
  Input as SearchInput,
  InputContainer,
  InputInnerContainer,
  inputResetStyles,
  SearchIcon,
  Suggestion,
  SuggestionsContainer,
  Typeahead
} from "./styled";

const RIGHT_ARROW_KEYCODE = 39;
const TAB_KEYCODE = 9;
const RETURN_KEYCODE = 13;

export interface IInputProps {
  autocomplete: boolean | "dropdown";
  instant?: boolean;
}

export interface IInputState {
  inputValue: string;
}

export class Input extends React.Component<IInputProps, IInputState> {
  public static defaultProps = {
    autocomplete: false,
    instant: false
  };

  public state = { inputValue: "" };

  private inputContainer?: HTMLDivElement;
  private input?: HTMLInputElement;

  public render() {
    const { autocomplete, instant } = this.props;
    const { inputValue } = this.state;

    return (
      <Consumer>
        {({
          search: { completion, suggestions, search },
          instant: {
            search: instantSearch,
            suggestions: instantSuggestions,
            completion: instantCompletion
          }
        }) => (
          <Downshift
            stateReducer={stateReducer}
            onSelect={this.handleSelect(search)}
          >
            {({
              getRootProps,
              getInputProps,
              getItemProps,
              isOpen,
              inputValue: value,
              highlightedIndex,
              selectedItem,
              selectItem,
              // @ts-ignore: setState is passed by Downshift
              setState
            }) => {
              const isSuggestionsDropdownOpen =
                autocomplete &&
                (autocomplete as string) === "dropdown" &&
                isOpen &&
                isNotEmptyArray(suggestions, instantSuggestions).length > 0;

              return (
                <Container {...getRootProps({ refKey: "innerRef" })}>
                  <InputContainer
                    innerRef={this.inputContainerRef}
                    onClick={this.positionCaret}
                    isDropdownOpen={isSuggestionsDropdownOpen}
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
                          onChange: this.handleOnChange(
                            instant
                              ? search
                              : autocomplete && autocomplete !== "dropdown"
                                ? search
                                : instantSearch
                          ),
                          onKeyDown: (event: any) => {
                            if (
                              !autocomplete &&
                              event.keyCode === RETURN_KEYCODE
                            ) {
                              selectItem(event.target.value);
                            }

                            this.handleTypeaheadCompletionKeyPress(
                              autocomplete,
                              event,
                              event.keyCode,
                              isNotEmptyString(completion, instantCompletion),
                              [suggestions, instantSuggestions],
                              (highlightedIndex || 0) - 1,
                              setState
                            );
                          }
                        })}
                      />
                      {autocomplete && isOpen && inputValue !== "" ? (
                        <Typeahead>
                          {this.getTypeaheadValue(
                            autocomplete,
                            [completion, instantCompletion],
                            [suggestions, instantSuggestions],
                            (highlightedIndex || 0) - 1,
                            (value as string).length
                          )}
                        </Typeahead>
                      ) : null}
                    </InputInnerContainer>
                    <SearchIcon />
                    <div
                      style={{ display: "none" }}
                      {...getItemProps({ item: value as string })}
                    />
                    {autocomplete && autocomplete !== "dropdown" ? (
                      <div
                        style={{ display: "none" }}
                        {...getItemProps({ item: instantCompletion })}
                      />
                    ) : null}
                  </InputContainer>
                  <Resizer element={this.inputContainer}>
                    {({ offset }: IRenderFnProps) => (
                      <React.Fragment>
                        {isSuggestionsDropdownOpen ? (
                          <SuggestionsContainer position={offset}>
                            {isNotEmptyArray(
                              suggestions,
                              instantSuggestions
                            ).map((item, index) => (
                              <Suggestion
                                {...getItemProps({ item })}
                                key={item}
                                isHighlighted={highlightedIndex === index + 1}
                              >
                                {item.substr(0, (value as string).length)}
                                <strong>
                                  {item.slice((value as string).length)}
                                </strong>
                              </Suggestion>
                            ))}
                          </SuggestionsContainer>
                        ) : null}
                      </React.Fragment>
                    )}
                  </Resizer>
                </Container>
              );
            }}
          </Downshift>
        )}
      </Consumer>
    );
  }

  private inputRef = (el: any) => (this.input = el);
  private inputContainerRef = (el: any) => (this.inputContainer = el);

  private positionCaret = () => {
    if (this.input === null || this.input === undefined) {
      return;
    }
    this.input.focus();
  };

  private handleSelect = (search: SearchFn) => (selectedItem: string) =>
    this.setState(
      state => ({ ...state, inputValue: selectedItem }),
      () => {
        const { inputValue } = this.state;
        search(inputValue, true);
      }
    );

  private handleOnChange = (search: SearchFn) => (event: any) => {
    const { autocomplete } = this.props;

    event.persist();
    this.setState(
      state => ({
        ...state,
        inputValue: event.target.value
      }),
      () => {
        if (autocomplete) {
          const { inputValue } = this.state;
          search(inputValue, !autocomplete);
        }
      }
    );
  };

  private getTypeaheadValue = (
    autocomplete: boolean | "dropdown",
    completion: string[],
    suggestions: Array<Array<string>>,
    index: number,
    length: number
  ) => {
    return autocomplete !== "dropdown"
      ? isNotEmptyString(completion[0], completion[1]).slice(length)
      : (isNotEmptyArray(suggestions[0], suggestions[1])[index] || "").slice(
          length
        );
  };

  private handleTypeaheadCompletionKeyPress = (
    autocomplete: boolean | "dropdown",
    event: any,
    keyCode: number,
    completion: string,
    suggestions: Array<Array<string>>,
    index: number,
    setState: (state: { [k: string]: any }) => void
  ) => {
    if (!autocomplete) {
      return;
    }

    if (keyCode === TAB_KEYCODE) {
      event.preventDefault();
    }

    if (keyCode === RIGHT_ARROW_KEYCODE || keyCode === TAB_KEYCODE) {
      const value =
        autocomplete !== "dropdown"
          ? completion
          : isNotEmptyArray(suggestions[0], suggestions[1])[index];

      if (autocomplete === "dropdown" && value === undefined) {
        return;
      }

      this.setState(
        state => ({
          ...state,
          inputValue: value
        }),
        () => {
          const { inputValue } = this.state;
          setState({ inputValue });
        }
      );
    }
  };
}

const stateReducer = (state: DownshiftState, changes: any) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.blurInput:
    case Downshift.stateChangeTypes.mouseUp:
      return {
        ...changes,
        inputValue: state.inputValue
      };

    default:
      if (state.highlightedIndex === null) {
        return {
          ...changes,
          highlightedIndex: 0
        };
      }

      return changes;
  }
};

const isNotEmptyString = (a: string, b: string) => (a === "" ? b : a);
const isNotEmptyArray = (a: any[], b: any[]) => (a.length === 0 ? b : a);
