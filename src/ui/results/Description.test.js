import React from "react";
import ReactDOM from "react-dom";
import { Description } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Description description={"test"} />, div);
});
