import React from "react";
import ReactDOM from "react-dom";
import { Filter } from "../../controllers";
import { SelectFacet } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const filter = new Filter();
  const options = {};
  ReactDOM.render(<SelectFacet filter={filter} options={options} />, div);
});
