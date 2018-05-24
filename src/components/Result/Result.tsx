import idx from "idx";
import * as React from "react";

import { Consumer } from "../context";
import { ResultClickedFn } from "../context/pipeline/context";
import { TokenLink } from "./TokenLink";

import { Container, Description, Title, URL } from "./styled";
import { Image } from "./Image";

export interface IResultProps {
  token: string;
  values: { [k: string]: string | string[] };
  resultClicked: ResultClickedFn;
  score?: number;
  indexScore?: number;
  showImage?: boolean;

  styles?: IResultStyles | null;
}

export interface IResultStyles {
  container?: React.CSSProperties;
  title?: React.CSSProperties;
  description?: React.CSSProperties;
  url?: React.CSSProperties;
}

export class Result extends React.Component<IResultProps> {
  public render() {
    const { token, values, resultClicked, showImage = false } = this.props;
    let styles = this.props.styles;
    if (styles === null || styles === undefined) {
      styles = {};
    }

    return (
      <Container showImage={showImage} styles={idx(styles, _ => _.container)}>
        {showImage && (
          <div>
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
        )}
        <div>
          <Title styles={idx(styles, _ => _.title)}>
            <TokenLink
              token={token}
              url={values.url as string}
              text={values.title as string}
              resultClicked={resultClicked}
            />
          </Title>
          <Description styles={idx(styles, _ => _.description)}>
            {values.description as string}
          </Description>
          <URL styles={idx(styles, _ => _.url)}>
            <TokenLink
              token={token}
              url={values.url as string}
              resultClicked={resultClicked}
            />
          </URL>
        </div>
      </Container>
    );
  }
}
