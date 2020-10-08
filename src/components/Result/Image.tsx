/** @jsx jsx */ jsx;
import { CSSObject, jsx } from '@emotion/core';
import classnames from 'classnames';
import * as React from 'react';

export interface ImageProps {
  alt: string;
  src: string;
  className?: string;
}

const imageStyles: CSSObject = {
  minWidth: 90,
  minHeight: 90,
  width: 90,
  height: 90,
  marginRight: '1em',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
};

export function Image(props: ImageProps) {
  const { src } = props;
  const styles = [imageStyles];
  if (src) {
    styles.push({ backgroundImage: `url(${src})` });
  }

  return <div role="presentation" css={styles} className={classnames('sj-results__result__image', props.className)} />;
}
