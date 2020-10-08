import { css } from '@emotion/core';
import tw, { TwStyle } from 'twin.macro';
import { LabelProps } from './types';

export default function useLabelStyles({ visuallyHidden }: LabelProps) {
  const styles: TwStyle[] = [];

  if (visuallyHidden) {
    styles.push(tw`sr-only`);
  } else {
    styles.push(tw`inline-flex items-center cursor-pointer`);
  }

  return css(styles);
}
