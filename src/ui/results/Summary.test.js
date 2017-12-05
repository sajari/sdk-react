import React from "react";
import ReactDOM from "react-dom";
import { Pipeline, Values } from "../../controllers";
import { Summary } from "./";
import { formatQueryTime } from "./Summary";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const pipeline = new Pipeline("", "");
  const values = new Values();
  ReactDOM.render(<Summary pipeline={pipeline} values={values} />, div);
});

test("formatQueryTime", () => {
  const cases = [
    [undefined, ""],
    ["3s", "3s"],
    ["015s", "15s"],
    ["0.00412s", "0.004s"],
    ["0.00400s", "0.004s"],
    ["0.00912s", "0.009s"],
    ["0.412s", "0.4s"],
    ["1.00s", "1s"],
    ["5.00412s", "5.004s"],
    ["50.00412s", "50.004s"]
  ];

  cases.forEach(([value, expected]) => {
    expect(formatQueryTime(value)).toBe(expected);
  });
});
