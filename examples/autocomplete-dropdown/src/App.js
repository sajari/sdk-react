import React from "react";

import { Pipeline, Values } from "sajari-react/controllers";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";
import { AutocompleteDropdown } from "sajari-react/ui/text";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/text/AutocompleteDropdown.css";
import "sajari-react/ui/results/Results.css";
import "sajari-react/ui/results/Paginator.css";

const project = "sajariptyltd";
const collection = "sajari-com";
const autocompletePipeline = new Pipeline(project, collection, "autocomplete");
const autocompleteValues = new Values();

const websitePipeline = new Pipeline(project, collection, "website");
const websiteValues = new Values();

class App extends React.Component {
  render() {
    return (
      <div className="search-app">
        <AutocompleteDropdown
          values={autocompleteValues}
          pipeline={autocompletePipeline}
          forceSearchValues={websiteValues}
          forceSearchPipeline={websitePipeline}
          numSuggestions={5}
          placeholder="Type to search"
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
