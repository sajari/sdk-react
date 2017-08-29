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
const pipeline = new Pipeline(project, collection, "website");
const values = new Values();

class App extends React.Component {
  submit = query => {
    if (query) {
      values.set({ q: query, "q.override": true });
      pipeline.search(values.get());
      return;
    }
    pipeline.clearResponse();
  };

  render() {
    return (
      <div className="search-app">
        <AutocompleteDropdown
          values={values}
          pipeline={pipeline}
          numSuggestions={5}
          handleForceSearch={this.submit}
          autocompleteOnQueryChanged={true}
          showInlineCompletion={true}
        />
        <Response pipeline={pipeline}>
          <Summary values={values} pipeline={pipeline} />
          <Results pipeline={pipeline} />
          <Paginator values={values} pipeline={pipeline} />
        </Response>
      </div>
    );
  }
}

export default App;
