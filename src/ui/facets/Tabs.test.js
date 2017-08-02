import React from "react";
import ReactDOM from "react-dom";
import { Filter } from "../../controllers";
import { TabsFacet } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const filter = new Filter();
  const tabs = [];
  ReactDOM.render(<TabsFacet filter={filter} tabs={tabs} />, div);
});
