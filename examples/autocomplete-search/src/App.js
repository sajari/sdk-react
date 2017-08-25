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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { autocomplete: true, instant: false };
  }

  update = query => {
    if (this.state.instant && !this.state.autocomplete) {
      websiteValues.set({ q: query, "q.override": undefined });
      if (query) {
        websitePipeline.search(websiteValues.get());
        return;
      }
      websitePipeline.clearResponse(websiteValues.get());
      return;
    }
  };

  submit = query => {
    if (query) {
      websiteValues.set({ q: query, "q.override": true });
      websitePipeline.search(websiteValues.get());
      return;
    }
    websitePipeline.clearResponse();
  };

  render() {
    const { autocomplete, instant } = this.state;

    const valuesForAutocomplete = instant ? websiteValues : autocompleteValues;
    const pipelineForAutocomplete = instant
      ? websitePipeline
      : autocompletePipeline;

    const suggestionAmount = autocomplete ? 5 : 0;
    const searchAutocomplete =
      (autocomplete || instant) && !(instant && !autocomplete);
    const showCompletion = instant;

    return (
      <div className="search-app">
        <label>
          Autocomplete
          <input
            type="checkbox"
            checked={autocomplete}
            onChange={() => this.setState({ autocomplete: !autocomplete })}
          />
        </label>
        <br />
        <label>
          Instant
          <input
            type="checkbox"
            checked={instant}
            onChange={() => this.setState({ instant: !instant })}
          />
        </label>
        <AutocompleteDropdown
          values={valuesForAutocomplete}
          pipeline={pipelineForAutocomplete}
          suggestionAmount={suggestionAmount}
          handleUpdate={this.update}
          handleSubmit={this.submit}
          search={searchAutocomplete}
          showCompletion={showCompletion}
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
