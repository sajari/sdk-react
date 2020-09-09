import { override, styled, StyledProps } from "../styles";

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

const gridItem = {
  boxSizing: "border-box",
  padding: "0.5em",
  width: "25%"
};

export const ResultItem = styled("li")<ResultItemProps>(
  {
    marginBottom: "1.5em",
    width: "100%"
  },
  ({ theme }) => ((theme.layout?.type ?? "list") === "grid" ? gridItem : {}),
  override
);
