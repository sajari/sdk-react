import React from "react";
import ReactDOM from "react-dom";
import { TokenLink } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TokenLink />, div);
});
