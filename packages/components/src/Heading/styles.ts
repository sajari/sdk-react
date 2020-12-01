import { mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { TextSizes, useTextSize } from '../hooks';
import { mapTruncateValue } from '../utils/styles';
import { HeadingElements } from './types';

interface UseHeadingStylesOptions {
  as: HeadingElements;
  size?: TextSizes;
  truncate?: boolean | 2 | 3 | 4 | 5;
}

export default function useHeadingStyles(options: UseHeadingStylesOptions) {
  const { size, truncate = false } = options;
  const sizeStyles = useTextSize({ size });

  const styles = {
    container: [
      tw`p-0 m-0`,
      mapTruncateValue(truncate),
      size === 'xs' ? tw`text-gray-400` : tw`text-gray-800`,
      sizeStyles,
    ],
  };

  if (size === 'xs') {
    styles.container.push(tw`font-medium tracking-wide uppercase`);
  } else {
    styles.container.push(tw`font-semibold normal-case`);
  }

  if (size !== 'xs' && size !== 'sm' && size !== 'base') {
    styles.container.push(tw`tracking-tight`);
  }

  return mapStyles(styles);
}
