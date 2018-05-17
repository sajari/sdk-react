import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import App from "./containers/App";

import Simple from "./examples/simple";
import Standard from "./examples/standard";
import Dropdown from "./examples/dropdown";

const examples = [
  {
    to: "/simple",
    label: "Simple",
    component: Simple
  },
  {
    to: "/standard",
    label: "Standard",
    component: Standard
  },
  {
    to: "/dropdown",
    label: "Dropdown",
    component: Dropdown
  }
];

ReactDOM.render(
  <Router>
    <Fragment>
      <Route exact path="/" render={() => <Redirect to="/simple" />} />
      <App examples={examples} />
    </Fragment>
  </Router>,
  document.getElementById("root")
);
