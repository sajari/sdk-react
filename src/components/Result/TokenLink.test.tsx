import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { TokenLink } from "./TokenLink";

test("TokenLink onMouseDown handler", () => {
  const onClickSpy = jest.fn();
  const { container } = render(
    <TokenLink
      url={"test"}
      token={{ click: "token" }}
      resultClicked={onClickSpy}
    />
  );
  const link = container.querySelector("a");
  fireEvent.mouseDown(link);
  expect(onClickSpy).toHaveBeenCalledTimes(1);
  expect(link).toHaveAttribute("href", "token");
});
