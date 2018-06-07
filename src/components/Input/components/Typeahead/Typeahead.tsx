import * as React from "react";

import { Consumer } from "../../context";
import { trimPrefix } from "../../utils";
import { Container } from "./styled";

export interface TypeaheadProps {
  mode: "typeahead" | "suggestions";
  highlightedIndex: number;
  inputValue: string;
  completion: string;
  suggestions: string[];
}

export const Typeahead: React.SFC<TypeaheadProps> = ({
  mode,
  highlightedIndex,
  inputValue,
  completion,
  suggestions
}) => {
  return (
    <Container>
      {getTypeaheadValue(
        mode,
        completion,
        suggestions,
        highlightedIndex,
        inputValue
      )}
    </Container>
  );
};

const getTypeaheadValue = (
  mode: "typeahead" | "suggestions",
  completion: string,
  suggestions: string[],
  index: number,
  value: string
) => {
  const suggestion =
    mode === "suggestions" ? suggestions[index - 1] || "" : completion;
  return trimPrefix(suggestion, value);
};

export default ({ mode }: { mode: "typeahead" | "suggestions" }) => (
  <Consumer>
    {({ completion, suggestions, highlightedIndex, inputValue }) => (
      <Typeahead
        mode={mode}
        inputValue={inputValue}
        highlightedIndex={highlightedIndex}
        completion={completion}
        suggestions={suggestions}
      />
    )}
  </Consumer>
);
