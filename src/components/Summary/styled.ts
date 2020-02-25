import { override, styled, StyledProps } from "../styles";

export interface ContainerProps extends StyledProps<HTMLDivElement> {}

export const Container = styled("div")<ContainerProps>(
  {
    color: "#808080",
    fontSize: "small",
    marginBottom: "1.5em"
  },
  override
);

export const Emphasis = styled("strong")(
  { color: "#808080" },

  ({ theme }) => ({
    color: (theme.colors?.brandPrimary ?? "#808080") as any
  }),
  override
);

export const OverrideContainer = styled("span")<StyledProps<HTMLSpanElement>>(
  override
);
