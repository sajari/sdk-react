import React from "react";
import PropTypes from "prop-types";

import {
  Pipeline,
  Values,
  responseUpdatedEvent,
  valuesUpdatedEvent
} from "../../controllers";

import classnames from "../classnames";

const RIGHT_ARROW_KEYCODE = 39;
const TAB_KEYCODE = 9;
const RETURN_KEYCODE = 13;
const ESC_KEYCODE = 27;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;

class AutocompleteSuggestion extends React.Component {
  /**
   * propTypes
   * @property {string} text Current user input text.
   * @property {string} suggestion Suggestion text of this component.
   * @property {boolean} selected Whether this suggestion is currently selected.
   * @property {Function} submit Submit function when the user clicks the suggestion.
   */
  static get propTypes() {
    return {
      text: PropTypes.string,
      suggestion: PropTypes.string,
      selected: PropTypes.bool,
      submit: PropTypes.func
    };
  }

  handleClick = () => {
    this.props.submit(this.props.suggestion);
  };

  render() {
    const { text, suggestion, selected } = this.props;

    let prefix = null;
    let prefixLen = 0;
    if (suggestion.substr(0, text.length) === text) {
      prefix = (
        <strong>
          {text}
        </strong>
      );
      prefixLen = text.length;
    }

    const className = classnames({
      "sj-suggestion": true,
      "sj-suggestion-selected": selected
    });

    return (
      <div className={className} onClick={this.handleClick}>
        {prefix}
        {suggestion.substr(prefixLen)}
      </div>
    );
  }
}

const getState = (values, pipeline, qParam, numSuggestions) => {
  const text = values.get()[qParam] || "";
  if (!text) {
    return {
      text,
      completion: "",
      suggestions: [],
      highlightedSuggestionIndex: -1
    };
  }
  const responseValues = pipeline.getResponse().getValues();
  const completion = text && responseValues ? responseValues[qParam] || "" : "";
  const suggestions = responseValues
    ? (responseValues["q.suggestions"] || "")
        .split(",")
        .filter(s => s.length > 0)
        .slice(0, numSuggestions)
    : [];
  return { text, completion, suggestions, highlightedSuggestionIndex: -1 };
};

class AutocompleteDropdown extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {string} placeholder Placeholder to use for the input element.
   * @property {number} [numSuggestions=5] Maximum number of suggestion to show.
   * @property {Function} handleForceSearch Callback function called when a user presses Enter while highlighting a suggestion or clicks a suggestion.
   * @property {Function} handleQueryChanged Callback function called when the query has been modified.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Search override parameter.
   * @property {boolean} [autoFocus=false] Whether to focus the input element on creation.
   * @property {boolean} [autocompleteOnQueryChanged=true] Whether to search autocomplete on query change.
   * @property {boolean} [showInlineCompletion=true] Whether to show completions inline with the query text.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      placeholder: PropTypes.string,
      numSuggestions: PropTypes.number,
      handleForceSearch: PropTypes.func,
      handleQueryChanged: PropTypes.func,
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string,
      autoFocus: PropTypes.bool,
      autocompleteOnQueryChanged: PropTypes.bool,
      showInlineCompletion: PropTypes.bool
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

    this.removeValuesListener = this.props.values.listen(
      valuesUpdatedEvent,
      this.valuesChanged
    );
    this.removeResponseListener = this.props.pipeline.listen(
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

  setText = text => {
    const {
      qParam,
      qOverrideParam,
      values,
      pipeline,
      autocompleteOnQueryChanged
    } = this.props;
    const textValues = { [qParam]: text, [qOverrideParam]: undefined };
    values.set(textValues);
    if (!autocompleteOnQueryChanged) {
      return;
    }
    if (textValues[qParam]) {
      pipeline.search(values.get());
    } else {
      pipeline.clearResponse(values.get());
    }
  };

  submit = query => {
    this.setState({
      text: query,
      suggestions: [],
      highlightedSuggestionIndex: -1
    });
    this.props.handleForceSearch(query);
  };

  handleChange = e => {
    this.setText(e.target.value);
    this.props.handleQueryChanged(e.target.value);
  };

  handleKeyDown = e => {
    const { handleQueryChanged } = this.props;
    const {
      text,
      completion,
      suggestions,
      highlightedSuggestionIndex
    } = this.state;

    if (e.keyCode === ESC_KEYCODE) {
      if (highlightedSuggestionIndex !== -1) {
        handleQueryChanged(text);
      }
      this.setState({ suggestions: [], highlightedSuggestionIndex: -1 });
      return;
    }

    if (e.keyCode === RETURN_KEYCODE) {
      if (highlightedSuggestionIndex >= 0) {
        this.submit(suggestions[highlightedSuggestionIndex]);
      } else {
        this.submit(text);
      }
      return;
    }

    if (e.keyCode === UP_ARROW_KEYCODE) {
      e.preventDefault();
      if (highlightedSuggestionIndex >= 0) {
        this.setState({
          highlightedSuggestionIndex: highlightedSuggestionIndex - 1
        });
      }
      return;
    }

    if (e.keyCode === DOWN_ARROW_KEYCODE) {
      e.preventDefault();
      if (highlightedSuggestionIndex < suggestions.length - 1) {
        this.setState({
          highlightedSuggestionIndex: highlightedSuggestionIndex + 1
        });
      }
      return;
    }

    if (e.keyCode === RIGHT_ARROW_KEYCODE || e.keyCode === TAB_KEYCODE) {
      e.preventDefault();
      if (highlightedSuggestionIndex >= 0) {
        this.setText(suggestions[highlightedSuggestionIndex]);
        this.setState({ highlightedSuggestionIndex: -1 });
      } else if (completion) {
        this.setState({ text: completion, suggestions: [] });
      }
    }
  };

  render() {
    const {
      text,
      completion,
      suggestions,
      highlightedSuggestionIndex
    } = this.state;
    const { placeholder, autoFocus, showInlineCompletion } = this.props;

    const completionValue = showInlineCompletion
      ? completion.indexOf(text) === 0 ? completion : text
      : "";

    const suggestionList =
      suggestions.length > 0
        ? <div className="sj-suggestions">
            {suggestions.map((s, i) =>
              <AutocompleteSuggestion
                key={s}
                suggestion={s}
                text={text.toLowerCase()}
                selected={i === highlightedSuggestionIndex}
                submit={this.submit}
              />
            )}
          </div>
        : null;

    return (
      <div className="sj-search-holder-outer">
        <div className="sj-search-holder-inner">
          <input
            type="text"
            className="sj-search-bar-completion sj-search-bar-input-common"
            value={completionValue}
            readOnly
          />
          <input
            type="text"
            className="sj-search-bar-input sj-search-bar-input-common"
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={text}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          {suggestionList}
        </div>
      </div>
    );
  }
}

AutocompleteDropdown.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  numSuggestions: 5,
  handleForceSearch: () => {},
  handleQueryChanged: () => {},
  autocompleteOnQueryChanged: true,
  showInlineCompletion: true
};

export default AutocompleteDropdown;
