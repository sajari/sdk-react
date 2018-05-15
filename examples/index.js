import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from "./containers/App";

import Simple from "./examples/simple";

const examples = [
  {
    to: "/simple",
    label: "Simple",
    component: Simple
  }
];

ReactDOM.render(
  <Router>
    <App examples={examples} />
  </Router>,
  document.getElementById("root")
);
