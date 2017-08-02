import React from "react";
import ReactDOM from "react-dom";
import { Pipeline, Values } from "../../controllers";
import { AutocompleteInput } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const pipeline = new Pipeline("", "");
  const values = new Values();
  ReactDOM.render(
    <AutocompleteInput pipeline={pipeline} values={values} />,
    div
  );
});
