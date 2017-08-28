import React from "react";

import { Pipeline, Values } from "sajari-react/controllers";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";
import AutocompleteDropdown from "sajari-react/ui/text/AutocompleteDropdown";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/text/AutocompleteDropdown.css";
import "sajari-react/ui/results/Results.css";
import "sajari-react/ui/results/Paginator.css";

const project = "sajariptyltd";
const collection = "sajari-com";
const websitePipeline = new Pipeline(project, collection, "website");
const websiteValues = new Values();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { autocomplete: true };
  }

  submit = query => {
    if (query) {
      websiteValues.set({ q: query, "q.override": true });
      websitePipeline.search(websiteValues.get());
      return;
    }
    websitePipeline.clearResponse();
  };

  toggleAutocomplete = () => {
    this.setState({ autocomplete: !this.state.autocomplete });
  };

  render() {
    const { autocomplete } = this.state;
    return (
      <div className="search-app">
        <label>
          Autocomplete
          <input
            type="checkbox"
            checked={autocomplete}
            onChange={this.toggleAutocomplete}
          />
        </label>
        <AutocompleteDropdown
          values={websiteValues}
          pipeline={websitePipeline}
          numSuggestions={autocomplete ? 5 : 0}
          handleForceSearch={this.submit}
          autocompleteOnQueryChanged={true}
          showInlineCompletion={true}
        />
        <Response pipeline={websitePipeline}>
          <Summary values={websiteValues} pipeline={websitePipeline} />
          <Results pipeline={websitePipeline} />
          <Paginator values={websiteValues} pipeline={websitePipeline} />
        </Response>
      </div>
    );
  }
}

export default App;
