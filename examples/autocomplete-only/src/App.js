import React from "react";

import { Pipeline, Values } from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";

import "sajari-react/ui/text/AutocompleteInput.css";

const pipeline = new Pipeline("sajariptyltd", "sajari-com", "autocomplete");
const values = new Values();

const App = () =>
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} />
  </div>;

export default App;
