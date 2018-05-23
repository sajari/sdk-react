import { css } from "emotion";
import * as React from "react";
import {
  IStyledProps,
  ITheme,
  override,
  strip,
  styled,
  StyledComponent
} from "../styles";

const iconSize = "1rem";

const size = {
  width: iconSize,
  height: iconSize,
  minHeight: iconSize,
  minWidth: iconSize
};

export const icon = css(size);

export interface IContainerProps extends IStyledProps<HTMLDivElement> {
  isSelected: boolean;
}

export const Container = styled<IContainerProps, "div">("div")(
  {
    display: "inline-block",
    cursor: "pointer",
    "&:hover": {
      color: "#333"
    }
  },
  ({ isSelected }) => ({ color: isSelected ? "blue" : "#999" }),
  size,
  override
);

export const HiddenInput = styled("input")({
  border: 0,
  clip: "rect(1px, 1px, 1px, 1px)",
  height: 1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
  opacity: 0
});
