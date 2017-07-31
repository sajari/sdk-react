import React from "react";

import { Pipeline, Values } from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";

import "sajari-react/ui/text/AutocompleteInput.css";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "autocomplete";

const pipeline = new Pipeline(project, collection, pipelineName);
const values = new Values();

const App = () =>
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} />
  </div>;

export default App;
