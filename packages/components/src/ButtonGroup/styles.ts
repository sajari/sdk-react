/* eslint-disable no-nested-ternary */
import { css } from '@emotion/core';
import tw from 'twin.macro';

import { UseButtonGroupStylesParams } from './types';

export function useButtonGroupStyles({ attached, inline }: UseButtonGroupStylesParams) {
  const styles = [tw`inline-flex items-center`];

  styles.push(inline ? tw`flex-row space-x-4` : tw`flex-col space-y-2`);

  if (attached) {
    styles.push(inline ? tw`-space-x-px` : tw`-space-y-px`);
  }

  return css(styles);
}
