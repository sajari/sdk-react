import idx from "idx";
import * as React from "react";
import {
  IStyledProps,
  ITheme,
  override,
  strip,
  styled,
  StyledComponent
} from "../../styles";

export interface IContainerProps {
  isSelected: boolean;
}

export const Container = styled<IContainerProps, "div">("div")(
  {
    display: "inline-block",
    boxSizing: "border-box",
    fontSize: 16,
    cursor: "pointer",
    margin: 0,
    padding: ".45rem .9rem .5rem",
    userSelect: "none"
  },
  props =>
    props.isSelected
      ? {
          color: " #333",
          borderBottom: "3px solid #333"
        }
      : {
          borderBottom: "3px solid transparent"
        }
);
