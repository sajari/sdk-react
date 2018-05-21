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

export interface IContainerProps extends IStyledProps<HTMLDivElement> {}

export const Container = styled<IContainerProps, "div">("div")(
  {
    marginBottom: "1.5em",
    color: "#aaa",
    fontSize: "small"
  },
  override
);

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

export const OverrideContainer = styled<IStyledProps<HTMLSpanElement>, "span">(
  "span"
)(override);
