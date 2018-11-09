import { css, cx } from "emotion";
import * as React from "react";

export interface ImageProps {
  alt: string;
  src: string;

  className?: string;
}

const imageStyles = css({
  minWidth: 90,
  minHeight: 90,
  width: 90,
  height: 90,
  marginRight: "1em",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat"
});

export function Image(props: ImageProps) {
  const { src } = props;

  return (
    <div
      role="presentation"
      className={cx(
        "sj-results__result__image",
        props.className,
        imageStyles,
        css({ backgroundImage: `url(${src})` })
      )}
    />
  );
}
