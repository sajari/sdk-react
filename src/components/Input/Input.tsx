/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import { CSSObject } from "@emotion/core";
/* tslint:disable max-classes-per-file */
import { Result } from "@sajari/sdk-js";
import classnames from "classnames";
import { StateChangeTypes } from "downshift";
import { withTheme } from "emotion-theming";
import * as React from "react";
import {
  PipelineProps,
  Search,
  SearchState,
  StateChangeOptions
} from "../Search";
import { Theme } from "../styles";
import { ResultRendererProps, Results } from "./Results";
import { Suggestions } from "./Suggestions";
import { Typeahead } from "./Typeahead";
import { EmptyMicIcon, MicIcon, VoiceInput } from "./Voice";

export type InputMode = "standard" | "typeahead";
export type DropdownMode = "none" | "suggestions" | "results";

export interface InputProps {
  showClearButton?: boolean;
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
  onSearch?: (query: string) => void;

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

  public searchButtonRef = React.createRef<HTMLButtonElement>();
  public voiceSearchButtonRef = React.createRef<HTMLButtonElement>();
  public clearButtonRef = React.createRef<HTMLButtonElement>();
  public inputRef = React.createRef<HTMLInputElement>();

  public state = { focused: false, typedInputValue: "" };

  public componentDidMount() {
    if (!this.state.focused) {
      if (this.props.autoFocus && this.inputRef?.current) {
        this.inputRef.current.focus();
      }
    }
  }

  public getWidth(
    element: HTMLButtonElement | HTMLInputElement | null | undefined
  ) {
    if (!element) {
      return 0;
    }
    return element.offsetWidth;
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
          const resetFunc = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            setState({
              type: Search.stateChangeTypes.resetInput as StateChangeTypes
            });
          };
          return (
            <div
              {...getRootProps(
                // skip labelledby becasuse there is no label associated to the input by getLabelProps
                // @ts-ignore warning due to incorrect type definition for the param
                { "aria-labelledby": undefined },
                { suppressRefError: true }
              )}
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
                    this.getWidth(this.searchButtonRef.current) +
                      this.getWidth(this.voiceSearchButtonRef.current) +
                      this.getWidth(this.clearButtonRef.current)
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
                        if (Array.isArray(results) && results.length > 0) {
                          openMenu();
                        }
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
                          if (this.inputRef?.current) {
                            this.inputRef.current.blur();
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
                          if (typeof this.props.onSearch === "function") {
                            this.props.onSearch(item);
                          } else {
                            search(item, true);
                          }
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
                {this.props.showClearButton && (
                  <button
                    onClick={resetFunc}
                    ref={this.clearButtonRef}
                    aria-label="Clear"
                    title="Clear"
                    value="Clear"
                    css={[
                      clearButtonStyles(inputValue),
                      this?.props?.styles?.button
                    ]}
                    className={"sj-input__button"}
                  >
                    <TimesIcon />
                  </button>
                )}
                {this.props.experimental &&
                  this.props.experimental.voiceToText && (
                    <VoiceInput
                      Renderer={({ onClick, active }) => {
                        return (
                          <button
                            ref={this.voiceSearchButtonRef}
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
                  ref={this.searchButtonRef}
                  className="sj-input__button"
                  css={[
                    buttonStyles(this?.props?.theme?.colors?.brand?.primary),
                    this?.props?.styles?.button
                  ]}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();

                    if (typeof this.props.onSearch === "function") {
                      this.props.onSearch(selectedItem);
                    } else {
                      search(selectedItem, true);
                    }
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

  private focusInput = (_: React.MouseEvent<HTMLFormElement>) => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
      this.setState(state => ({ ...state, focused: true }));
    }
  };

  private stateReducer = (
    state: SearchState<any>,
    changes: StateChangeOptions<any>,
    { search, instantSearch, results, suggestions }: PipelineProps,
    defaultInputValue?: string
  ) => {
    const items = this.props.dropdownMode === "results" ? results : suggestions;

    switch (changes.type) {
      case Search.stateChangeTypes.changeInput:
        if (this.props.instantSearch) {
          if (typeof this.props.onSearch === "function") {
            this.props.onSearch(changes.inputValue || "");
          } else {
            search(changes.inputValue || "", false);
          }
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
        if (this.inputRef.current) {
          this.inputRef.current.blur();
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

        if (typeof this.props.onSearch === "function") {
          this.props.onSearch(changes.inputValue || "");
        } else {
          search(changes.inputValue || "", true);
        }
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

      case Search.stateChangeTypes.resetInput:
        return {
          inputValue: defaultInputValue ?? "",
          selectedItem: null,
          isOpen: false,
          ...changes
        };

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

const TimesIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      fill="currentColor"
    />
    <path d="M0 0h24v24H0z" fill="none" />
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

const clearButtonStyles = (inputValue: string | null): CSSObject => {
  const baseButtonStyles = buttonStyles();

  return {
    ...baseButtonStyles,
    transition: "transform .1s ease-in-out",
    transform: `scale(${inputValue ? 1 : 0})`
  };
};

const buttonTextStyles = {
  paddingLeft: 8
};
