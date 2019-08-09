/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
/* tslint:disable max-classes-per-file */
import { Result } from "@sajari/sdk-js";
import { withTheme } from "emotion-theming";
import * as React from "react";
import { Theme } from "../styles";
import { ResultRendererProps, Results } from "./Results";
import { Suggestions } from "./Suggestions";
import { Typeahead } from "./Typeahead";
import { CSSObject } from "@emotion/core";
import {
  Search,
  PipelineProps,
  SearchState,
  StateChangeOptions
} from "../Search";
import { VoiceInput, MicIcon, EmptyMicIcon } from "./Voice";
import classnames from "classnames";

export type InputMode = "standard" | "typeahead";
export type DropdownMode = "none" | "suggestions" | "results";

export interface InputProps {
  mode: InputMode;
  dropdownMode: DropdownMode;
  instantSearch?: boolean;

  defaultValue?: string;
  ariaLabel?: string;
  placeholder?: string;
  autoFocus?: boolean;
  buttonText?: string;

  experimental?: {
    voiceToText?: boolean;
  };

  inputRef?: (element: HTMLInputElement) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;

  // The result render is only used when dropdownMode === "results"
  ResultRenderer?: React.ComponentType<ResultRendererProps>;

  className?: string;
  theme?: Theme;
  styles?: {
    container?: CSSObject;
    input?: (isFocused: boolean) => CSSObject;
    typeahead?: CSSObject;
    button?: CSSObject;
    suggestions?: {
      container?: CSSObject;
      item?: (isFocused: boolean) => CSSObject;
    };
  };
}

interface InputState {
  typedInputValue: string;
}

const itemToString = (item: Result) =>
  (item != undefined && (item.values.title as string)) || "";

export class Input extends React.PureComponent<InputProps, InputState> {
  public static defaultProps = {
    mode: "standard",
    dropdownMode: "none",
    ariaLabel: "Search through the site content",
    placeholder: "Search",
    experimental: { voiceToText: false }
  } as InputProps;

  public state = { focused: false, typedInputValue: "" };

  private searchButton?: HTMLButtonElement;
  private voiceSearchButton?: HTMLButtonElement;
  private input?: HTMLInputElement;

  public componentDidMount() {
    if (!this.state.focused) {
      if (this.props.autoFocus && this.input != null) {
        this.input.focus();
      }
    }
  }

