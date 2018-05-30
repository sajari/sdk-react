import idx from "idx";
import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../styles";

export interface ContainerProps extends StyledProps<HTMLDivElement> {}

export const Container = styled<ContainerProps, "div">("div")(
  {
    color: "#aaa",
    fontSize: "small",
    marginBottom: "1.5em"
  },
  override
);

export const Emphasis = styled("strong")(
  { color: "#aaa" },

  ({ theme }) => ({
    // @ts-ignore: idx
    color: idx(theme, _ => _.colors.brandPrimary) || "#aaa"
  }),
  override
);

export const OverrideContainer = styled<StyledProps<HTMLSpanElement>, "span">(
  "span"
)(override);
