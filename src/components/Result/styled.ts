import idx from "idx";
import { override, styled, StyledProps } from "../styles";

export interface ContainerProps extends StyledProps<HTMLDivElement> {
  showImage: boolean;
}

export const Container = styled("div")<ContainerProps>(
  {
    display: "flex",
    width: "100%"
  },
  ({ showImage }) =>
    showImage
      ? {
          alignItems: "center",
          flexDirection: "row"
        }
      : { flexDirection: "column" },

  // override styles
  override
);

export interface LinkProps extends StyledProps<HTMLAnchorElement> {}

export const Link = styled("a")<LinkProps>(
  {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    },
    textDecoration: "none"
  },

  // override styles
  override
);

export interface TitleProps extends StyledProps<HTMLHeadingElement> {}

export const Title = styled("h3")<TitleProps>(
  {
    fontSize: "1.1em",
    fontWeight: 400,
    lineHeight: 1.1,
    marginBottom: 0,
    marginTop: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  ({ theme }) => ({
    // @ts-ignore: idx
    color: idx(theme, _ => _.colors.brand.primary) || "#333",
    // @ts-ignore: fixed by babel-plugin-emotion
    [Link]: {
      // @ts-ignore: idx
      color: idx(theme, _ => _.colors.brand.primary) || "#333"
    }
  }),

  // override styles
  override
);

export interface DescriptionProps extends StyledProps<HTMLParagraphElement> {}

export const Description = styled("p")<DescriptionProps>(
  {
    color: "#545454",
    fontSize: "0.85em",
    lineHeight: 1.4,
    marginBottom: 4,
    marginTop: 2,
    overflowWrap: "break-word",
    wordWrap: "break-word"
  },
  // override styles
  override
);

export interface URLProps extends StyledProps<HTMLParagraphElement> {}

export const URL = styled("p")<URLProps>(
  {
    color: "#a2a2a2",
    fontSize: 13,
    lineHeight: 1.4,
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    // @ts-ignore: fixed by babel-plugin-emotion
    [Link]: {
      color: "#a2a2a2"
    }
  },
  ({ theme }) => ({
    // @ts-ignore: fixed by babel-plugin-emotion
    [Link]: {
      "&:hover": {
        // @ts-ignore
        color: idx(theme, _ => _.colors.brand.primary) || "#333"
      }
    }
  }),
  // override styles
  override
);
