import * as React from 'react';

import { BoxProps } from '../Box';
import { UseFontSizeParams } from '../hooks';

export type TextElement =
  | 'small'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'pre'
  | 'code'
  | 'em'
  | 'i'
  | 'u'
  | 'cite'
  | 'del'
  | 'ins'
  | 'mark'
  | 's'
  | 'samp'
  | 'sub'
  | 'sup'
  | 'strong';

export interface TextProps extends BoxProps {
  /** Set the element that the text should render as */
  children?: React.ReactNode;
  /** Whether to truncate the text. Specify a number will use line-clamp */
  truncate?: boolean | 2 | 3 | 4 | 5;
  /** Specify the size of the type */
  size?: UseFontSizeParams['size'];
}
