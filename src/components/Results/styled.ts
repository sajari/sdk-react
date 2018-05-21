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

export const Error = styled("div")(
  {
    color: "red"
  },
  override
);

export interface IContainerProps extends IStyledProps<HTMLDivElement> {}

export const Container = styled<IContainerProps, "div">("div")(
  {
    width: "100%",

    "& > *": {
      marginTop: "1.5em"
    },

    "& > :first-child": {
      marginTop: 0
    }
  },
  override
);
