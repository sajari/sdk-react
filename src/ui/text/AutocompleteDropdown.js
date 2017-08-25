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
    return { text, completion: "", suggestions: [], selectedPosition: -1 };
  }
  const responseValues = pipeline.getResponse().getValues();
  const completion = text && responseValues ? responseValues[qParam] || "" : "";
  const suggestions = responseValues
    ? (responseValues["q.suggestions"] || "")
        .split(",")
        .filter((s, i) => s.length > 0 && i < suggestionAmount)
    : [];
  return { text, completion, suggestions, selectedPosition: -1 };
};

class AutocompleteDropdown extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {string} placeholder Placeholder to use.
   * @property {number} suggestionAmount Maximum number of suggestion to show.
   * @property {Function} handleForceSearch Callback function called when a user presses Enter while highlighting a suggestion or clicks a suggestion.
   * @property {Function} handleUpdate Callback function called when the query has been modified.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qParam="q.override"] Search override parameter.
   * @property {boolean} [autoFocus=false] Whether to focus the input element.
   * @property {boolean} [instant=true] Whether to search on text updated.
   * @property {boolean} [showCompletion=true] Whether to show completions inline with the query text.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      placeholder: PropTypes.string,
      suggestionAmount: PropTypes.number,
      handleForceSearch: PropTypes.func,
      handleForceSearch: PropTypes.func,
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string,
      autoFocus: PropTypes.bool,
      instant: PropTypes.bool,
      showCompletion: PropTypes.bool
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
    const { values, pipeline, qParam, suggestionAmount } = this.props;
    this.setState(getState(values, pipeline, qParam, suggestionAmount));
  };

  setText = text => {
    const { qParam, qOverrideParam, values, pipeline, instant } = this.props;
    const textValues = { [qParam]: text, [qOverrideParam]: undefined };
    values.set(textValues);
    if (!instant) {
      return;
    }
    if (textValues[qParam]) {
      pipeline.search(values.get());
    } else {
      pipeline.clearResponse(values.get());
    }
  };

  submit = query => {
    this.props.handleForceSearch(query);
    this.setState({ text: query, suggestions: [], selectedPosition: -1 });
  };

  handleChange = e => {
    this.setText(e.target.value);
    this.props.handleUpdate(e.target.value);
  };

  handleKeyDown = e => {
    const { handleUpdate } = this.props;
    const { text, completion, suggestions, selectedPosition } = this.state;
    if (e.keyCode === ESC_KEYCODE) {
      if (selectedPosition !== -1) {
        handleUpdate(text);
      }
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
    if (e.keyCode === RIGHT_ARROW_KEYCODE || e.keyCode === TAB_KEYCODE) {
      e.preventDefault();
      if (selectedPosition >= 0) {
        this.setText(suggestions[selectedPosition]);
        this.setState({ selectedPosition: -1 });
      } else if (completion) {
        this.setState({ text: completion, suggestions: [] });
      }
    }
  };

  render() {
    const { text, completion, suggestions, selectedPosition } = this.state;
    const { placeholder, autoFocus, showCompletion } = this.props;

    const inputText =
      selectedPosition === -1 ? text : suggestions[selectedPosition];

    return (
      <div className="sj-search-holder-outer">
        <div className="sj-search-holder-inner">
          <input
            type="text"
            className="sj-search-bar-completion sj-search-bar-input-common"
            value={
              showCompletion
                ? completion.indexOf(text) === 0 ? completion : text
                : ""
            }
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
          {suggestions.length > 0
            ? <div className="sj-suggestions">
                {suggestions.map((s, i) =>
                  <AutocompleteSuggestion
                    key={s}
                    suggestion={s}
                    text={text.toLowerCase()}
                    selected={i === selectedPosition}
                    submit={this.submit}
                  >
                    {s}
                  </AutocompleteSuggestion>
                )}
              </div>
            : null}
        </div>
      </div>
    );
  }
}

AutocompleteDropdown.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  suggestionAmount: 10,
  placeHolder: "Search",
  handleForceSearch: () => {},
  handleUpdate: () => {},
  instant: true,
  showCompletion: true
};

export default AutocompleteDropdown;
