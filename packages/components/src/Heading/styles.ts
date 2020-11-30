import { css } from '@emotion/core';
import tw from 'twin.macro';

import { TextSizes } from '../hooks';
import { mapTruncateValue } from '../utils/styles';
import { HeadingElements } from './types';

interface UseHeadingStylesOptions {
  as: HeadingElements;
  size?: TextSizes;
  truncate?: boolean | 2 | 3 | 4 | 5;
}

export default function useHeadingStyles(options: UseHeadingStylesOptions) {
  const { size, truncate = false } = options;
  const styles = [tw`p-0 m-0`, mapTruncateValue(truncate), size === 'xs' ? tw`text-gray-400` : tw`text-gray-800`];

  if (size === 'xs') {
    styles.push(tw`font-medium tracking-wide uppercase`);
  } else {
    styles.push(tw`font-semibold normal-case`);
  }

  if (size !== 'xs' && size !== 'sm' && size !== 'base') {
    styles.push(tw`tracking-tight`);
  }

  return css(styles);
}
