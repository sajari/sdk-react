import { css, cx } from "emotion";
import * as React from "react";

export interface ImageProps {
  alt: string;
  src: string;
}

export class Image extends React.PureComponent<ImageProps, { error: boolean }> {
  public static getDerivedStateFromProps(
    nextProps: ImageProps,
    prevState: { error: boolean }
  ) {
    const { src } = nextProps;
    if (src === undefined) {
      return { error: true };
    }
    return prevState;
  }

  public state = { error: false };

  public render() {
    const { alt, src } = this.props;
    const { error } = this.state;

    return error ? (
      <div
        className={cx(
          "sj-result__image",
          css({ width: 90, paddingRight: "1em" })
        )}
      />
    ) : (
      <img
        className={cx(
          "sj-result__image",
          css({ maxWidth: 90, maxHeight: 90, paddingRight: "1em" })
        )}
        onError={this.onError}
        src={src}
        alt={alt}
      />
    );
  }

  private onError = () => this.setState(state => ({ ...state, error: true }));
}
