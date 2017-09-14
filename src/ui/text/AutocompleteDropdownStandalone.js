import React from "react";
import PropTypes from "prop-types";

import AutocompleteDropdownCommon from "./AutocompleteDropdownCommon";

class AutocompleteDropdownStandalone extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Values} forceSearchValues Values to use for forced search.
   * @property {Pipeline} forceSearchPipeline Pipeline to use for forced search.
   * @property {string} placeholder Placeholder to use for the input element.
   * @property {Function} onForceSearch Function to call when user forces a search
   * @property {number} [numSuggestions=5] Maximum number of suggestion to show.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Search override parameter.
   * @property {boolean} [autoFocus=false] Whether to focus the input element on creation.
   */
  static get propTypes() {
    return {
      ...AutocompleteDropdownCommon.propTypes,
      onForceSearch: PropTypes.func.isRequired
    };
  }

  onForceSearch = query => {
    const {
      qParam,
      qOverrideParam,
      values,
      pipeline,
      onForceSearch
    } = this.props;
    onForceSearch(query);
    values.set({ [qParam]: query, [qOverrideParam]: "true" });
    if (query) {
      pipeline.search(values.get());
    } else {
      pipeline.clearResponse(values.get());
    }
    return {
      text: query,
      displayText: query,
      suggestions: [],
      selectedIndex: -1
    };
  };

  render() {
    return (
      <AutocompleteDropdownCommon
        {...this.props}
        onForceSearch={this.onForceSearch}
      />
    );
  }
}

AutocompleteDropdownStandalone.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  numSuggestions: 5
};

export default AutocompleteDropdownStandalone;
