import React from "react";
import ReactDOM from "react-dom";
import { Filter } from "../../controllers";
import { DebugFacet } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const filter = new Filter();
  ReactDOM.render(<DebugFacet filter={filter} />, div);
});
