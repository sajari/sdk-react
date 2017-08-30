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

export default AutocompleteSuggestion;
