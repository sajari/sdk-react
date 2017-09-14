import React from "react";

import AutocompleteDropdownCommon from "./AutocompleteDropdownCommon";

class AutocompleteDropdown extends AutocompleteDropdownCommon {
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
    return AutocompleteDropdownCommon.propTypes;
  }

  onForceSearch = query => {
    const {
      qParam,
      qOverrideParam,
      values,
      pipeline,
      forceSearchValues,
      forceSearchPipeline
    } = this.props;
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

AutocompleteDropdown.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  numSuggestions: 5
};

export default AutocompleteDropdown;
