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

export const Container = styled("div")({
  marginBottom: "1.5em",
  color: "#aaa"
});

export const Emphasis = styled("strong")(
  {
    color: "#aaa"
  },

  ({ theme }) => ({
    // @ts-ignore
    color: idx(theme, _ => _.colors.brandPrimary) || "#aaa"
  }),
  override
);
