import React from "react";
import ReactDOM from "react-dom";
import { Pipeline } from "../../controllers";
import { Response } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const pipeline = new Pipeline("", "");
  ReactDOM.render(<Response pipeline={pipeline} />, div);
});