  public render() {
    return (
      <Search
        stateReducer={this.stateReducer}
        key={`sj-downshift-${this.props.defaultValue}`}
        defaultInputValue={this.props.defaultValue}
        defaultSelectedItem={this.props.defaultValue && this.props.defaultValue}
        itemToString={
          this.props.dropdownMode === "results" ? itemToString : undefined
        }
      >
        {searchProps => {
          const {
            suggestions,
            results,
            getInputProps,
            getRootProps,
            openMenu,
            closeMenu,
            setState,
            selectedItem,
            highlightedIndex,
            selectHighlightedItem,
            inputValue,
            selectItem,
            search,
            completion
          } = searchProps;
          const items =
            this.props.dropdownMode === "suggestions" ? suggestions : results;
          return (
            <div
              {
                // @ts-ignore
                ...getRootProps({}, { suppressRefError: true })
              }
              className="sj-input"
              css={
                this.props.styles &&
                this.props.styles.container &&
                this.props.styles.container
              }
            >
              <form
                onClick={this.focusInput}
                className={classnames("sj-input__input", {
                  "sj-input__input--focused": this.state.focused
                })}
                css={[
                  inputContainerStyles(this.state.focused),
                  this.props.styles &&
                    this.props.styles.input &&
                    (this.props.styles.input(this.state.focused) as any)
                ]}
              >
                <div
                  role="search"
                  css={innerContainerStyles(
                    this.getButtonWidth() + this.getVoiceButtonWidth()
                  )}
                >
                  <input
                    type="text"
                    ref={this.inputRef}
                    css={[inputResetStyles.container, inputResetStyles.input]}
                    {...getInputProps({
                      "aria-label": this.props.ariaLabel,
                      placeholder: this.props.placeholder,
                      autoComplete: "off",
                      spellCheck: false,
                      autoCapitalize: "off",
                      autoCorrect: "off",
                      maxLength: 2048,
                      onFocus: event => {
                        openMenu();
                        this.setState(state => ({ ...state, focused: true }));

                        typeof this.props.onFocus === "function" &&
                          this.props.onFocus(event);
                      },
                      onBlur: event => {
                        closeMenu();
                        setState({ highlightedIndex: null });
                        this.setState(state => ({ ...state, focused: false }));

                        typeof this.props.onBlur === "function" &&
                          this.props.onBlur(event);
                      },
                      onChange: event => {
                        typeof this.props.onChange === "function" &&
                          this.props.onChange(event);
                        // @ts-ignore: value is a member of event.target
                        const typedInputValue = event.target.value;
                        this.setState({ typedInputValue });
                      },
                      onKeyDown: (
                        event: React.KeyboardEvent<HTMLInputElement>
                      ) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          // @ts-ignore: Prevent Downshift's default 'Enter' behavior.
                          event.nativeEvent.preventDownshiftDefault = true;
                          if (this.input) {
                            this.input.blur();
                          }

                          let item = selectedItem;
                          if (this.props.dropdownMode === "results") {
                            item = (items || [])[highlightedIndex || -1];
                            if (item === undefined) {
                              return;
                            }
                            const url =
                              Object.getOwnPropertyNames(item.token).length > 0
                                ? item.token
                                : item.values.url;
                            window.location.href = url;
                            return;
                          }

                          if (highlightedIndex !== null) {
                            selectHighlightedItem();
                            item = (items || [])[highlightedIndex];
                          }
                          search(item, true);
                        }

                        if (event.key === "ArrowRight") {
                          if (this.props.dropdownMode !== "results") {
                            if (
                              highlightedIndex !== null &&
                              // @ts-ignore: selectionStart is a member of event.target
                              event.target.selectionStart ===
                                (inputValue || "").length
                            ) {
                              // if the user presses the right arrow key and there is
                              // a highlighted item, select the currently highlighted item
                              // Though make sure we only select the item if we are at the
                              // end of the input element
                              selectHighlightedItem();
                            } else if (
                              highlightedIndex === null &&
                              // @ts-ignore: selectionStart is a member of event.target
                              event.target.selectionStart ===
                                (inputValue || "").length
                            ) {
                              selectItem(completion);
                            }
                          } else {
                            setState({
                              inputValue: completion
                            });
                          }
                        }

                        typeof this.props.onKeyDown === "function" &&
                          this.props.onKeyDown(event);
                      }
                    })}
                    // an explicit aria-label is defined
                    aria-labelledby={undefined}
                  />
                  {this.props.mode === "typeahead" && (
                    <Typeahead
                      inputValue={inputValue || ""}
                      completion={
                        this.props.dropdownMode !== "suggestions"
                          ? completion
                          : undefined
                      }
                      styles={this.props.styles && this.props.styles.typeahead}
                    />
                  )}
                </div>
                {this.props.experimental &&
                  this.props.experimental.voiceToText && (
                    <VoiceInput
                      Renderer={({ onClick, active }) => {
                        return (
                          <button
                            ref={this.voiceButtonRef}
                            onClick={onClick}
                            aria-label="Search by voice"
                            className="sj-input__button"
                            css={[
                              buttonStyles(
                                this.props.theme &&
                                  this.props.theme.colors &&
                                  this.props.theme.colors.brand &&
                                  this.props.theme.colors.brand.primary
                              ),
                              this.props.styles &&
                                this.props.styles.button &&
                                this.props.styles.button
                            ]}
                          >
                            {active ? <MicIcon /> : <EmptyMicIcon />}
                          </button>
                        );
                      }}
                      onVoiceInput={input => {
                        selectItem(input);
                        search(input, true);
                      }}
                    />
                  )}
                <button
                  ref={this.buttonRef}
                  className="sj-input__button"
                  css={[
                    buttonStyles(
                      this.props.theme &&
                        this.props.theme.colors &&
                        this.props.theme.colors.brand &&
                        this.props.theme.colors.brand.primary
                    ),
                    this.props.styles &&
                      this.props.styles.button &&
                      this.props.styles.button
                  ]}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    search(selectedItem, true);
                  }}
                  aria-label="Search"
                  title="Search"
                  value="Search"
                >
                  <SearchIcon />
                  {this.props.buttonText && (
                    <span css={buttonTextStyles}>{this.props.buttonText}</span>
                  )}
                </button>
              </form>
              {this.props.dropdownMode === "suggestions" && (
                <Suggestions
                  searchProps={searchProps}
                  typedInputValue={this.state.typedInputValue}
                  suggestions={items as string[]}
                  styles={this.props.styles && this.props.styles.suggestions}
                />
              )}
              {this.props.dropdownMode === "results" && (
                <Results
                  searchProps={searchProps}
                  ResultRenderer={this.props.ResultRenderer}
                />
              )}
            </div>
          );
        }}
      </Search>
    );
  }

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
    if (typeof this.props.inputRef === "function") {
      this.props.inputRef(element);
    }
  };
  private buttonRef = (element: HTMLButtonElement) => {
    this.searchButton = element;
  };
  private voiceButtonRef = (element: HTMLButtonElement) => {
    this.voiceSearchButton = element;
  };

  private getButtonWidth = () => {
    if (this.searchButton) {
      return this.searchButton.offsetWidth;
    }
    return 0;
  };

  private getVoiceButtonWidth = () => {
    if (this.voiceSearchButton) {
      return this.voiceSearchButton.offsetWidth;
    }
    return 0;
  };

  private focusInput = (_: React.MouseEvent<HTMLFormElement>) => {
    if (this.input) {
      this.input.focus();
      this.setState(state => ({ ...state, focused: true }));
    }
  };

  private stateReducer = (
    state: SearchState<any>,
    changes: StateChangeOptions<any>,
    { search, instantSearch, results, suggestions }: PipelineProps
  ) => {
    const items = this.props.dropdownMode === "results" ? results : suggestions;

    switch (changes.type) {
      case Search.stateChangeTypes.changeInput:
        if (this.props.instantSearch) {
          search(changes.inputValue || "", false);
        } else if (this.props.mode === "typeahead") {
          if ((changes.inputValue || "").length > 2) {
            instantSearch(changes.inputValue || "", false);
          } else {
            instantSearch("", true);
          }
        }

        if (this.props.dropdownMode !== "results") {
          if (changes.inputValue === "") {
            // if we clear the input, reset the selected item back to null
            return { ...changes, selectedItem: null };
          }
          return { ...changes, selectedItem: changes.inputValue };
        } else if (this.props.dropdownMode === "results") {
          return { ...changes, highlightedIndex: null };
        }
        return changes;

      case Search.stateChangeTypes.keyDownArrowUp:
        if (state.highlightedIndex === 0) {
          return {
            ...changes,
            inputValue: this.state.typedInputValue,
            selectedItem: this.state.typedInputValue,
            highlightedIndex: null
          };
        }

        if (changes.highlightedIndex != null) {
          const item = (items || [])[changes.highlightedIndex];
          if (typeof item !== "string") {
            return changes;
          }

          return {
            ...changes,
            inputValue: item,
            selectedItem: item
          };
        }

        return changes;

      case Search.stateChangeTypes.keyDownArrowDown:
        if (state.highlightedIndex === (items || []).length - 1) {
          return {
            ...changes,
            inputValue: this.state.typedInputValue,
            selectedItem: this.state.typedInputValue,
            highlightedIndex: null
          };
        }

        if (changes.highlightedIndex != null) {
          const item = (items || [])[changes.highlightedIndex];
          if (typeof item !== "string") {
            return changes;
          }

          return {
            ...changes,
            inputValue: item,
            selectedItem: item
          };
        }

        return changes;

      case Search.stateChangeTypes.clickItem:
        if (this.input) {
          this.input.blur();
        }

        if (this.props.dropdownMode === "results") {
          const url =
            changes.selectedItem !== undefined &&
            changes.selectedItem.token !== undefined
              ? changes.selectedItem.token
              : changes.selectedItem.values.url;

          window.location.href = url;
          return state;
        }

        search(changes.inputValue || "", true);
        return changes;

      case Search.stateChangeTypes.keyDownEscape:
        if (this.props.dropdownMode === "suggestions") {
          return {
            ...changes,
            inputValue: this.state.typedInputValue,
            selectedItem: this.state.typedInputValue
          };
        }
        return changes;

      case Search.stateChangeTypes.itemMouseEnter:
        if (
          this.props.dropdownMode === "suggestions" &&
          changes.highlightedIndex != null
        ) {
          const item = (items || [])[changes.highlightedIndex];
          if (typeof item !== "string") {
            return changes;
          }

          return {
            ...changes,
            inputValue: item,
            selectedItem: item
          };
        }
        return changes;

      default:
        return changes;
    }
  };
}

