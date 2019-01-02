import { css, cx } from "emotion";
import * as React from "react";
import { Dropdown } from "./shared/Dropdown";
import { trimPrefix } from "./shared/utils";
import { SearchStateAndHelpers } from "../Search/Search";

export interface SuggestionsProps {
  searchProps: SearchStateAndHelpers;
  typedInputValue: string;
  suggestions?: string[];
  styles?: {
    container?: React.CSSProperties;
    item?: (isFocused: boolean) => React.CSSProperties;
  };
}

export function Suggestions({
  searchProps,
  typedInputValue,
  suggestions = [],
  styles
}: SuggestionsProps) {
  return (
    <Dropdown
      searchProps={searchProps}
      className="sj-input__suggestions"
      styles={styles && styles.container}
    >
      {searchProps.isOpen &&
        suggestions.length > 0 &&
        suggestions.map((suggestion, idx) => (
          <li
            {...searchProps.getItemProps({
              key: suggestion,
              item: suggestion,
              index: idx,
              role: "option",
              className: cx(
                "sj-input__suggestions__item",
                searchProps.highlightedIndex === idx &&
                  "sj-input__suggestions__item--highlighted",
                css(suggestionItemStyles(searchProps.highlightedIndex === idx)),
                styles &&
                  styles.item &&
                  css(styles.item(searchProps.highlightedIndex === idx) as any)
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

const suggestionItemStyles = (isFocused: boolean) => ({
  listStyle: "none",
  marginLeft: 0,
  padding: "0.25em 0.5em",
  color: isFocused ? "#222" : "inherit",
  backgroundColor: isFocused ? "#eee" : "inherit",
  cursor: isFocused ? "default" : "auto"
});
