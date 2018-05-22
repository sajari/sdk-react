import idx from "idx";
import * as React from "react";
import {
  IStyledProps,
  ITheme,
  override,
  strip,
  styled,
  StyledComponent
} from "../styles";

export const Container = styled("nav")({
  marginBottom: "1em",
  textAlign: "center"
});

export interface IPageNumberProps {
  isCurrent?: boolean;
}

export const PageNumber = styled<IPageNumberProps, "a">("a")(
  {
    display: "inline-block",
    padding: 10,
    fontWeight: "bold",
    cursor: "pointer",
    userSelect: "none"
  },
  ({ isCurrent: curr, theme }) => ({
    // @ts-ignore: idx
    color: curr ? idx(theme, _ => _.colors.brand.primary) || "#333" : "#777"
  }),
  override
);

export interface IPageButtonProps {
  isDisabled?: boolean;
}

export const PageButton = styled<IPageButtonProps, "button">("button")(
  {
    display: "inline-block",
    padding: 10,
    fontWeight: "bold",
    cursor: "pointer",
    userSelect: "none",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "1rem",
    "&:active, &:focus": {
      outline: "none"
    }
  },
  props => ({ color: props.isDisabled ? "#aaa" : "#777" })
);
