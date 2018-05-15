import Downshift from "downshift";
import * as React from "react";
// @ts-ignore: module missing definition file
import AutosizeInput from "react-input-autosize";

import { Consumer, IContext } from "../context";
import { SearchFn } from "../context/context";
import { IResizerState, Resizer } from "./Resizer";

import {
  Container,
  Input as SearchInput,
  InputContainer,
  inputResetStyles,
  Suggestion,
  SuggestionsContainer,
  Typeahead
} from "./styled";

export interface IInputProps {
  autocomplete: boolean | "autocomplete";
}

export interface IInputState {
  inputValue: string;
}

export class Input extends React.Component<IInputProps, IInputState> {
  public static defaultProps = {
    autocomplete: false
  };

  public state = { inputValue: "" };

  private inputContainer?: HTMLDivElement;
  private input?: HTMLInputElement;

  public render() {
    const { autocomplete } = this.props;
    const { inputValue } = this.state;

    return (
      <Consumer>
        {({ completion, suggestions, search }) => (
          <Downshift
            inputValue={inputValue}
            onSelect={this.handleSelect(search)}
            defaultIsOpen={true}
          >
            {({
              getRootProps,
              getInputProps,
              getItemProps,
              isOpen,
              inputValue: value,
              highlightedIndex,
              selectedItem
            }) => (
              <Container {...getRootProps({ refKey: "innerRef" })}>
                <InputContainer
                  innerRef={this.inputContainerRef}
                  onClick={this.positionCaret}
                >
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
                      onChange: this.handleOnChange(search)
                    })}
                  />
                  {autocomplete ? (
                    <Typeahead>
                      {completion.slice((value as string).length || 0)}
                    </Typeahead>
                  ) : null}
                </InputContainer>
                <Resizer element={this.inputContainer}>
                  {({ offset }: IResizerState) => (
                    <React.Fragment>
                      {autocomplete &&
                      (autocomplete as string) === "dropdown" &&
                      isOpen &&
                      suggestions.length > 0 ? (
                        <SuggestionsContainer position={offset}>
                          {suggestions.map((item, index) => (
                            <Suggestion
                              {...getItemProps({ item })}
                              key={item}
                              isHighlighted={highlightedIndex === index}
                              isSelected={selectedItem === item}
                            >
                              {item}
                            </Suggestion>
                          ))}
                        </SuggestionsContainer>
                      ) : null}
                    </React.Fragment>
                  )}
                </Resizer>
              </Container>
            )}
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
    event.persist();
    this.setState(
      state => ({
        ...state,
        inputValue: event.target.value
      }),
      () => {
        const { inputValue } = this.state;
        search(inputValue, false);
      }
    );
  };
}
