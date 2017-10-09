import React from "react";
import ReactDOM from "react-dom";
import { Pipeline, Values } from "../../controllers";
import { AutocompleteDropdownBase } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const pipeline = new Pipeline("", "");
  const values = new Values();
  const onForceSearch = () => {};
  ReactDOM.render(
    <AutocompleteDropdownBase
      pipeline={pipeline}
      values={values}
      onForceSearch={onForceSearch}
    />,
    div
  );
});
