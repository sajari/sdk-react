import React from "react";

import { Pipeline, Values, valuesUpdatedEvent } from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";

import { DebugAnalytics } from "sajari-react/analytics";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/results/Results.css";
import "sajari-react/ui/results/Paginator.css";

const pipeline = new Pipeline("sajariptyltd", "sajari-com", "website");

new DebugAnalytics(pipeline.getAnalytics());

const values = new Values();

// Any change to values should reset the paginator back to page 1
values.listen(valuesUpdatedEvent, (changes, set) => {
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
