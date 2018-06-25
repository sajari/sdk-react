import idx from "idx";
import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../styles";

export const Container = styled("nav")<StyledProps<HTMLElement>>(
  {
    marginBottom: "1em",
    textAlign: "center"
  },
  override
);

export interface PageNumberProps extends StyledProps<HTMLAnchorElement> {
  isCurrent?: boolean;
}

export const PageNumber = styled("a")<PageNumberProps>(
  {
    cursor: "pointer",
    display: "inline-block",
    fontWeight: "bold",
    padding: 10,
    userSelect: "none"
  },
  ({ isCurrent: curr, theme }) => ({
    // @ts-ignore: idx
    color: curr ? idx(theme, _ => _.colors.brand.primary) || "#333" : "#777"
  }),
  override
);

export interface PageButtonProps extends StyledProps<HTMLButtonElement> {
  isDisabled?: boolean;
}

export const PageButton = styled("button")<PageButtonProps>(
  {
    "&:active, &:focus": {
      outline: "none"
    },
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "1em",
    fontWeight: "bold",
    padding: 10,
    userSelect: "none"
  },
  props => ({ color: props.isDisabled ? "#aaa" : "#777" }),
  override
);
