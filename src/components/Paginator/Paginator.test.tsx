import { mount } from "enzyme";
import * as React from "react";

import { NoTracking, Pipeline, Values } from "../..";
import { Provider } from "../context/pipeline/Provider";
import { Paginator } from "./Paginator";

test("Paginator default render", () => {
  const pipeline = new Pipeline(
    { project: "", collection: "" },
    "website",
    new NoTracking()
  );
  const wrapper = mount(
    <Provider search={{ pipeline, values: new Values() }}>
      <Paginator />
    </Provider>
  );

  expect(
    wrapper
      .children()
      .closest(Paginator)
      .isEmptyRender()
  ).toBeTruthy();
});
