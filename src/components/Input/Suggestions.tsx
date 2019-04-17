/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import * as React from "react";
import classnames from "classnames";
import { Dropdown } from "./shared/Dropdown";
import { trimPrefix } from "./shared/utils";
import { SearchStateAndHelpers } from "../Search/Search";
import { CSSObject } from "@emotion/core";

export interface SuggestionsProps {
  searchProps: SearchStateAndHelpers;
  typedInputValue: string;
  suggestions?: string[];
  styles?: {
    container?: CSSObject;
    item?: (isFocused: boolean) => CSSObject;
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
              className: classnames("sj-input__suggestions__item", {
                "sj-input__suggestions__item--highlighted":
                  searchProps.highlightedIndex === idx
              })
            })}
            css={[
              suggestionItemStyles(searchProps.highlightedIndex === idx),
              styles &&
                styles.item &&
                styles.item(searchProps.highlightedIndex === idx)
            ]}
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
