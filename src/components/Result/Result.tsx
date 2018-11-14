import { css, cx } from "emotion";
import { withTheme } from "emotion-theming";
import idx from "idx";
import * as React from "react";

import { ResultClickedFn } from "../context/pipeline/context";
import { Theme } from "../styles";
import { Image } from "./Image";
import { TokenLink } from "./TokenLink";
import { ClickToken, PosNegToken } from "@sajari/sdk-js";

export interface ResultProps {
  token: ClickToken | PosNegToken | undefined;
  values: { [k: string]: string | string[] };
  resultClicked: ResultClickedFn;
  score?: number;
  indexScore?: number;
  showImage?: boolean;

  theme?: Theme;
  styles?: ResultStyles | null;
  className?: string;
}

export interface ResultStyles {
  container?: React.CSSProperties;
  title?: React.CSSProperties;
  description?: React.CSSProperties;
  url?: React.CSSProperties;
}

export class Result extends React.Component<ResultProps> {
  public render() {
    const {
      token,
      values,
      resultClicked,
      showImage = false,
      theme
    } = this.props;
    let styles = this.props.styles;
    if (styles === null || styles === undefined) {
      styles = {};
    }

    const title = values.title;
    const description = values.description;
    const url = values.url;
    const img = values.image;

    const classNames = {
      container: cx(
        "sj-results__result",
        this.props.className,
        css(resultStyles.container),
        showImage && css({ flexDirection: "row" }),
        styles && styles.container && css(styles.container as any)
      ),
      img: css({ display: "inline-block" }),
      textContainer: cx("sj-result__text", css({ minWidth: 0 })),
      title: cx(
        "sj-results__result__title",
        css(resultStyles.title),
        styles && styles.title && css(styles.title as any),
        themeColor(theme),
        css({ "&:hover": themeColor(theme) })
      ),
      description: cx(
        "sj-results__result__description",
        css(resultStyles.description),
        styles && styles.description && css(styles.description as any)
      ),
      url: cx(
        "sj-results__result__link",
        css(resultStyles.link),
        styles && styles.url && css(styles.url as any),
        css({ "&:hover": themeColor(theme) })
      )
    };

    let clickToken = undefined;
    if (token !== undefined && "click" in token) {
      clickToken = token.click;
    }

    return (
      <div className={classNames.container}>
        {showImage && (
          <Image className={classNames.img} src={img as string} alt={""} />
        )}
        <div className={classNames.textContainer}>
          <TokenLink
            url={url as string}
            token={clickToken}
            resultClicked={resultClicked}
            className={classNames.title}
          >
            <h3>{title}</h3>
          </TokenLink>
          <p className={classNames.description}>{description}</p>
          <TokenLink
            url={url as string}
            token={clickToken}
            resultClicked={resultClicked}
            className={classNames.url}
          >
            {url}
          </TokenLink>
        </div>
      </div>
    );
  }
}

export default withTheme(Result);

const resultStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0
  },
  title: {
    display: "inline-block",
    width: "100%",
    color: "#383b48",
    "&:hover": {
      color: "#383b48"
    },
    "& > h3": {
      fontSize: "1.1em",
      lineHeight: 1.1,
      fontWeight: 400,
      marginBottom: 0,
      marginTop: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  },
  description: {
    fontSize: "0.85em",
    lineHeight: 1.69,
    marginBottom: 0,
    marginTop: 0,
    overflowWrap: "break-word",
    wordWrap: "break-word"
  },
  link: {
    display: "inline-block",
    width: "100%",
    fontSize: "0.75em",
    color: "#888991",
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    "&:hover": {
      color: "#22232b"
    }
  }
} as { [k: string]: any };

function themeColor(theme?: Theme): string {
  // @ts-ignore: idx
  return css({ color: idx(theme, _ => _.colors.brand.primary) || "inherit" });
}
