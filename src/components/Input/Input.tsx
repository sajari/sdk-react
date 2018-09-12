import * as React from "react";
import Downshift, {
  ControllerStateAndHelpers,
  DownshiftState,
  StateChangeOptions
} from "downshift";
import { cx, css } from "emotion";
// @ts-ignore: component missing type defs
import AutosizeInput from "react-input-autosize";
import { Result } from "@sajari/sdk-js";
import { PipelineConsumer, PipelineContext } from "../context/pipeline";
import { Typeahead } from "./Typeahead";
import { Suggestions } from "./Suggestions";
import { Results, ResultRendererProps } from "./Results";
import { isNotEmptyArray, isNotEmptyString } from "./shared/utils";

const ReturnKeyCode = 13;
const RightArrowKeyCode = 39;

export type InputMode = "standard" | "typeahead";
export type DropdownMode = "none" | "suggestions" | "results";

export interface InputProps {
  mode: InputMode;
  dropdownMode: DropdownMode;
  instantSearch?: boolean;

  defaultValue?: string;
  ariaLabel?: string;
  placeHolder?: string;
  autoFocus?: boolean;

  inputRef?: (element: HTMLInputElement) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // The result render is only used when dropdownMode === "results"
  ResultRenderer?: React.ComponentType<ResultRendererProps>;

  styles?: {
    container?: React.CSSProperties;
    input?: React.CSSProperties;
    typeahead?: React.CSSProperties;
    button?: React.CSSProperties;
  };
}

interface InputState {
  typedInputValue: string;
}

export class Input extends React.PureComponent<InputProps, InputState> {
  static defaultProps = {
    mode: "standard",
    dropdownMode: "none",
    ariaLabel: "Search through the site content",
    placeHolder: "Search"
  };

  state = { typedInputValue: "" };

  render() {
    return (
      <PipelineConsumer>
        {pipelines => {
          let items =
            this.props.dropdownMode === "suggestions"
              ? isNotEmptyArray(
                  pipelines.search.suggestions,
                  pipelines.instant.suggestions
                )
              : this.props.dropdownMode === "results"
                ? isNotEmptyArray(
                    (pipelines.search.response &&
                      pipelines.search.response.getResults()) ||
                      [],
                    (pipelines.instant.response &&
                      pipelines.instant.response.getResults()) ||
                      []
                  )
                : undefined;

          return (
            <Downshift
              key={`sj-downshift-${this.props.defaultValue}`}
              defaultInputValue={this.props.defaultValue}
              stateReducer={this.stateReducer(pipelines, items)}
              itemToString={
                this.props.dropdownMode === "results"
                  ? (item: Result) =>
                      (item != undefined && (item.values["title"] as string)) ||
                      ""
                  : undefined
              }
            >
              {downshift => (
                <Inner
                  {...downshift.getRootProps({ refKey: "rootRef" })}
                  downshift={downshift}
                  items={items}
                  mode={this.props.mode}
                  pipelines={pipelines}
                  dropdownMode={this.props.dropdownMode}
                  ariaLabel={this.props.ariaLabel}
                  placeHolder={this.props.placeHolder}
                  styles={this.props.styles}
                  onChange={this.handleInputOnChange}
                />
              )}
            </Downshift>
          );
        }}
      </PipelineConsumer>
    );
  }

  handleInputOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore: value is a member of event.target
    let typedInputValue = event.target.value;
    this.setState(state => ({ ...state, typedInputValue }));
  };

  // use the stateReducer to trigger the searches
  stateReducer = (pipelines: PipelineContext, items?: string[] | Result[]) => (
    state: DownshiftState<any>,
    changes: StateChangeOptions<any>
  ) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        if (this.props.instantSearch) {
          pipelines.search.search(changes.inputValue || "", false);
        } else if (this.props.mode === "typeahead") {
          pipelines.instant.search(changes.inputValue || "", false);
        }

        if (this.props.dropdownMode !== "results") {
          if (changes.inputValue === "") {
            // if we clear the input, reset the selected item back to null
            return { ...changes, selectedItem: null };
          }
          return { ...changes, selectedItem: changes.inputValue };
        }
        return changes;

      case Downshift.stateChangeTypes.keyDownArrowUp:
        if (state.highlightedIndex === 0) {
          return {
            ...changes,
            inputValue: this.state.typedInputValue,
            selectedItem: this.state.typedInputValue,
            highlightedIndex: null
          };
        }

        if (changes.highlightedIndex != null) {
          let item = (items || [])[changes.highlightedIndex];
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

      case Downshift.stateChangeTypes.keyDownArrowDown:
        if (state.highlightedIndex === (items || []).length - 1) {
          return {
            ...changes,
            inputValue: this.state.typedInputValue,
            selectedItem: this.state.typedInputValue,
            highlightedIndex: null
          };
        }

        if (changes.highlightedIndex != null) {
          let item = (items || [])[changes.highlightedIndex];
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

      case Downshift.stateChangeTypes.clickItem:
        if (this.props.dropdownMode === "results") {
          let url =
            changes.selectedItem !== undefined &&
            changes.selectedItem.token !== undefined
              ? changes.selectedItem.token
              : changes.selectedItem.values["url"];

          window.location.href = url;
          return state;
        }

        pipelines.search.search(changes.inputValue || "", true);
        return changes;

      case Downshift.stateChangeTypes.keyDownEscape:
        if (this.props.dropdownMode === "suggestions") {
          return {
            ...changes,
            inputValue: this.state.typedInputValue,
            selectedItem: this.state.typedInputValue
          };
        }
        return changes;

      case Downshift.stateChangeTypes.itemMouseEnter:
        if (
          this.props.dropdownMode === "suggestions" &&
          changes.highlightedIndex != null
        ) {
          let item = (items || [])[changes.highlightedIndex];
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

interface InnerProps {
  mode: InputMode;
  dropdownMode: DropdownMode;
  ariaLabel: string;
  placeHolder: string;
  pipelines: PipelineContext;

  items?: string[] | Result[]; // could be results or suggestions

  downshift: ControllerStateAndHelpers<any>;
  rootRef?: (el: HTMLFormElement) => void;

  inputRef?: (element: HTMLInputElement) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // for internal use only
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;

  // The result render is only used when dropdownMode === "results"
  ResultRenderer?: React.ComponentType<ResultRendererProps>;

  styles?: {
    container?: React.CSSProperties;
    input?: React.CSSProperties;
    typeahead?: React.CSSProperties;
    button?: React.CSSProperties;
  };
}

interface InnerState {
  focused: boolean;
  typedInputValue: string;
}

class Inner extends React.Component<InnerProps, InnerState> {
  state = { focused: false, typedInputValue: "" };

  root?: HTMLFormElement;
  private rootRef = (element: HTMLFormElement) => {
    this.root = element;
    if (typeof this.props.rootRef === "function") {
      this.props.rootRef(element);
    }
  };

  input?: HTMLInputElement;
  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
    if (typeof this.props.inputRef === "function") {
      this.props.inputRef(element);
    }
  };

  private focusInput = (_: React.MouseEvent<HTMLFormElement>) => {
    if (this.input) {
      this.input.focus();
      this.setState(state => ({ ...state, focused: true }));
    }
  };

  render() {
    const { downshift, items = [] } = this.props;
    return (
      <div>
        <form
          ref={this.rootRef}
          onClick={this.focusInput}
          className={cx(
            containerStyles,
            this.state.focused && containerFocusedStyles,
            this.props.styles &&
              this.props.styles.container &&
              css(this.props.styles.container as any)
          )}
        >
          <div
            role="search"
            className={cx(
              innerContainerStyles,
              this.props.styles &&
                this.props.styles.input &&
                css(this.props.styles.input as any)
            )}
          >
            <AutosizeInput
              inputRef={this.inputRef}
              className={css(inputResetStyles.container)}
              inputStyle={inputResetStyles.input}
              minWidth={5}
              {...downshift.getInputProps({
                "aria-label": this.props.ariaLabel,
                placeholder: this.props.placeHolder,
                autoComplete: "off",
                spellCheck: false,
                autoCapitalize: "off",
                autoCorrect: "off",
                maxLength: 2048,
                onFocus: event => {
                  downshift.openMenu();
                  this.setState(state => ({ ...state, focused: true }));

                  if (typeof this.props.onFocus === "function") {
                    this.props.onFocus(event);
                  }
                },
                onBlur: event => {
                  downshift.closeMenu();
                  downshift.setState({ highlightedIndex: null });
                  this.setState(state => ({ ...state, focused: false }));

                  if (typeof this.props.onBlur === "function") {
                    this.props.onBlur(event);
                  }
                },
                onChange: event => {
                  this.props.onChange(event);
                  // @ts-ignore: value is a member of event.target
                  let typedInputValue = event.target.value;
                  this.setState(state => ({ ...state, typedInputValue }));
                },
                onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.keyCode === ReturnKeyCode) {
                    event.preventDefault();
                    // @ts-ignore: Prevent Downshift's default 'Enter' behavior.
                    event.nativeEvent.preventDownshiftDefault = true;
                    if (this.input) {
                      this.input.blur();
                    }

                    if (this.props.dropdownMode === "results") {
                      let item = (this.props.items || [])[
                        downshift.highlightedIndex || -1
                      ] as any; // TODO(@benhinchley): remove cast to any
                      if (item === undefined) {
                        return;
                      }
                      let url =
                        Object.getOwnPropertyNames(item.token).length > 0
                          ? item.token
                          : item.values["url"];
                      window.location.href = url;
                      return;
                    }

                    let item = downshift.selectedItem;
                    if (downshift.highlightedIndex !== null) {
                      downshift.selectHighlightedItem();
                      item = (this.props.items || [])[
                        downshift.highlightedIndex
                      ];
                    }
                    this.props.pipelines.search.search(item, true);
                  }

                  if (event.keyCode === RightArrowKeyCode) {
                    if (this.props.dropdownMode !== "results") {
                      if (
                        downshift.highlightedIndex !== null &&
                        // @ts-ignore: selectionStart is a member of event.target
                        event.target.selectionStart ===
                          (downshift.inputValue || "").length
                      ) {
                        // if the user presses the right arrow key and there is
                        // a highlighted item, select the currently highlighted item
                        // Though make sure we only select the item if we are at the
                        // end of the input element
                        downshift.selectHighlightedItem();
                      } else if (
                        downshift.highlightedIndex === null &&
                        // @ts-ignore: selectionStart is a member of event.target
                        event.target.selectionStart ===
                          (downshift.inputValue || "").length
                      ) {
                        downshift.selectItem(
                          isNotEmptyString(
                            this.props.pipelines.search.completion,
                            this.props.pipelines.instant.completion
                          )
                        );
                      }
                    } else {
                      this.props.downshift.setState({
                        inputValue: isNotEmptyString(
                          this.props.pipelines.search.completion,
                          this.props.pipelines.instant.completion
                        )
                      });
                    }
                  }

                  if (typeof this.props.onKeyDown === "function") {
                    this.props.onKeyDown(event);
                  }
                }
              })}
            />
            {this.props.mode === "typeahead" && (
              <Typeahead
                inputValue={downshift.inputValue || ""}
                completion={
                  this.props.dropdownMode !== "suggestions"
                    ? isNotEmptyString(
                        this.props.pipelines.search.completion,
                        this.props.pipelines.instant.completion
                      )
                    : undefined
                }
                styles={this.props.styles && this.props.styles.typeahead}
              />
            )}
          </div>
          <button
            className={cx(
              buttonStyles,
              this.props.styles &&
                this.props.styles.button &&
                css(this.props.styles.button as any)
            )}
            onClick={this.onSearchButtonClick}
          >
            <SearchIcon />
          </button>
        </form>
        {this.props.dropdownMode === "suggestions" && (
          <Suggestions
            downshift={downshift}
            typedInputValue={this.state.typedInputValue}
            suggestions={items as string[]}
          />
        )}
        {this.props.dropdownMode === "results" && (
          <Results downshift={downshift} />
        )}
      </div>
    );
  }

  onSearchButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.props.pipelines.search.search(this.props.downshift.selectedItem, true);
  };
}

const SearchIcon = (props: any) => (
  <svg viewBox="0 0 18 18" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"
      fill="currentcolor"
    />
  </svg>
);

const innerContainerStyles = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "baseline"
});

const containerStyles = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "&:hover": {
    boxShadow: "0 3px 8px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)"
  },
  borderRadius: 2,
  boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
  padding: "3px 9px",
  transition: "box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1)",
  outline: 0
});

const containerFocusedStyles = css({
  outline: ["#5E9ED6 auto 5px", "-webkit-focus-ring-color auto 5px"]
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
    maxWidth: "100%"
  },
  input: {
    background: 0,
    border: 0,
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    outline: 0,
    padding: 0,
    textRendering: "optimizeLegibility"
  }
};

const buttonStyles = css({
  padding: 0,
  border: 0,
  backgroundColor: "transparent",
  width: "1em",
  height: "1em",
  cursor: "pointer",
  color: "#737373"
});
