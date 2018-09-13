import idx from "idx";
import * as React from "react";

import { ResultClickedFn } from "../context/pipeline/context";
import { TokenLink } from "./TokenLink";

import { Image } from "./Image";
import { Container, Description, Title, URL } from "./styled";

export interface ResultProps {
  token: string;
  values: { [k: string]: string | string[] };
  resultClicked: ResultClickedFn;
  score?: number;
  indexScore?: number;
  showImage?: boolean;
  itemIndex?: number;

  styles?: ResultStyles | null;
}

export interface ResultStyles {
  container?: React.CSSProperties;
  title?: React.CSSProperties;
  description?: React.CSSProperties;
  url?: React.CSSProperties;
}

export class Result extends React.Component<ResultProps> {
  public render() {
    const { token, values, resultClicked, showImage = false } = this.props;
    let styles = this.props.styles;
    if (styles === null || styles === undefined) {
      styles = {};
    }

    const Body = (
      <React.Fragment>
        <Title
          className={"sj-result__title"}
          styles={idx(styles, _ => _.title)}
        >
          <TokenLink
            token={token}
            url={values.url as string}
            text={values.title as string}
            resultClicked={resultClicked}
          />
        </Title>
        <Description
          className={"sj-result__description"}
          styles={idx(styles, _ => _.description)}
        >
          {values.description as string}
        </Description>
        <URL className={"sj-result__url"} styles={idx(styles, _ => _.url)}>
          <TokenLink
            token={token}
            url={values.url as string}
            resultClicked={resultClicked}
          />
        </URL>
      </React.Fragment>
    );

    return (
      <Container
        className="sj-result"
        showImage={showImage}
        styles={idx(styles, _ => _.container)}
      >
        {showImage && (
          <React.Fragment>
            <div className="sj-result__image">
              <TokenLink
                token={token}
                url={values.url as string}
                resultClicked={resultClicked}
              >
                <Image
                  src={values.image as string}
                  alt={values.title as string}
                />
              </TokenLink>
            </div>
            <div className="sj-result__text">{Body}</div>
          </React.Fragment>
        )}
        {!showImage && Body}
      </Container>
    );
  }
}
