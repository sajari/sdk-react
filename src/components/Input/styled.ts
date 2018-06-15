import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../styles";

export const Container = styled<StyledProps<HTMLDivElement>, "div">("div")(
  {
    marginBottom: "1em",
    width: "100%"
  },
  override
);
