import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

export type TextSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface UseTextSizeParams {
  size?: TextSizes;
}

export default function useTextSize(props: UseTextSizeParams) {
  const { size } = props;
  const styles: TwStyle[] = [];

  switch (size) {
    case 'xs':
      styles.push(tw`text-xs`);
      break;

    case 'sm':
      styles.push(tw`text-sm`);
      break;

    case 'lg':
      styles.push(tw`text-lg`);
      break;

    case 'md':
      styles.push(tw`text-base`);
      break;

    default:
      break;
  }

  return css(styles);
}
