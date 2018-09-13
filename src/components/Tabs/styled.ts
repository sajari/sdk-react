import { override, styled, StyledProps } from "../styles";

export const Container = styled("div")<StyledProps<HTMLDivElement>>(
  {
    borderBottom: "1px solid #ebebeb",
    color: "#777",
    marginBottom: "1em",
    width: "100%"
  },
  override
);

export const TabsContainer = styled("div")({
  overflow: "auto",
  whiteSpace: "nowrap"
});
