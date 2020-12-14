import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

export type FontSizes = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface UseFontSizeParams {
  size?: FontSizes;
}

export default function useFontSize(props: UseFontSizeParams) {
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
      styles.push(tw`text-base`);
      break;

    default:
      break;
  }

  return css(styles);
}
