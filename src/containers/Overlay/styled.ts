import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../../components/styles";

export const BlurContainer = styled("div")({
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0
});

export const Container = styled("div")({
  backgroundColor: "#fff",
  boxSizing: "border-box",
  height: "80%",
  padding: "1em",
  width: "80%"
});
