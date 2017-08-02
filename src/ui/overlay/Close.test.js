import React from "react";
import ReactDOM from "react-dom";
import { Close } from "./";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const closeOverlay = () => {};
  ReactDOM.render(<Close closeOverlay={closeOverlay} />, div);
});
