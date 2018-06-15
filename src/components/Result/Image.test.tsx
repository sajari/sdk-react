import { mount } from "enzyme";
import * as React from "react";

import { Image } from "./Image";

test("Image default render", () => {
  const wrapper = mount(<Image alt="" src="" />);

  expect(wrapper.state()).toEqual({ error: false });
  expect(wrapper.closest(Image).getDOMNode().nodeName).toBe("IMG");
});

test("Image error render", () => {
  const wrapper = mount(<Image alt="" src="" />);
  wrapper.setState({ error: true });

  expect(wrapper.state()).toEqual({ error: true });
  expect(wrapper.getDOMNode().nodeName).toBe("DIV");
});
