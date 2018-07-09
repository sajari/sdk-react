import { css } from "emotion";
import idx from "idx";
import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../styles";

import { Container as ResultContainer } from "../Result/styled";

export const Error = styled("div")({ color: "red" }, override);

export interface ContainerProps extends StyledProps<HTMLOListElement> {}

export const Container = styled("ol")<ContainerProps>(
  {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    margin: 0,
    padding: 0,
    width: "100%"
  },
  override
);

export interface ResultItemProps extends StyledProps<HTMLLIElement> {}

const gridItem = css({
  boxSizing: "border-box",
  padding: "0.5em",
  width: "25%"
});

export const ResultItem = styled("li")<ResultItemProps>(
  {
    marginBottom: "1.5em",
    width: "100%"
  },
  ({ theme }) =>
    // @ts-ignore: idx
    (idx(theme, _ => _.layout.type) || "list") === "grid" ? gridItem : {},
  override
);
