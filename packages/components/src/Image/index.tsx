/** @jsx jsx */
import { jsx } from '@emotion/core';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import AspectRatio from '../AspectRatio';
import Box from '../Box';
import { ImageProps } from './types';
import { useImageStyles } from './useImageStyles';

interface NativeImageProps {
  htmlWidth?: ImageProps['htmlWidth'];
  htmlHeight?: ImageProps['htmlHeight'];
  alt?: ImageProps['alt'];
  loading?: ImageProps['loading'];
}

const NativeImage = React.forwardRef((props: NativeImageProps, ref?: React.Ref<HTMLImageElement>) => {
  const { htmlWidth, htmlHeight, alt = '', loading = 'lazy', ...rest } = props;

  return <img ref={ref} width={htmlWidth} height={htmlHeight} alt={alt} loading={loading} {...rest} />;
});

const Image = React.forwardRef((props: ImageProps, ref?: React.Ref<HTMLImageElement>) => {
  const { src, onError, onLoad, htmlWidth, htmlHeight, aspectRatio, objectFit, ...rest } = props;
  const imageProps = { src, onLoad, onError, htmlWidth, htmlHeight };
  const styles = useImageStyles(props);
  const image = <Box as={NativeImage} ref={ref} css={styles.image} {...imageProps} {...rest} />;

  return (
    <AspectRatio ratio={aspectRatio ?? null} css={styles.container}>
      {image}
    </AspectRatio>
  );
});

if (__DEV__) {
  Image.displayName = 'Image';
}

export default Image;
export type { ImageProps };
