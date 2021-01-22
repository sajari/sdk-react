import { BoxProps, PaginationProps as PurePaginationProps } from '@sajari/react-components';

export interface PaginationProps
  extends BoxProps,
    Pick<PurePaginationProps, 'align' | 'scrollToTop' | 'scrollTarget' | 'compact'> {}
