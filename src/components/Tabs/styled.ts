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
  borderBottom: "1px solid #ebebeb",
  color: "#777",
  width: "100%",
  marginBottom: "1em"
});

export const TabsContainer = styled("div")({
  overflow: "auto",
  whiteSpace: "nowrap"
});
