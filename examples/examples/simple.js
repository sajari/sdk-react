import React, { Fragment, Component } from "react";

import {
  Pipeline,
  Values,
  NoTracking,
  Provider,
  Input,
  Results,
  Summary,
  Paginator
} from "sajari-react";

const pipeline = new Pipeline(
  "sajariptyltd",
  "sajari-com",
  "website",
  new NoTracking()
);
const values = new Values();

export default () => (
  <Provider search={{ pipeline, values }}>
    <Input />

    <Summary />
    <Results />
    <Paginator />
  </Provider>
);
