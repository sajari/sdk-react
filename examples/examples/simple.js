import React, { Fragment, Component } from "react";

import {
  Pipeline,
  Values,
  NoTracking,
  Provider,
  Input,
  Results,
  Summary,
  Paginator,
  EVENT_VALUES_UPDATED
} from "sajari-react";

const pipeline = new Pipeline(
  "sajariptyltd",
  "sajari-com",
  "website",
  new NoTracking()
);
const values = new Values();

// Any change to values should reset the paginator back to page 1
values.listen(EVENT_VALUES_UPDATED, (changes, set) => {
  if (!changes.page) {
    set({ page: "1" });
  }
});

export default () => (
  <Provider search={{ pipeline, values }}>
    <Input />

    <Summary />
    <Results />
    <Paginator />
  </Provider>
);
