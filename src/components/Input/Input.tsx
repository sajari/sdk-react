import Downshift, { DownshiftState } from "downshift";
import idx from "idx";
// @ts-ignore: module missing definition file
import memoize from "memoize-one";
import * as React from "react";
// @ts-ignore: module missing definition file
import AutosizeInput from "react-input-autosize";

import { isNotEmptyArray, isNotEmptyString, trimPrefix } from "./utils";

import { Response } from "../../controllers/response";
import { Consumer } from "../context";
import { SearchFn } from "../context/pipeline/context";
import { InputBox } from "./InputBox";
import { RenderFnProps, Resizer } from "./Resizer";
import { Suggestions } from "./Suggestions";

import { Config } from "../../config";
import {
  Container,
  Input as SearchInput,
  InputContainer,
  InputInnerContainer,
  inputResetStyles,
  SearchButton,
  SearchIcon,
  Typeahead
} from "./styled";

export interface InputProps {
  autocomplete: boolean | "dropdown";
  autofocus?: boolean;
  instant?: boolean;
  placeholder?: string;
  styles?: InputStyles;

  DropdownRenderer?: React.ComponentType;
  onSearchButtonClick?: (event: any, search: SearchFn, value: string) => void;
}

export interface InputState {
  inputValue: string;
}

export interface InputStyles {
  container?: any;
  input?: any;
  dropdown?: any;
}

export class Input extends React.Component<InputProps, InputState> {
  public static defaultProps = {
    autocomplete: false,
    autofocus: false,
    instant: false
  };

  public state = { inputValue: "" };

  private inputContainer?: HTMLDivElement;

  public render() {
    const {
      autocomplete,
      instant,
      autofocus,
      placeholder,
      styles = {},
      DropdownRenderer,
      onSearchButtonClick
    } = this.props;

    if (autocomplete === "dropdown" && DropdownRenderer !== undefined) {
      throw new Error(
        'You cannot provide a DropdownRenderer when using `autocomplete="dropdown"`'
      );
    }

    return (
      <Consumer>
        {({
          search: { response, completion, suggestions, search, config, query },
          instant: {
            search: instantSearch,
            suggestions: instantSuggestions,
            completion: instantCompletion,
            query: instantQuery
          }
        }) => (
          <Downshift
            stateReducer={this.stateReducer(instantSearch)}
            onSelect={this.handleSelect(search, instantSearch)}
          >
            {({
              getRootProps,
              getInputProps,
              getItemProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
              selectItem,
              // @ts-ignore: setState is passed by Downshift
              setState,
              openMenu
            }) => {
              const isSuggestionsDropdownOpen =
                autocomplete &&
                (autocomplete as string) === "dropdown" &&
                isOpen &&
                isNotEmptyArray(suggestions, instantSuggestions).length > 0;

              return (
                <Container
                  {...getRootProps({ refKey: "innerRef" })}
                  styles={idx(styles, _ => _.container)}
                >
                  <InputBox
                    inputValue={inputValue !== null ? inputValue : ""}
                    autocomplete={autocomplete}
                    placeholder={placeholder}
                    instant={instant as boolean}
                    autofocus={autofocus as boolean}
                    containerRef={this.inputContainerRef}
                    isOverride={isOverride(response, config)}
                    isDropdownOpen={isSuggestionsDropdownOpen}
                    highlightedIndex={highlightedIndex || 0}
                    onChange={this.handleOnChange}
                    onSearchButtonClick={onSearchButtonClick}
                    downshift={{
                      isOpen,
                      getInputProps,
                      getItemProps,
                      setState,
                      selectItem,
                      openMenu
                    }}
                    styles={idx(styles, _ => _.input)}
                  />
                  <Resizer
                    element={this.inputContainer}
                    styles={idx(styles, _ => _.dropdown)}
                  >
                    {autocomplete &&
                    autocomplete !== "dropdown" &&
                    DropdownRenderer !== undefined ? (
                      <DropdownRenderer />
                    ) : (
                      <Suggestions
                        isOpen={isSuggestionsDropdownOpen}
                        suggestions={isNotEmptyArray(
                          suggestions,
                          instantSuggestions
                        )}
                        inputValue={inputValue as string}
                        highlightedIndex={highlightedIndex as number}
                        getItemProps={getItemProps}
                      />
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

  private inputContainerRef = (el: any) => (this.inputContainer = el);

  private handleOnChange = (inputValue: string) =>
    this.setState(state => ({ ...state, inputValue }));

  private handleSelect = (search: SearchFn, instantSearch: SearchFn) => (
    selectedItem: string
  ) =>
    this.setState(
      state => ({ ...state, inputValue: selectedItem }),
      () => {
        const { autocomplete } = this.props;
        const { inputValue } = this.state;

        search(inputValue, true);

        if (autocomplete && autocomplete !== "dropdown") {
          // this is to update the suggestions list if the user
          // clicks on the input again
          instantSearch(inputValue, false);
        }
      }
    );

  private stateReducer = (search: SearchFn) => (
    downshiftState: DownshiftState,
    changes: any
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.blurInput:
      case Downshift.stateChangeTypes.mouseUp:
        return {
          ...changes,
          inputValue: downshiftState.inputValue
        };

      case Downshift.stateChangeTypes.keyDownEscape:
        this.setState(
          state => ({ ...state, inputValue: changes.inputValue }),
          () => {
            search(this.state.inputValue, false);
          }
        );
        return changes;

      default:
        if (downshiftState.highlightedIndex === null) {
          return {
            ...changes,
            highlightedIndex: 0
          };
        }

        return changes;
    }
  };
}

const isOverride = (response: Response | null, config: Config) => {
  let override = false;
  if (response !== null && response.getQueryValues() !== undefined) {
    override = Boolean(
      (response.getQueryValues() as Map<string, string>).get(
        config.qOverrideParam
      )
    );
  }
  return override;
};
