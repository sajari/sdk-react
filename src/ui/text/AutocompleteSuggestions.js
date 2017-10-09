import React from "react";
import PropTypes from "prop-types";

import { AutocompleteSuggestion } from "./";

const AutocompleteSuggestions = ({
  suggestions,
  text,
  selectedIndex,
  submit
}) => {
  const lowercaseText = text.toLowerCase();
  if (suggestions.length === 0) {
    return null;
  }
  return (
    <div className="sj-suggestions">
      {suggestions.map((s, i) => (
        <AutocompleteSuggestion
          key={s}
          suggestion={s}
          text={lowercaseText}
          selected={i === selectedIndex}
          submit={submit}
        />
      ))}
    </div>
  );
};

AutocompleteSuggestions.propTypes = {
  text: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  selectedIndex: PropTypes.number,
  submit: PropTypes.func
};

export default AutocompleteSuggestions;
