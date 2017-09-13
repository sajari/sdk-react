import AutocompleteDropdownCommon from "./AutocompleteDropdownCommon";

class AutocompleteDropdownStandalone extends AutocompleteDropdownCommon {
  onSubmit = query => {
    const {
      qParam,
      qOverrideParam,
      values,
      pipeline,
      onUserForce
    } = this.props;
    this.setState({
      text: query,
      displayText: query,
      suggestions: [],
      selectedIndex: -1
    });
    onUserForce(query);
    values.set({ [qParam]: query, [qOverrideParam]: "true" });
    if (query) {
      pipeline.search(values.get());
    } else {
      pipeline.clearResponse(values.get());
    }
  };
}

AutocompleteDropdownStandalone.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  numSuggestions: 5
};

export default AutocompleteDropdownStandalone;
