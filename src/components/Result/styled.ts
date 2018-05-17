import idx from "idx";
import * as React from "react";
import {
  IStyledProps,
  ITheme,
  override,
  strip,
  styled,
  StyledComponent
} from "../styles";

const clean = strip([]);

interface IContainerProps extends IStyledProps<HTMLDivElement> {}

export const Container = clean(
  styled<IContainerProps, "div">("div")(
    {
      width: "100%"
    },

    // override styles
    override
  )
) as React.ComponentClass<IContainerProps>;

interface ILinkProps extends IStyledProps<HTMLAnchorElement> {}

export const Link = styled<ILinkProps, "a">("a")(
  {
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    }
  },

  // override styles
  override
);

interface ITitleProps extends IStyledProps<HTMLHeadingElement> {}

export const Title = clean(
  styled<ITitleProps, "h3">("h3")(
    {
      marginTop: 0,
      marginBottom: 0,
      fontSize: "1.1rem",
      fontWeight: 400,
      lineHeight: 1.1,
      color: "#333",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "hidden"
    },
    ({ theme }) => ({
      // @ts-ignore: hopefully this still works
      [Link]: {
        // @ts-ignore: If an intermediate property is either null or undefined, it is instead returned
        color: idx(theme, _ => _.colors.brand.primary) || "#333"
      }
    }),

    // override styles
    override
  )
) as React.ComponentClass<ITitleProps>;

interface IDescriptionProps extends IStyledProps<HTMLParagraphElement> {}

export const Description = clean(
  styled<IDescriptionProps, "p">("p")(
    {
      color: "#545454",
      fontSize: "0.85rem",
      lineHeight: 1.4,
      wordWrap: "break-word",
      overflowWrap: "break-word",
      marginTop: 2,
      marginBottom: 4
    },
    // override styles
    override
  )
);

interface IURLProps extends IStyledProps<HTMLParagraphElement> {}

export const URL = clean(
  styled<IDescriptionProps, "p">("p")(
    {
      color: "#a2a2a2",
      fontSize: 13,
      lineHeight: 1.4,
      margin: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",

      // @ts-ignore: hopefully this still works
      [Link]: {
        color: "#a2a2a2"
      }
    },
    // override styles
    override
  )
);
