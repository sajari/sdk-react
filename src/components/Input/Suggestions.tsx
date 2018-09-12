import * as React from "react";
import { cx, css } from "emotion";
import { ControllerStateAndHelpers } from "downshift";
import { Dropdown } from "./shared/Dropdown";
import { trimPrefix } from "./shared/utils";

export interface SuggestionsProps {
  downshift: ControllerStateAndHelpers<any>;
  typedInputValue: string;
  suggestions?: string[];
}

const suggestionItem = css({
  listStyle: "none",
  paddingLeft: 0,
  marginLeft: 0,
  backgroundColor: "#fff",
  color: "#222",
  cursor: "auto"
});

const suggestionItemHighlighted = css({
  backgroundColor: "#eee",
  cursor: "default"
});

export function Suggestions({
  downshift,
  typedInputValue,
  suggestions = []
}: SuggestionsProps) {
  return (
    <Dropdown downshift={downshift}>
      {downshift.isOpen &&
        suggestions.length > 0 &&
        suggestions.map((suggestion, idx) => (
          <li
            {...downshift.getItemProps({
              key: suggestion,
              item: suggestion,
              index: idx,
              className: cx(
                suggestionItem,
                downshift.highlightedIndex === idx && suggestionItemHighlighted
              )
            })}
          >
            {suggestionText(typedInputValue, suggestion)}
          </li>
        ))}
    </Dropdown>
  );
}

const suggestionPadding = css({ padding: "0.25em 0.5em" });

function suggestionText(inputValue: string, suggestion: string) {
  return (
    <span className={suggestionPadding}>
      {inputValue === "" || !suggestion.startsWith(inputValue) ? (
        suggestion
      ) : (
        <React.Fragment>
          {inputValue}
          <strong>{trimPrefix(suggestion, inputValue)}</strong>
        </React.Fragment>
      )}
    </span>
  );
}
