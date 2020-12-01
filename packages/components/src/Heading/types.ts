import { HTMLAttributes } from 'react';

import { BoxProps } from '../Box';
import { TextSizes } from '../hooks';

export type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends BoxProps, HTMLAttributes<HTMLHeadingElement> {
  /** The size variant */
  size?: TextSizes;
  /** Whether to truncate the text. Specify a number will use line-clamp */
  truncate?: boolean | 2 | 3 | 4 | 5;
}
