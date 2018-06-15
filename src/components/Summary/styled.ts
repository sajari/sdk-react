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
    color: "#808080",
    fontSize: "small",
    marginBottom: "1.5em"
  },
  override
);

export const Emphasis = styled("strong")(
  { color: "#808080" },

  ({ theme }) => ({
    // @ts-ignore: idx
    color: idx(theme, _ => _.colors.brandPrimary) || "#808080"
  }),
  override
);

export const OverrideContainer = styled<StyledProps<HTMLSpanElement>, "span">(
  "span"
)(override);
