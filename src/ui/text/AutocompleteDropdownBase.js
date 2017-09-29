import React from "react";
import PropTypes from "prop-types";

import {
  Pipeline,
  Values,
  responseUpdatedEvent,
  valuesUpdatedEvent
} from "../../controllers";

import AutocompleteDropdownRenderer from "./AutocompleteDropdownRenderer";

const getState = (
  values,
  pipeline,
  qParam,
  qSuggestionsParam,
  maxSuggestions
) => {
  const text = values.get()[qParam] || "";
  if (!text) {
    return {
      text,
      displayText: text,
      suggestions: [],
      selectedIndex: -1
    };
  }
  const responseValues = pipeline.getResponse().getValues();
  const suggestions = responseValues
    ? (responseValues[qSuggestionsParam] || "")
        .split(",")
        .filter(s => s.length > 0)
        .slice(0, maxSuggestions)
    : [];
  return { text, displayText: text, suggestions, selectedIndex: -1 };
};

class AutocompleteDropdownBase extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Values} forceSearchValues Values to use for forced search.
   * @property {Pipeline} forceSearchPipeline Pipeline to use for forced search.
   * @property {string} placeholder Placeholder to use for the input element.
   * @property {Function} onForceSearch Function to call when user forces a search.
   * @property {number} [maxSuggestions=5] Maximum number of suggestion to show.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Search override parameter.
   * @property {string} [qSuggestionsParam="q.suggestions"] Suggestions override parameter.
   * @property {boolean} [autoFocus=false] Whether to focus the input element on creation.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      forceSearchValues: PropTypes.instanceOf(Values),
      forceSearchPipeline: PropTypes.instanceOf(Pipeline),
      placeholder: PropTypes.string,
      onForceSearch: PropTypes.func,
      maxSuggestions: PropTypes.number,
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string,
      qSuggestionsParam: PropTypes.string,
      autoFocus: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);

    this.state = getState(
      props.values,
      props.pipeline,
      props.qParam,
      props.qSuggestionsParam,
      props.maxSuggestions
    );

    this.removeValuesListener = props.values.listen(
      valuesUpdatedEvent,
      this.valuesChanged
    );
    this.removeResponseListener = props.pipeline.listen(
      responseUpdatedEvent,
      this.valuesChanged
    );
  }

  componentWillUpdate(nextProps) {
    const { values: newValues, pipeline: newPipeline } = nextProps;
    const { values: oldValues, pipeline: oldPipeline } = this.props;
    if (newValues !== oldValues) {
      this.removeValuesListener();
      this.removeValuesListener = newValues.listen(
        valuesUpdatedEvent,
        this.valuesChanged
      );
    }
    if (newPipeline !== oldPipeline) {
      this.removeResponseListener();
      this.removeResponseListener = newPipeline.listen(
        responseUpdatedEvent,
        this.valuesChanged
      );
    }
  }

  componentWillUnmount() {
    this.removeValuesListener();
    this.removeResponseListener();
  }

  valuesChanged = () => {
    const {
      values,
      pipeline,
      qParam,
      qSuggestionsParam,
      maxSuggestions
    } = this.props;
    this.setState(
      getState(values, pipeline, qParam, qSuggestionsParam, maxSuggestions)
    );
  };

  handleForceSearch = query => {
    const { qParam, qOverrideParam, onForceSearch } = this.props;
    const { values, pipeline } = onForceSearch(query);
    values.set({ [qParam]: query, [qOverrideParam]: "true", page: "1" });
    if (query) {
      pipeline.search(values.get());
    } else {
      pipeline.clearResponse(values.get());
    }
    this.setState({
      text: query,
      displayText: query,
      suggestions: [],
      selectedIndex: -1
    });
  };

  handleChange = event => {
    const { qParam, qOverrideParam, values, pipeline } = this.props;
    const newText = event.target.value;
    this.setState({ text: newText, displayText: newText });
    values.set({ [qParam]: newText, [qOverrideParam]: undefined });
    if (newText) {
      pipeline.search(values.get());
    } else {
      pipeline.clearResponse(values.get());
    }
  };

  handleEscape = () => {
    this.setState({ suggestions: [], selectedIndex: -1 });
  };

  handleReturn = () => {
    const { text, selectedIndex, suggestions } = this.state;
    if (selectedIndex >= 0) {
      this.handleForceSearch(suggestions[selectedIndex]);
    } else {
      this.handleForceSearch(text);
    }
  };

  handleUpArrow = () => {
    const { text, selectedIndex, suggestions } = this.state;
    if (selectedIndex >= 0) {
      this.setState({
        displayText: suggestions[selectedIndex - 1] || text,
        selectedIndex: selectedIndex - 1
      });
    }
  };

  handleDownArrow = () => {
    const { selectedIndex, suggestions } = this.state;
    if (selectedIndex < suggestions.length - 1) {
      this.setState({
        displayText: suggestions[selectedIndex + 1],
        selectedIndex: selectedIndex + 1
      });
    }
  };

  handleRightArrowOrTab = () => {
    const { selectedIndex, suggestions } = this.state;
    if (selectedIndex >= 0) {
      const newText = suggestions[selectedIndex];
      this.setState({
        text: newText,
        displayText: newText,
        selectedIndex: -1,
        suggestions: []
      });
    }
  };

  render() {
    const { text, displayText, suggestions, selectedIndex } = this.state;
    const { placeholder, autoFocus } = this.props;

    return (
      <AutocompleteDropdownRenderer
        submit={this.handleForceSearch}
        text={text}
        displayText={displayText}
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        placeholder={placeholder}
        autoFocus={autoFocus}
        handleChange={this.handleChange}
        handleEscape={this.handleEscape}
        handleReturn={this.handleReturn}
        handleUpArrow={this.handleUpArrow}
        handleDownArrow={this.handleDownArrow}
        handleRightArrow={this.handleRightArrowOrTab}
        handleTab={this.handleRightArrowOrTab}
      />
    );
  }
}

AutocompleteDropdownBase.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  qSuggestionsParam: "q.suggestions",
  maxSuggestions: 5
};

export default AutocompleteDropdownBase;
