/* eslint-disable no-nested-ternary */
import { css } from '@emotion/core';
import tw from 'twin.macro';
import { UseButtonGroupStylesParams } from './types';

export function useButtonGroupStyles({ attached, inline }: UseButtonGroupStylesParams) {
  const styles = [tw`inline-flex`];
  styles.push(inline ? tw`space-x-4 flex-row` : tw`space-y-2 flex-col`);
  styles.push(attached ? (inline ? tw`-space-x-px` : tw`-space-y-px`) : tw``);
  return css(styles);
}
