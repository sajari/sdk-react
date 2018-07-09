// @ts-ignore: module missing defintion file
import isEqual from "deep-is";
import * as React from "react";

import { Consumer } from "../../context";
import { SetStateFn } from "../../context/context";
import { trimPrefix } from "../../utils";
import { Suggestion, SuggestionsContainer } from "./styled";

export interface SuggestionsProps {
  inputValue: string;
  isDropdownOpen: boolean;
  highlightedIndex?: number;
  suggestions: string[];

  setHighlightedIndex: (index: number) => void;
  setState: SetStateFn;
  pipelines: { [k: string]: any };
}

export class Suggestions extends React.Component<SuggestionsProps> {
  public shouldComponentUpdate(nextProps: SuggestionsProps) {
    const {
      inputValue,
      suggestions,
      isDropdownOpen,
      highlightedIndex
    } = this.props;
    const {
      inputValue: nextInputValue,
      suggestions: nextSuggestions,
      isDropdownOpen: nextIsOpen,
      highlightedIndex: nextHighlightedIndex
    } = nextProps;

    if (
      !isEqual(inputValue, nextInputValue) ||
      !isEqual(isDropdownOpen, nextIsOpen) ||
      !isEqual(highlightedIndex, nextHighlightedIndex)
    ) {
      return true;
    }

    return !isEqual(suggestions, nextSuggestions);
  }

  public render() {
    const {
      isDropdownOpen,
      highlightedIndex,
      suggestions,
      inputValue
    } = this.props;

    return isDropdownOpen ? (
      <SuggestionsContainer
        onMouseLeave={this.handleSuggestionsContainerMouseLeave}
      >
        {suggestions.map((item, index) => (
          <Suggestion
            key={item}
            isHighlighted={highlightedIndex === index + 1}
            onMouseMove={this.handleSuggestionMouseMove}
            onMouseDown={this.handleSuggestionMouseDown}
          >
            {this.getItemText(item, inputValue)}
          </Suggestion>
        ))}
      </SuggestionsContainer>
    ) : null;
  }

  private handleSuggestionsContainerMouseLeave = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const { setHighlightedIndex } = this.props;
    setHighlightedIndex(0);
  };

  private handleSuggestionMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const { suggestions, setHighlightedIndex } = this.props;
    // @ts-ignore: innerText is a member of event.target
    setHighlightedIndex(suggestions.indexOf(event.target.innerText) + 1);
  };

  private handleSuggestionMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const { setState, pipelines } = this.props;
    // @ts-ignore: innerText is a member of event.target
    const value = event.target.innerText;
    // @ts-ignore: partial state update
    setState({ inputValue: value, highlightedIndex: 0 }, (state: any) => {
      pipelines.search.search(state.inputValue, true);
    });
  };

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

export default () => (
  <Consumer>
    {({
      inputValue,
      isDropdownOpen,
      suggestions,
      highlightedIndex,
      setHighlightedIndex,
      setState,
      pipelines
    }) => (
      <Suggestions
        inputValue={inputValue}
        isDropdownOpen={isDropdownOpen}
        suggestions={suggestions}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
        setState={setState}
        pipelines={pipelines}
      />
    )}
  </Consumer>
);
