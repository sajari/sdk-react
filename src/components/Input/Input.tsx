import Downshift, { DownshiftState } from "downshift";
import * as React from "react";
// @ts-ignore: module missing definition file
import AutosizeInput from "react-input-autosize";
// @ts-ignore: module missing definition file
import memoize from "memoize-one";

import { isNotEmptyString, isNotEmptyArray, trimPrefix } from "./utils";

import { Consumer } from "../context";
import { SearchFn } from "../context/pipeline/context";
import { Response } from "../../controllers/response";
import { IRenderFnProps, Resizer } from "./Resizer";
import { InputBox } from "./InputBox";
import { Suggestions } from "./Suggestions";

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
import { IConfig } from "../../config";

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

  public render() {
    const { autocomplete, instant } = this.props;

    return (
      <Consumer>
        {({
          search: { response, completion, suggestions, search, config },
          instant: {
            search: instantSearch,
            suggestions: instantSuggestions,
            completion: instantCompletion
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
              inputValue: value = "",
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
                <Container {...getRootProps({ refKey: "innerRef" })}>
                  <InputBox
                    value={value as string}
                    autocomplete={autocomplete}
                    instant={instant as boolean}
                    containerRef={this.inputContainerRef}
                    isOverride={isOverride(response, config)}
                    isDropdownOpen={isSuggestionsDropdownOpen}
                    highlightedIndex={highlightedIndex || 0}
                    onChange={this.handleOnChange}
                    downshift={{
                      isOpen,
                      getInputProps,
                      getItemProps,
                      setState,
                      selectItem,
                      openMenu
                    }}
                  />
                  <Resizer element={this.inputContainer}>
                    {({ offset }: IRenderFnProps) => (
                      <Suggestions
                        isOpen={isSuggestionsDropdownOpen}
                        offset={offset}
                        suggestions={isNotEmptyArray(
                          suggestions,
                          instantSuggestions
                        )}
                        inputValue={value as string}
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
    state: DownshiftState,
    changes: any
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.blurInput:
      case Downshift.stateChangeTypes.mouseUp:
        return {
          ...changes,
          inputValue: state.inputValue
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
        if (state.highlightedIndex === null) {
          return {
            ...changes,
            highlightedIndex: 0
          };
        }

        return changes;
    }
  };
}

const isOverride = (response: Response | null, config: IConfig) => {
  let isOverride = false;
  if (response !== null && response.getQueryValues() !== undefined) {
    isOverride = Boolean(
      (response.getQueryValues() as Map<string, string>).get(
        config.qOverrideParam
      )
    );
  }
  return isOverride;
};
