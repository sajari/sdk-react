import React from "react";
import PropTypes from "prop-types";

import classnames from "../classnames";

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
      text: PropTypes.string.isRequired,
      suggestion: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
      submit: PropTypes.func.isRequired
    };
  }

  handleClick = () => {
    this.props.submit(this.props.suggestion);
  };

  render() {
    const { text, suggestion, selected } = this.props;

    const className = classnames({
      "sj-suggestion": true,
      "sj-suggestion-selected": selected
    });

    let textLength = text.length;

    let prefix;
    let suffix;

    // If the suggestion starts with the users original query
    if (suggestion.indexOf(text) === 0) {
      prefix = suggestion.substr(0, textLength);
      suffix = suggestion.substr(textLength);
    } else {
      prefix = "";
      suffix = suggestion;
    }

    return (
      <div className={className} onClick={this.handleClick}>
        {prefix}
        <strong>{suffix}</strong>
      </div>
    );
  }
}

export default AutocompleteSuggestion;
