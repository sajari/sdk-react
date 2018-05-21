import * as React from "react";
import { isEqual } from "lodash-es";

import { trimPrefix } from "./utils";
import { SuggestionsContainer, Suggestion } from "./styled";

export interface ISuggestionsProps {
  isOpen: boolean;
  highlightedIndex: number;
  inputValue: string;
  suggestions: string[];
  offset: any;
  getItemProps: any;
}

export class Suggestions extends React.Component<ISuggestionsProps> {
  public shouldComponentUpdate(nextProps: ISuggestionsProps) {
    const { suggestions, isOpen, highlightedIndex } = this.props;
    const {
      suggestions: nextSuggestions,
      isOpen: nextIsOpen,
      highlightedIndex: nextHighlightedIndex
    } = nextProps;

    if (
      !isEqual(isOpen, nextIsOpen) ||
      !isEqual(highlightedIndex, nextHighlightedIndex)
    ) {
      return true;
    }

    return !isEqual(suggestions, nextSuggestions);
  }

  public render() {
    const {
      isOpen,
      highlightedIndex,
      suggestions,
      inputValue,
      offset,
      getItemProps
    } = this.props;

    return isOpen ? (
      <SuggestionsContainer position={offset}>
        {suggestions.map((item, index) => (
          <Suggestion
            {...getItemProps({ item })}
            key={item}
            isHighlighted={highlightedIndex === index + 1}
          >
            {this.getItemText(item, inputValue)}
          </Suggestion>
        ))}
      </SuggestionsContainer>
    ) : null;
  }

  private getItemText = (item: string, value: string) => {
    const suffix = trimPrefix(item, value);
    return suffix === "" ? (
      item
    ) : (
      <React.Fragment>
        {item.substr(0, value.length)}
        <strong>{suffix}</strong>
      </React.Fragment>
    );
  };
}
