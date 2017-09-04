import React from "react";
import PropTypes from "prop-types";

import {
  Pipeline,
  Values,
  responseUpdatedEvent,
  valuesUpdatedEvent
} from "../../controllers";

import { AutocompleteSuggestions } from "./";

const RIGHT_ARROW_KEYCODE = 39;
const TAB_KEYCODE = 9;
const RETURN_KEYCODE = 13;
const ESC_KEYCODE = 27;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

class AutocompleteDropdownRenderer extends React.Component {
  /**
   * propTypes
   * @property {String} text
   * @property {String} displayText
   * @property {Array} suggestions
   * @property {Number} selectedIndex
   * @property {String} placeholder
   * @property {Boolean} autoFocus
   * @property {Function} submit
   * @property {Function} handleChange
   * @property {Function} handleEscape
   * @property {Function} handleReturn
   * @property {Function} handleUpArrow
   * @property {Function} handleDownArrow
   * @property {Function} handleRightArrow
   * @property {Function} handleTab
   */
  static get propTypes() {
    return {
      text: PropTypes.string,
      displayText: PropTypes.string,
      suggestions: PropTypes.arrayOf(PropTypes.string),
      selectedIndex: PropTypes.number,
      placeholder: PropTypes.string,
      autoFocus: PropTypes.bool,
      submit: PropTypes.func,
      handleChange: PropTypes.func,
      handleEscape: PropTypes.func,
      handleReturn: PropTypes.func,
      handleUpArrow: PropTypes.func,
      handleDownArrow: PropTypes.func,
      handleRightArrow: PropTypes.func,
      handleTab: PropTypes.func
    };
  }

  handleKeyDown = event => {
    const {
      handleEscape,
      handleReturn,
      handleUpArrow,
      handleDownArrow,
      handleRightArrow,
      handleTab
    } = this.props;
    switch (event.keyCode) {
      case ESC_KEYCODE:
        event.preventDefault();
        handleEscape();
        break;
      case RETURN_KEYCODE:
        event.preventDefault();
        handleReturn();
        break;
      case UP_ARROW_KEYCODE:
        event.preventDefault();
        handleUpArrow();
        break;
      case DOWN_ARROW_KEYCODE:
        event.preventDefault();
        handleDownArrow();
        break;
      case RIGHT_ARROW_KEYCODE:
        handleRightArrow();
        break;
      case TAB_KEYCODE:
        event.preventDefault();
        handleTab();
        break;
    }
  };

  render() {
    const {
      text,
      displayText,
      suggestions,
      selectedIndex,
      placeholder,
      autoFocus,
      handleChange,
      submit
    } = this.props;

    return (
      <div className="sj-search-holder-outer">
        <div className="sj-search-holder-inner">
          <input
            type="text"
            className="sj-search-bar-input-common"
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={displayText}
            onChange={handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <AutocompleteSuggestions
            suggestions={suggestions}
            text={text}
            selectedIndex={selectedIndex}
            submit={submit}
          />
        </div>
      </div>
    );
  }
}

const getState = (values, pipeline, qParam, numSuggestions) => {
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
    ? (responseValues["q.suggestions"] || "")
        .split(",")
        .filter(s => s.length > 0)
        .slice(0, numSuggestions)
    : [];
  return { text, suggestions, selectedIndex: -1 };
};

class AutocompleteDropdown extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Values} forceSearchValues Values to use for forced search.
   * @property {Pipeline} forceSearchPipeline Pipeline to use for forced search.
   * @property {string} placeholder Placeholder to use for the input element.
   * @property {number} [numSuggestions=5] Maximum number of suggestion to show.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Search override parameter.
   * @property {boolean} [autoFocus=false] Whether to focus the input element on creation.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      forceSearchValues: PropTypes.instanceOf(Values),
      forceSearchPipeline: PropTypes.instanceOf(Pipeline),
      placeholder: PropTypes.string,
      numSuggestions: PropTypes.number,
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string,
      autoFocus: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);

    this.state = getState(
      props.values,
      props.pipeline,
      props.qParam,
      props.numSuggestions
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
    const { values, pipeline, qParam, numSuggestions } = this.props;
    this.setState(getState(values, pipeline, qParam, numSuggestions));
  };

  submit = query => {
    const {
      qParam,
      qOverrideParam,
      values,
      pipeline,
      forceSearchValues,
      forceSearchPipeline
    } = this.props;
    this.setState({
      text: query,
      displayText: query,
      suggestions: [],
      selectedIndex: -1
    });
    let valuesToSearch = values;
    let pipelineToSearch = pipeline;
    if (forceSearchValues && forceSearchPipeline) {
      valuesToSearch = forceSearchValues;
      pipelineToSearch = forceSearchPipeline;
    }
    valuesToSearch.set({ [qParam]: query, [qOverrideParam]: "true" });
    if (query) {
      pipelineToSearch.search(valuesToSearch.get());
    } else {
      pipelineToSearch.clearResponse(valuesToSearch.get());
    }
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
      this.submit(suggestions[selectedIndex]);
    } else {
      this.submit(text);
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
        submit={this.submit}
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

AutocompleteDropdown.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  numSuggestions: 5
};

export default AutocompleteDropdown;
