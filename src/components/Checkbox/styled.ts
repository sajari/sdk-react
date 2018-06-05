import { css } from "emotion";
import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../styles";

const iconSize = "1em";

const size = {
  height: iconSize,
  minHeight: iconSize,
  minWidth: iconSize,
  width: iconSize
};

export const icon = css(size);

export interface ContainerProps extends StyledProps<HTMLDivElement> {
  isSelected: boolean;
}

export const Container = styled<ContainerProps, "div">("div")(
  {
    "&:hover": {
      color: "#333"
    },
    cursor: "pointer",
    display: "inline-block"
  },
  ({ isSelected }) => ({ color: isSelected ? "blue" : "#999" }),
  size,
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
