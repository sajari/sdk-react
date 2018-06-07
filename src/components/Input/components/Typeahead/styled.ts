import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../../../styles";

export const Container = styled<StyledProps<HTMLSpanElement>, "span">("span")(
  {
    color: "#bebebe",
    display: "inline",
    fontSize: "1em",
    marginLeft: -2,
    position: "relative"
  },
  override
);
