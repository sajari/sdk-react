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
    fontSize: 16,
    cursor: "pointer",
    margin: 0,
    padding: ".9em",
    userSelect: "none"
  },
  props =>
    props.isSelected
      ? {
          color: " #333",
          borderBottom: "3px solid #333"
        }
      : {}
);
