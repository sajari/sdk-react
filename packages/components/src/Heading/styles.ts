import { css } from '@emotion/core';
import tw from 'twin.macro';

import { mapTruncateValue } from '../utils/style-props';
import { HeadingElements, HeadingSizes } from './types';

const mapElementToSize = (element: HeadingElements): HeadingSizes => {
  switch (element) {
    case 'h6':
      return 'xs';
    case 'h5':
      return 'sm';
    case 'h4':
      return 'md';
    case 'h3':
      return 'lg';
    case 'h2':
      return 'xl';
    case 'h1':
      return '2xl';
    default:
      return 'base';
  }
};

interface UseHeadingStylesOptions {
  as: HeadingElements;
  size?: HeadingSizes;
  truncate?: boolean | 2 | 3 | 4 | 5;
}

export default function useHeadingStyles(options: UseHeadingStylesOptions) {
  const { as, size = mapElementToSize(as), truncate = false } = options;
  const styles = [mapTruncateValue(truncate), size === 'xs' ? tw`text-gray-400` : tw`text-gray-800`];

  if (size !== 'xs') {
    styles.push(tw`font-semibold tracking-tight`);
  }

  switch (size) {
    case '2xl':
      styles.push(tw`text-4xl lg:text-5xl`);
      break;

    case 'xl':
      styles.push(tw`text-3xl lg:text-4xl`);
      break;

    case 'lg':
      styles.push(tw`text-2xl lg:text-3xl`);
      break;

    case 'md':
      styles.push(tw`text-lg lg:text-2xl`);
      break;

    case 'sm':
      styles.push(tw`text-base lg:text-lg`);
      break;

    case 'base':
      styles.push(tw`text-base`);
      break;

    case 'xs':
      styles.push(tw`text-xs font-medium uppercase tracking-wide`);
      break;

    default:
      break;
  }

  return css(styles);
}
