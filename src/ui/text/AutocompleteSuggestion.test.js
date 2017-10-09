import React from "react";
import ReactDOM from "react-dom";
import { AutocompleteSuggestion } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AutocompleteSuggestion
      text="f"
      suggestion="foo"
      selected={false}
      submit={() => {}}
    />,
    div
  );
});
