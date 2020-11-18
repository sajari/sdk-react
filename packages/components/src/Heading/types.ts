import { HTMLAttributes } from 'react';

export type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSizes = '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm' | 'xs';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Set the element that the text should render as */
  as?: HeadingElements;
  /** The size variant */
  size?: HeadingSizes;
  /** Whether to truncate the text. Specify a number will use line-clamp */
  truncate?: boolean | 2 | 3 | 4 | 5;
}
