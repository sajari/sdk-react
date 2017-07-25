import React from "react";

import Pipeline from "sajari-react/controllers/pipeline";
import Values, { changeEvent } from "sajari-react/controllers/values";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";
import "sajari-react/ui/Search.css";

import { Client, Tracking } from "sajari";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "website";

const values = new Values();
const client = new Client(project, collection);

const tracking = new Tracking();
tracking.clickTokens("url");
const pipeline = new Pipeline(client, pipelineName);

values.listen(changeEvent, (changes, set) => {
  if (!changes.page) {
    set({ page: "1" });
  }
});

const App = () => (
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} tracking={tracking} />
    <Response pipeline={pipeline}>
      <Summary values={values} pipeline={pipeline} tracking={tracking} />
      <Results pipeline={pipeline} />
      <Paginator values={values} pipeline={pipeline} tracking={tracking} />
    </Response>
  </div>
);

export default App;
