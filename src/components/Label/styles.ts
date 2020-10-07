import { css } from '@emotion/core';
import tw from 'twin.macro';
import { LabelProps } from '.';

export default function useLabelStyles({ visuallyHidden }: LabelProps) {
  const styles = [];

  if (visuallyHidden) {
    styles.push(tw`sr-only`);
  } else {
    styles.push(tw`inline-flex items-center cursor-pointer`);
  }

  return css(styles);
}
