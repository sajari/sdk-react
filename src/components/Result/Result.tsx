import * as React from "react";
import idx from "idx";
import { cx, css } from "emotion";
import { withTheme } from "emotion-theming";

import { Theme } from "../styles";
import { ResultClickedFn } from "../context/pipeline/context";
import { TokenLink } from "./TokenLink";
import { Image } from "./Image";

export interface ResultProps {
  token: string;
  values: { [k: string]: string | string[] };
  resultClicked: ResultClickedFn;
  score?: number;
  indexScore?: number;
  showImage?: boolean;
  itemIndex?: number;

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

    let title = values["title"];
    let description = values["description"];
    let url = values["url"];
    let img = values["image"];

    let classNames = {
      container: cx(
        "sj-results__result",
        this.props.className,
        css(resultStyles.container),
        showImage && css({ flexDirection: "row" }),
        styles && styles.container && css(styles.container as any)
      ),
      imgLink: css({ display: "inline-block" }),
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
        "sj-result__result__link",
        css(resultStyles.link),
        styles && styles.url && css(styles.url as any),
        css({ "&:hover": themeColor(theme) })
      )
    };

    return (
      <div className={classNames.container}>
        {showImage && (
          <TokenLink
            url={url as string}
            token={token}
            resultClicked={resultClicked}
            className={classNames.imgLink}
          >
            <Image src={img as string} alt={""} />
          </TokenLink>
        )}
        <div className="sj-result__text">
          <TokenLink
            url={url as string}
            token={token}
            resultClicked={resultClicked}
            className={classNames.title}
          >
            <h3>{title}</h3>
          </TokenLink>
          <p className={classNames.description}>{description}</p>
          <TokenLink
            url={url as string}
            token={token}
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

let resultStyles = {
  container: {
    display: "flex",
    flexDirection: "column"
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
