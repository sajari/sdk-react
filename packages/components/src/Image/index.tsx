/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';
import Box from '../Box';

import { __DEV__ } from '../utils/assertion';
import { ImageProps } from './types';

// TODO: Handle load failed fallback

interface HasImageLoadedProps {
  src?: ImageProps['src'];
  onLoad?: ImageProps['onLoad'];
  onError?: ImageProps['onError'];
}

interface NativeImageProps {
  htmlWidth?: ImageProps['htmlWidth'];
  htmlHeight?: ImageProps['htmlHeight'];
  alt?: ImageProps['alt'];
  loading?: ImageProps['loading'];
}

export function useHasImageLoaded(props: HasImageLoadedProps) {
  const { src, onLoad, onError } = props;
  const ref = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      return;
    }

    const image = new window.Image();

    image.onload = (event) => {
      if (ref.current) {
        setHasLoaded(true);

        if (onLoad) {
          // @ts-ignore
          onLoad(event);
        }
      }
    };

    image.onerror = (event) => {
      if (ref.current) {
        setHasLoaded(false);

        if (onError) {
          // @ts-ignore
          onError(event);
        }
      }
    };

    image.src = src;
  }, [src, onLoad, onError]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      ref.current = false;
    };
  }, []);

  return hasLoaded;
}

const NativeImage = React.forwardRef((props: NativeImageProps, ref?: React.Ref<HTMLImageElement>) => {
  const { htmlWidth, htmlHeight, alt = '', loading = 'lazy', ...rest } = props;

  return <img ref={ref} width={htmlWidth} height={htmlHeight} alt={alt} loading={loading} {...rest} />;
});

const Image = React.forwardRef((props: ImageProps, ref?: React.Ref<HTMLImageElement>) => {
  const { src, onError, onLoad, htmlWidth, htmlHeight, ...rest } = props;
  const imageProps = { src, onLoad, onError, htmlWidth, htmlHeight };
  const hasLoaded = useHasImageLoaded(imageProps);

  return (
    <Box
      as={NativeImage}
      ref={ref}
      css={[tw`duration-200 ease-in transition-opacity`, hasLoaded ? tw`opacity-100` : tw`opacity-0`]}
      {...imageProps}
      {...rest}
    />
  );
});

if (__DEV__) {
  Image.displayName = 'Image';
}

export default Image;
export type { ImageProps };
