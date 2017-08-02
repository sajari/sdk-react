import React from "react";
import ReactDOM from "react-dom";
import { Logo } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Logo />, div);
});
