import { BoxProps, PaginationProps as PurePaginationProps } from '@sajari/react-components';

export interface PaginationProps extends BoxProps {
  /** How to align the pagination */
  align?: PurePaginationProps['align'];
}
