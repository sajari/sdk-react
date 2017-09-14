import React from "react";

import AutocompleteDropdownBase from "./AutocompleteDropdownBase";

class AutocompleteDropdown extends AutocompleteDropdownBase {
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
    return AutocompleteDropdownBase.propTypes;
  }

  onForceSearch = () => {
    const {
      values,
      pipeline,
      forceSearchValues,
      forceSearchPipeline
    } = this.props;
    if (forceSearchValues && forceSearchPipeline) {
      return { values: forceSearchValues, pipeline: forceSearchPipeline };
    }
    return { values, pipeline };
  };

  render() {
    return (
      <AutocompleteDropdownBase
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
