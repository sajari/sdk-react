import React from "react";

import Pipeline from "sajari-react/controllers/pipeline";
import Values from "sajari-react/controllers/values";
import { AutocompleteInput } from "sajari-react/ui/text";

import { Client, Tracking } from "sajari";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "autocomplete";

const values = new Values();
const client = new Client(project, collection);

const pipeline = new Pipeline(client, pipelineName, values, new Tracking());

const App = () => (
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} />
  </div>
);

export default App;
