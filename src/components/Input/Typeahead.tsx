import * as React from "react";

import { isNotEmptyArray, isNotEmptyString, trimPrefix } from "./utils";

import { Typeahead as Container } from "./styled";
import { Suggestions } from "./Suggestions";

export interface ITypeaheadProps {
  isActive: boolean;
  autocomplete: boolean | "dropdown";
  completion: string[];
  suggestions: string[][];
  highlightedIndex: number;
  value: string;
}

export const Typeahead: React.SFC<ITypeaheadProps> = ({
  isActive,
  autocomplete,
  completion,
  suggestions,
  highlightedIndex,
  value
}) => {
  return isActive ? (
    <Container>
      {getTypeaheadValue(
        autocomplete,
        completion,
        suggestions,
        highlightedIndex,
        value
      )}
    </Container>
  ) : null;
};

const getTypeaheadValue = (
  autocomplete: boolean | "dropdown",
  completion: string[],
  suggestions: string[][],
  index: number,
  value: string
) => {
  const suggestion =
    autocomplete !== "dropdown"
      ? isNotEmptyString(completion[0], completion[1])
      : isNotEmptyArray(suggestions[0], suggestions[1])[index] || "";

  return trimPrefix(suggestion, value);
};
