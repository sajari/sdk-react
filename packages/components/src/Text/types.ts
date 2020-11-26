import React from 'react';

import { UseTextSizeParams } from '../hooks/useTextSize';

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

export interface TextProps {
  children?: React.ReactNode;
  /** Whether to truncate the text. Specify a number will use line-clamp */
  truncate?: boolean | 2 | 3 | 4 | 5;
  /** Specify the size of the type */
  size?: UseTextSizeParams['size'];
}
