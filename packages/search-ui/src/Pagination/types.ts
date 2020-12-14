import { BoxProps, PaginationProps as PurePaginationProps } from '@sajari/react-components';

export interface PaginationProps extends BoxProps {
  /** How to align the pagination */
  align?: PurePaginationProps['align'];
  /** Enable scrolling */
  scrollToTop?: PurePaginationProps['scrollToTop'];
  /** Scroll to specific target */
  scrollTarget?: PurePaginationProps['scrollTarget'];
}
