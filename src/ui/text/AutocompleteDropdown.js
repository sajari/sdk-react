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
   * @property {number} [maxSuggestions=5] Maximum number of suggestion to show.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Search override parameter.
   * @property {boolean} [autoFocus=false] Whether to focus the input element on creation.
   */
  static get propTypes() {
    return AutocompleteDropdownBase.propTypes;
  }

  handleForceSearch = () => {
    const {
      values,
      pipeline,
      forceSearchValues,
      forceSearchPipeline
    } = this.props;
    return {
      values: forceSearchValues || values,
      pipeline: forceSearchPipeline || pipeline
    };
  };

  render() {
    return (
      <AutocompleteDropdownBase
        {...this.props}
        onForceSearch={this.handleForceSearch}
      />
    );
  }
}

AutocompleteDropdown.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  maxSuggestions: 5
};

export default AutocompleteDropdown;
