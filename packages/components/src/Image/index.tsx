import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import AspectRatio from '../AspectRatio';
import Box from '../Box';
import { useImageStyles } from './styles';
import { ImageProps } from './types';

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
  const {
    src,
    hoverSrc,
    onError,
    onLoad,
    onMouseEnter: onMouseEnterExternal,
    onMouseLeave: onMouseLeaveExternal,
    htmlWidth,
    htmlHeight,
    aspectRatio,
    objectFit,
    className,
    containerClassName,
    disableDefaultStyles = false,
    ...rest
  } = props;
  const [hover, setHover] = React.useState(false);

  const onMouseEnter = (e) => {
    if (hoverSrc) {
      setHover(true);
    }
    onMouseEnterExternal?.(e);
  };

  const onMouseLeave = (e) => {
    if (hoverSrc) {
      setHover(false);
    }
    onMouseLeaveExternal?.(e);
  };

  const imageProps = {
    src,
    onLoad,
    onError,
    htmlWidth,
    htmlHeight,
    onMouseEnter,
    onMouseLeave,
  };

  const styles = getStylesObject(useImageStyles({ ...props, hover }), disableDefaultStyles);
  const image = <Box as={NativeImage} ref={ref} css={styles.image} {...imageProps} {...rest} />;
  const secondImage = React.cloneElement(image, { src: hoverSrc, css: styles.secondImage });

  return (
    <AspectRatio ratio={aspectRatio ?? null} css={styles.container} className={containerClassName}>
      <>
        {src ? image : null}
        {hoverSrc ? secondImage : null}
      </>
    </AspectRatio>
  );
});

if (__DEV__) {
  Image.displayName = 'Image';
}

export default Image;
export type { ImageProps };
