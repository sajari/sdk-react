/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import classnames from "classnames";
import * as React from "react";

export interface ImageProps {
  alt: string;
  src: string;
  className?: string;
}

const imageStyles = {
  minWidth: 90,
  minHeight: 90,
  width: 90,
  height: 90,
  marginRight: "1em",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat"
};

export function Image(props: ImageProps) {
  const { src } = props;

  return (
    <div
      role="presentation"
      css={[imageStyles, { backgroundImage: `url(${src})` }]}
      className={classnames("sj-results__result__image", props.className)}
    />
  );
}
