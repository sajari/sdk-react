import { css } from "emotion";
import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../styles";

export interface ContainerProps extends StyledProps<HTMLDivElement> {
  isSelected: boolean;
}

export const Container = styled("div")<ContainerProps>(
  {
    "&:hover": {
      color: "#333"
    },
    cursor: "pointer",
    display: ["inline-block", "-moz-inline-stack"]
  },
  override
);

export const HiddenInput = styled("input")({
  border: 0,
  clip: "rect(1px, 1px, 1px, 1px)",
  height: 1,
  opacity: 0,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1
});

export const NativeInput = styled("input")({
  cursor: "pointer"
});
