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

  onClick = () => {
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
      <div className={className} onClick={this.onClick}>
        {prefix}
        {suggestion.substr(prefixLen)}
      </div>
    );
  }
}

const getState = (values, pipeline, qParam, suggestionAmount) => {
  const text = values.get()[qParam] || "";
  if (!text) {
    return { text, suggestions: [], selectedPosition: -1 };
  }
  const responseValues = pipeline.getResponse().getValues();
  const suggestions = responseValues
    ? (responseValues["q.suggestions"] || "")
        .split(",")
        .filter((s, i) => s.length > 0 && i < suggestionAmount)
    : [];
  return { text, suggestions, selectedPosition: -1 };
};

class AutocompleteDropdown extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {string} placeholder Placeholder to use.
   * @property {number} suggestionAmount Maximum number of suggestion to show.
   * @property {Function} submit Submit function to call when a query has been chosen.
   * @property {string} [qParam="q"] Search parameter.
   * @property {boolean} [autoFocus=false] Whether to focus the input element.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      placeholder: PropTypes.string,
      suggestionAmount: PropTypes.number,
      submit: PropTypes.func,
      qParam: PropTypes.string,
      autoFocus: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);

    this.state = getState(
      props.values,
      props.pipeline,
      props.qParam,
      props.suggestionAmount
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

  componentWillUnmount() {
    this.removeValuesListener();
    this.removeResponseListener();
  }

  valuesChanged = () => {
    const { values, pipeline, qParam, suggestionAmount } = this.props;
    this.setState(getState(values, pipeline, qParam, suggestionAmount));
  };

  setText = text => {
    const { qParam, values, pipeline } = this.props;
    const textValues = { [qParam]: text };
    values.set(textValues);
    if (textValues[qParam]) {
      pipeline.search(values.get());
    } else {
      pipeline.clearResponse(values.get());
    }
  };

  submit = query => {
    const { submit } = this.props;
    submit(query);
    this.setState({ text: query, suggestions: [], selectedPosition: -1 });
  };

  handleChange = e => {
    this.setText(e.target.value);
  };

  handleKeyDown = e => {
    const { submit } = this.props;
    const { text, suggestions, selectedPosition } = this.state;
    if (e.keyCode === ESC_KEYCODE) {
      this.setState({ suggestions: [], selectedPosition: -1 });
      return;
    }
    if (e.keyCode === RETURN_KEYCODE) {
      if (selectedPosition >= 0) {
        this.submit(suggestions[selectedPosition]);
      } else {
        this.submit(text);
      }
      return;
    }
    if (e.keyCode === UP_ARROW_KEYCODE) {
      e.preventDefault();
      if (selectedPosition >= 0) {
        this.setState({
          selectedPosition: selectedPosition - 1
        });
      }
      return;
    }
    if (e.keyCode === DOWN_ARROW_KEYCODE) {
      e.preventDefault();
      if (selectedPosition < suggestions.length - 1) {
        this.setState({
          selectedPosition: selectedPosition + 1
        });
      }
      return;
    }
    if (
      (e.keyCode === RIGHT_ARROW_KEYCODE || e.keyCode === TAB_KEYCODE) &&
      selectedPosition >= 0
    ) {
      e.preventDefault();
      this.setText(suggestions[selectedPosition]);
      this.setState({ selectedPosition: -1 });
    }
  };

  render() {
    const { text, suggestions, selectedPosition } = this.state;
    const { placeholder, autoFocus } = this.props;

    const inputText =
      selectedPosition === -1 ? text : suggestions[selectedPosition];

    return (
      <div className="sj-autocomplete-dropdown">
        <input
          type="text"
          autoCapitalize="none"
          className="sj-search-bar-input-common"
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={inputText}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <div className="sj-suggestions">
          {suggestions.map((s, i) =>
            <AutocompleteSuggestion
              key={s}
              suggestion={s}
              text={text}
              selected={i === selectedPosition}
              submit={this.submit}
            >
              {s}
            </AutocompleteSuggestion>
          )}
        </div>
      </div>
    );
  }
}

AutocompleteDropdown.defaultProps = {
  qParam: "q",
  suggestionAmount: 10,
  placeHolder: "Search"
};

export default AutocompleteDropdown;
