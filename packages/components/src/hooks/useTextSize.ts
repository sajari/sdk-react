import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

export type TextSizes = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

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

    case 'xl':
      styles.push(tw`text-xl`);
      break;
    case '2xl':
      styles.push(tw`text-2xl`);
      break;

    case '3xl':
      styles.push(tw`text-3xl`);
      break;

    case '4xl':
      styles.push(tw`text-4xl`);
      break;

    case 'base':
    case 'md':
    default:
      styles.push(tw`text-base`);
      break;
  }

  return css(styles);
}
