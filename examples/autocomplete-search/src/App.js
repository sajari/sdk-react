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
const autocompletePipeline = new Pipeline(project, collection, "autocomplete");
const websitePipeline = new Pipeline(project, collection, "website");
const autocompleteValues = new Values();
const websiteValues = new Values();

const App = () =>
  <div className="search-app">
    <AutocompleteDropdown
      values={autocompleteValues}
      pipeline={autocompletePipeline}
      suggestionAmount={10}
      submit={query => {
        websiteValues.set({ q: query, "q.override": true });
        websitePipeline.search(websiteValues.get());
      }}
    />
    <Response pipeline={websitePipeline}>
      <Summary values={websiteValues} pipeline={websitePipeline} />
      <Results pipeline={websitePipeline} />
      <Paginator values={websiteValues} pipeline={websitePipeline} />
    </Response>
  </div>;

export default App;
