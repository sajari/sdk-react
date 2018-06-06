import * as React from "react";

import { isNotEmptyArray, isNotEmptyString, trimPrefix } from "./utils";

import { Typeahead as Container } from "./components/SearchInput/styled";

export interface TypeaheadProps {
  isActive: boolean;
  autoComplete: boolean | "dropdown";
  highlightedIndex: number;
  inputValue: string;
  completion: string[];
  suggestions: string[][];
}

export const Typeahead: React.SFC<TypeaheadProps> = ({
  isActive,
  autoComplete,
  highlightedIndex,
  inputValue,
  completion,
  suggestions
}) => {
  return isActive ? (
    <Container>
      {getTypeaheadValue(
        autoComplete,
        completion,
        suggestions,
        highlightedIndex,
        inputValue
      )}
    </Container>
  ) : null;
};

const getTypeaheadValue = (
  autoComplete: boolean | "dropdown",
  completion: string[],
  suggestions: string[][],
  index: number,
  value: string
) => {
  const suggestion =
    autoComplete !== "dropdown"
      ? isNotEmptyString(completion[0], completion[1])
      : isNotEmptyArray(suggestions[0], suggestions[1])[index] || "";

  return trimPrefix(suggestion, value);
};
