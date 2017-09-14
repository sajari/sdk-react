import React from "react";
import ReactDOM from "react-dom";
import { Pipeline, Values } from "../../controllers";
import { AutocompleteDropdownStandalone } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const pipeline = new Pipeline("", "");
  const values = new Values();
  const onForceSearch = () => {};
  ReactDOM.render(
    <AutocompleteDropdownStandalone
      pipeline={pipeline}
      values={values}
      onForceSearch={onForceSearch}
    />,
    div
  );
});
