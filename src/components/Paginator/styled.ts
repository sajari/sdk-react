import idx from "idx";
import { override, styled, StyledProps } from "../styles";

export const Container = styled("nav")<StyledProps<HTMLElement>>(
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1em"
  },
  override
);

export interface PageNumberProps extends StyledProps<HTMLAnchorElement> {
  isCurrent?: boolean;
}

export const PageNumber = styled("a")<PageNumberProps>(
  {
    cursor: "pointer",
    display: ["inline-block", "-moz-inline-stack"],
    fontWeight: "bold",
    padding: 10,
    userSelect: "none"
  },
  ({ isCurrent: curr, theme }) => ({
    // @ts-ignore: idx
    color: curr ? idx(theme, _ => _.colors.brand.primary) || "#333" : "#777"
  }),
  override
);

export interface PageButtonProps extends StyledProps<HTMLButtonElement> {
  isDisabled?: boolean;
}

export const PageButton = styled("button")<PageButtonProps>(
  {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    display: ["inline-block", "-moz-inline-stack"],
    fontSize: "1em",
    fontWeight: "bold",
    padding: 10,
    userSelect: "none"
  },
  props => ({ color: props.isDisabled ? "#aaa" : "#777" }),
  override
);
