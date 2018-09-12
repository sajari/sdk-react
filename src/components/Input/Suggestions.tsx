import * as React from "react";
import { cx, css } from "emotion";
import { ControllerStateAndHelpers } from "downshift";
import { Dropdown } from "./shared/Dropdown";
import { trimPrefix } from "./shared/utils";

export interface SuggestionsProps {
  downshift: ControllerStateAndHelpers<any>;
  typedInputValue: string;
  suggestions?: string[];
  styles?: {
    container?: React.CSSProperties;
    item?: (isHighlighted: boolean) => React.CSSProperties;
  };
}

export function Suggestions({
  downshift,
  typedInputValue,
  suggestions = [],
  styles
}: SuggestionsProps) {
  return (
    <Dropdown downshift={downshift} styles={styles && styles.container}>
      {downshift.isOpen &&
        suggestions.length > 0 &&
        suggestions.map((suggestion, idx) => (
          <li
            {...downshift.getItemProps({
              key: suggestion,
              item: suggestion,
              index: idx,
              className: cx(
                css(suggestionItemStyles(downshift.highlightedIndex === idx)),
                styles &&
                  styles.item &&
                  css(styles.item(downshift.highlightedIndex === idx) as any)
              )
            })}
          >
            {suggestionText(typedInputValue, suggestion)}
          </li>
        ))}
    </Dropdown>
  );
}

function suggestionText(inputValue: string, suggestion: string) {
  return (
    <React.Fragment>
      {inputValue === "" || !suggestion.startsWith(inputValue) ? (
        suggestion
      ) : (
        <React.Fragment>
          {inputValue}
          <strong>{trimPrefix(suggestion, inputValue)}</strong>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const suggestionItemStyles = (isHighlighted: boolean) => ({
  listStyle: "none",
  marginLeft: 0,
  padding: "0.25em 0.5em",
  color: isHighlighted ? "#222" : "inherit",
  backgroundColor: isHighlighted ? "#eee" : "inherit",
  cursor: isHighlighted ? "default" : "auto"
});
