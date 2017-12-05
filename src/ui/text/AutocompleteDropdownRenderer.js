import React from "react";
import PropTypes from "prop-types";

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
          <span className="sj-search-input-wrapper">
            <input
              type="text"
              className="sj-search-bar-input-common"
              placeholder={placeholder}
              autoFocus={autoFocus}
              value={displayText}
              onChange={handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </span>
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

export default AutocompleteDropdownRenderer;
