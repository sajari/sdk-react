import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

export type RoundedSizes = 'sm' | 'md' | 'lg' | 'full' | 'none';

export interface BorderRadiusParams {
  rounded?: RoundedSizes;
}

export default function useBorderRadius(props: BorderRadiusParams) {
  const { rounded } = props;
  const styles: TwStyle[] = [];

  switch (rounded) {
    case 'none':
      styles.push(tw`rounded-none`);
      break;
    case 'sm':
      styles.push(tw`rounded-sm`);
      break;
    case 'lg':
      styles.push(tw`rounded-lg`);
      break;
    case 'full':
      styles.push(tw`rounded-full`);
      break;
    default:
    case 'md':
      styles.push(tw`rounded-md`);
      break;
  }

  return css(styles);
}
