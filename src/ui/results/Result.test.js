import React from "react";
import ReactDOM from "react-dom";
import { Result, ImageResult } from "./";

test("renders Result without crashing", () => {
  const div = document.createElement("div");
  const values = { description: "" };
  ReactDOM.render(<Result values={values} />, div);
});

test("renders ImageResult without crashing", () => {
  const div = document.createElement("div");
  const values = { description: "" };
  ReactDOM.render(<ImageResult values={values} />, div);
});
