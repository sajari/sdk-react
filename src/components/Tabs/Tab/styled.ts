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

  ({ theme, isSelected }) =>
    isSelected
      ? {
          // @ts-ignore
          color: idx(theme, _ => _.colors.brand.primary) || "#333",
          borderBottom: "3px solid"
        }
      : {
          borderBottom: "3px solid transparent",
          "&:hover": {
            // @ts-ignore
            color: idx(theme, _ => _.colors.brand.primary) || "#333"
          }
        },
  override
);
