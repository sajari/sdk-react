import React from "react";
import ReactDOM from "react-dom";
import { URL } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<URL />, div);
});
