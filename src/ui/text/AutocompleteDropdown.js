import AutocompleteDropdownCommon from "./AutocompleteDropdownCommon";

class AutocompleteDropdown extends AutocompleteDropdownCommon {
  onSubmit = query => {
    const {
      qParam,
      qOverrideParam,
      values,
      pipeline,
      forceSearchValues,
      forceSearchPipeline
    } = this.props;
    this.setState({
      text: query,
      displayText: query,
      suggestions: [],
      selectedIndex: -1
    });
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
  };
}

AutocompleteDropdown.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  numSuggestions: 5
};

export default AutocompleteDropdown;