// connect input to theme
export default withTheme(Input);

const SearchIcon = (props: any) => (
  <svg viewBox="0 0 18 18" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"
      fill="currentcolor"
    />
  </svg>
);

const inputContainerStyles = (isFocused: boolean) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "3px 9px",

  "&:hover": {
    boxShadow: "0 3px 8px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)"
  },
  borderRadius: 2,
  boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
  transition: "box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1)",
  outline: isFocused
    ? ["#5E9ED6 auto 5px", "-webkit-focus-ring-color auto 5px"]
    : 0
});

const innerContainerStyles = (buttonWidth: number): CSSObject => ({
  position: "relative",
  width: "100%",
  maxWidth: `calc(100% - ${buttonWidth}px)`
});

const inputResetStyles = {
  container: {
    "& > div[style]": {
      display: "inline",
      // fixes sizing bug in firefox v60.0.2
      overflow: "unset !important"
    },
    "&[style]": {
      display: ["inline-block !important", "-moz-inline-stack !important"]
    },
    background: "none",
    overflow: "auto"
  },
  input: {
    background: 0,
    border: 0,
    color: "inherit",
    fontFamily: "inherit",
    width: "100%",
    fontSize: "inherit",
    outline: 0,
    padding: 0,
    textRendering: "optimizeLegibility"
  }
};

const buttonStyles = (primary?: string): CSSObject => ({
  boxSizing: "content-box",
  padding: 8,
  border: 0,
  fontSize: 18,
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: "#737373",
  "&:hover": {
    color: primary != undefined ? primary : "#222"
  }
});

const buttonTextStyles = {
  paddingLeft: 8
};
