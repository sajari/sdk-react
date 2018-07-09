import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../styles";

export const Container = styled("div")<StyledProps<HTMLDivElement>>(
  {
    marginBottom: "1em",
    width: "100%"
  },
  override
);
