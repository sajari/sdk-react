import React from 'react';

export type TextElements =
  | 'small'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'figcaption'
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

export interface Props {
  /** Set the element that the text should render as */
  as?: TextElements;
  children?: React.ReactNode;
  /** Whether to truncate the text. Specify a number will use line-clamp */
  truncate?: boolean | 2 | 3 | 4 | 5;
}
