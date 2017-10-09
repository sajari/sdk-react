import React from "react";
import ReactDOM from "react-dom";
import { AutocompleteSuggestions } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AutocompleteSuggestions
      text="f"
      suggestions={["foo"]}
      selected={false}
      submit={() => {}}
    />,
    div
  );
});
