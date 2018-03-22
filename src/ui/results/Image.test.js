import React from "react";
import ReactDOM from "react-dom";
import { Image } from "./Image";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Image url="" title="" />, div);
});
