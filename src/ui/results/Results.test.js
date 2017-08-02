import React from "react";
import ReactDOM from "react-dom";
import { Pipeline } from "../../controllers";
import { Results } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const pipeline = new Pipeline("", "");
  ReactDOM.render(<Results pipeline={pipeline} />, div);
});
