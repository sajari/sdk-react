import idx from "idx";
import { override, styled, StyledProps } from "../styles";
// @ts-ignore: module missing definitions
import chroma from "chroma-js";

export const Container = styled("nav")<StyledProps<HTMLElement>>(
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
    // marginBottom: "1em"
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
    userSelect: "none",
    width: 44,
    height: 44,
    textAlign: "center"
  },
  ({ isCurrent: curr, theme }) => {
    // @ts-ignore: idx
    const themeColor = idx(theme, _ => _.colors.brand.primary);

    const textColor =
      chroma.contrast("#fff", themeColor || "#333") > 4.5 ? "#fff" : "#000";

    return {
      borderRadius: 5,
      backgroundColor: curr ? themeColor || "#333" : "inherit",
      color: curr ? textColor : "#585858"
    };
  },
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
    userSelect: "none",
    width: 44,
    height: 44,
    textAlign: "center",
    lineHeight: 0
  },
  props => ({ color: props.isDisabled ? "#aaa" : "#777" }),
  override
);
