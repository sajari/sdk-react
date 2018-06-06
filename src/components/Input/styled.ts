import * as React from "react";
import {
  StyledProps,
  StyledComponent,
  Theme,
  styled,
  override
} from "../styles";

export const Container = styled<StyledProps<HTMLDivElement>, "div">("div")(
  {
    marginBottom: "1em",
    width: "100%"
  },
  override
);
