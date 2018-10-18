import { mount } from "enzyme";
import * as React from "react";

import { TokenLink } from "./TokenLink";

test("Image default render", () => {
  const resultClickFn = jest.fn();
  const wrapper = mount(
    <TokenLink url={"test"} token={"token"} resultClicked={resultClickFn} />
  );

  expect(wrapper.state()).toEqual({ clicked: false });
});

test("Image onClick handler", () => {
  const resultClickFn = jest.fn();
  const wrapper = mount(
    <TokenLink url={"test"} token={"token"} resultClicked={resultClickFn} />
  );
  wrapper.find("a").simulate("mouseDown");
  expect(resultClickFn).toBeCalled();
  expect(wrapper.state()).toEqual({ clicked: true });
  expect(wrapper.find("a").prop("href")).toEqual("token");
});
