import * as React from "react";
import { css } from "emotion";

import {
  InputContainer,
  SearchContainer,
  InputInnerContainer,
  Input,
  inputResetStyles,
  SearchButton,
  SearchIcon,
  ButtonContainer
} from "./styled";
import { VoiceInputButton } from "./VoiceInputButton";
import { Typeahead } from "../Typeahead";

const RETURN_KEYCODE = 13;

export type InputKeyboardEvent = React.KeyboardEvent<HTMLInputElement>;
export type InputFocusEvent = React.FocusEvent<HTMLInputElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonMouseEvent = React.MouseEvent<HTMLButtonElement>;

export interface InputBoxProps {
  value: string;
  placeholder?: string;
  isDropdownOpen?: boolean;
  mode?: "standard" | "typeahead" | "suggestions";

  inputRef?: (element: HTMLInputElement) => void;
  inputContainerRef?: (element: HTMLFormElement) => void;
  onFocus?: (event: InputFocusEvent) => void;
  onBlur?: (event: InputFocusEvent) => void;
  onChange?: (event: InputChangeEvent) => void;
  onKeyDown?: (event: InputKeyboardEvent) => void;

  onSearchButtonClick?: (event: ButtonMouseEvent) => void;
  onVoiceInput?: (result: string) => void;
}

export interface InputBoxState {
  focused: boolean;
}

export class InputBox extends React.Component<InputBoxProps, InputBoxState> {
  public static defaultProps = {
    mode: "standard"
  };

  public state = { focused: false };
  private input?: HTMLInputElement;
  private inputContainer?: HTMLFormElement;

  render() {
    const {
      value,
      placeholder,
      isDropdownOpen,
      mode,
      onChange,
      onVoiceInput
    } = this.props;
    const { focused } = this.state;

    return (
      <InputContainer
        innerRef={this.inputContainerRef}
        isDropdownOpen={isDropdownOpen === undefined ? false : isDropdownOpen}
        onClick={this.positionCaret}
      >
        <SearchContainer role="search">
          <InputInnerContainer>
            <Input
              className={css(inputResetStyles.container)}
              inputStyle={inputResetStyles.input}
              inputRef={this.inputRef}
              value={value}
              placeholder={!focused ? placeholder : undefined}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              onKeyDown={this.handleInputOnKeyDown}
              onChange={onChange}
              onFocus={this.handleInputOnFocus}
              onBlur={this.handleInputOnBlur}
            />
            {mode === "typeahead" || mode === "suggestions" ? (
              <Typeahead mode={mode} />
            ) : null}
          </InputInnerContainer>
          <ButtonContainer>
            <VoiceInputButton onVoiceInput={onVoiceInput} />
            <SearchButton
              onClick={this.handleSearchButtonOnClick}
              aria-label="Do search"
              value="Search"
            >
              <SearchIcon />
            </SearchButton>
          </ButtonContainer>
        </SearchContainer>
      </InputContainer>
    );
  }

  private handleSearchButtonOnClick = (event: ButtonMouseEvent) => {
    const { onSearchButtonClick } = this.props;
    event.preventDefault();
    if (typeof onSearchButtonClick === "function") {
      onSearchButtonClick(event);
    }
  };

  private handleInputOnFocus = (event: InputFocusEvent) => {
    const { onFocus } = this.props;
    this.setState(state => ({ ...state, focused: true }));

    if (typeof onFocus === "function") {
      onFocus(event);
    }
  };

  private handleInputOnBlur = (event: InputFocusEvent) => {
    const { onBlur } = this.props;
    this.setState(state => ({ ...state, focused: false }));

    if (typeof onBlur === "function") {
      onBlur(event);
    }
  };

  private handleInputOnKeyDown = (event: InputKeyboardEvent) => {
    const { onKeyDown } = this.props;
    const { keyCode } = event;
    if (keyCode === RETURN_KEYCODE) {
      event.preventDefault();
    }

    if (typeof onKeyDown === "function") {
      onKeyDown(event);
    }
  };

  private inputContainerRef = (element: HTMLFormElement) => {
    this.inputContainer = element;
    if (typeof this.props.inputContainerRef === "function") {
      this.props.inputContainerRef(element);
    }
  };
  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
    if (typeof this.props.inputRef === "function") {
      this.props.inputRef(element);
    }
  };
  private positionCaret = (event: React.MouseEvent<HTMLElement>) => {
    if (this.input === undefined) {
      return;
    }
    // @ts-ignore: tagName is a member of event.target
    if (event.target.tagName !== "DIV") {
      // only focus the input if pressing on the div
      return;
    }

    this.input.focus();
  };
}
