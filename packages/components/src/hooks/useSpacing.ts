import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';

export type Spacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export interface SpacingParams {
  spacing?: Spacing;
  inline?: boolean;
}

export default function useSpacing({ spacing = '0', inline = false }: SpacingParams) {
  const styles: TwStyle[] = [];

  if (inline) {
    switch (spacing) {
      case '1':
        styles.push(tw`space-x-1`);
        break;
      case '2':
        styles.push(tw`space-x-2`);
        break;
      case '3':
        styles.push(tw`space-x-3`);
        break;
      case '4':
        styles.push(tw`space-x-4`);
        break;
      case '5':
        styles.push(tw`space-x-5`);
        break;
      case '6':
        styles.push(tw`space-x-6`);
        break;
      case '7':
        styles.push(tw`space-x-7`);
        break;
      case '8':
        styles.push(tw`space-x-8`);
        break;
      default:
        break;
    }
  } else {
    switch (spacing) {
      case '1':
        styles.push(tw`space-y-1`);
        break;
      case '2':
        styles.push(tw`space-y-2`);
        break;
      case '3':
        styles.push(tw`space-y-3`);
        break;
      case '4':
        styles.push(tw`space-y-4`);
        break;
      case '5':
        styles.push(tw`space-y-5`);
        break;
      case '6':
        styles.push(tw`space-y-6`);
        break;
      case '7':
        styles.push(tw`space-y-7`);
        break;
      case '8':
        styles.push(tw`space-y-8`);
        break;
      default:
        break;
    }
  }

  return css(styles);
}
