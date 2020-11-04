import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

import { ImageProps } from './types';
import { useHasImageLoaded } from './useHasImageLoaded';

export function useImageStyles(props: ImageProps) {
  const hasLoaded = useHasImageLoaded(props);
  const styles: TwStyle[] = [tw`transition-opacity duration-200 ease-in`, hasLoaded ? tw`opacity-100` : tw`opacity-0`];

  switch (props.objectFit) {
    case 'contain':
      styles.push(tw`object-contain`);
      break;

    case 'cover':
      styles.push(tw`object-cover`);
      break;

    case 'fill':
      styles.push(tw`object-fill`);
      break;

    case 'scale-down':
      styles.push(tw`object-scale-down`);
      break;

    case 'none':
      styles.push(tw`object-none`);
      break;

    default:
      break;
  }

  return css(styles);
}
