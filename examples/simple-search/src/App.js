import React from "react";

import {
  Pipeline,
  Values,
  valuesChangedEvent,
  Tracking
} from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/results/Results.css";
import "sajari-react/ui/results/Paginator.css";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "website";

const values = new Values();

const tracking = new Tracking();
tracking.clickTokens("url");
const pipeline = new Pipeline(project, collection, pipelineName, tracking);

values.listen(valuesChangedEvent, (changes, set) => {
  if (!changes.page) {
    set({ page: "1" });
  }
});

const App = () =>
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} />
    <Response pipeline={pipeline}>
      <Summary values={values} pipeline={pipeline} />
      <Results pipeline={pipeline} />
      <Paginator values={values} pipeline={pipeline} />
    </Response>
  </div>;

export default App;
