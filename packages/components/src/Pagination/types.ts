import { BoxProps } from '../Box';

export interface PaginationProps extends BoxProps {
  /** The total number of pages */
  pageCount?: number;
  /** The total number of results (used to calculate page count if not set) */
  totalResults?: number;
  /** The number of results per page (used to calculate page count if not set) */
  pageSize?: number;
  /** The current page */
  page: number;
  /** Callback for handling page change */
  onChange: (page: number) => void;
  /** How to align the pagination */
  align?: 'left' | 'center' | 'right';
  /** Internationalization */
  i18n?: {
    label?: string;
    previous?: string;
    next?: string;
    page?: string;
    current?: string;
  };
  /** The classname for button */
  buttonClassName?: string;
  /** The classname for next button */
  nextClassName?: string;
  /** The classname for previous button */
  prevClassName?: string;
  /** The classname for ellipsis spacer */
  spacerEllipsisClassName?: string;
  /** The classname for current page */
  activeClassName?: string;
}
