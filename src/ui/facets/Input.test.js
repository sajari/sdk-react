import React from "react";
import ReactDOM from "react-dom";
import { Filter } from "../../controllers";
import { CheckboxFacet, RadioFacet } from "./";

test("renders CheckboxFacet without crashing", () => {
  const div = document.createElement("div");
  const filter = new Filter();
  ReactDOM.render(<CheckboxFacet filter={filter} name="" />, div);
});

test("renders RadioFacet without crashing", () => {
  const div = document.createElement("div");
  const filter = new Filter();
  ReactDOM.render(<RadioFacet filter={filter} name="" />, div);
});
