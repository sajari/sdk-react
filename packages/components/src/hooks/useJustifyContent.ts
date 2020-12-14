import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

export type Align = 'left' | 'center' | 'right';

export interface UseAlignParams {
  align?: Align;
}

export default function useJustifyContent({ align }: UseAlignParams) {
  const styles: TwStyle[] = [];

  switch (align) {
    case 'left':
      styles.push(tw`justify-start`);
      break;

    case 'center':
      styles.push(tw`justify-center`);
      break;

    default:
    case 'right':
      styles.push(tw`justify-end`);
      break;
  }

  return css(styles);
}
