import idx from "idx";
import { override, styled } from "../../styles";

export interface ContainerProps {
  isSelected: boolean;
}

export const Container = styled("div")<ContainerProps>(
  {
    boxSizing: "border-box",
    cursor: "pointer",
    display: ["inline-block", "-moz-inline-stack"],
    fontSize: 16,
    margin: 0,
    padding: ".45em .9em .5em",
    userSelect: "none"
  },

  ({ theme, isSelected }) =>
    isSelected
      ? {
          borderBottom: "3px solid",
          // @ts-ignore: idx
          color: idx(theme, _ => _.colors.brand.primary) || "#333"
        }
      : {
          "&:hover": {
            // @ts-ignore: idx
            color: idx(theme, _ => _.colors.brand.primary) || "#333"
          },
          borderBottom: "3px solid transparent"
        },
  override
);
