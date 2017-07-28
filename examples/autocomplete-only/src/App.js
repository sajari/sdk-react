import React from "react";

import { Pipeline, Values } from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";

import { Client, Tracking } from "sajari";

import "sajari-react/ui/text/AutocompleteInput.css";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "autocomplete";

const client = new Client(project, collection);
const tracking = new Tracking();
const pipeline = new Pipeline(client, pipelineName, tracking);
const values = new Values();

const App = () =>
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} />
  </div>;

export default App;
