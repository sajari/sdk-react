import { css } from "emotion";
import idx from "idx";
import * as React from "react";
import {
  IStyledProps,
  ITheme,
  override,
  styled,
  StyledComponent
} from "../styles";

import { Container as ResultContainer } from "../Result/styled";

export const Error = styled("div")(
  {
    color: "red"
  },
  override
);

export interface IContainerProps extends IStyledProps<HTMLOListElement> {}

export const Container = styled<IContainerProps, "ol">("ol")(
  {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    listStyle: "none",
    margin: 0,
    padding: 0
  },
  override
);

export interface IResultItemProps extends IStyledProps<HTMLLIElement> {}

const gridItem = css({
  boxSizing: "border-box",
  width: "25%",
  padding: "0.5rem"
});

export const ResultItem = styled<IResultItemProps, "li">("li")(
  {
    width: "100%",
    marginBottom: "1.5rem"
  },
  ({ theme }) =>
    // @ts-ignore: idx
    (idx(theme, _ => _.layout.type) || "list") === "grid" ? gridItem : {},
  override
);
