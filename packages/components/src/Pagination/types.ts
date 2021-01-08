import { BoxProps } from '../Box';

export interface PaginationProps extends BoxProps {
  /** ISO language code to use for i18n and formatting (e.g. en or en-US). Defaults to browser language. */
  language?: string;
  /** The total number of pages */
  pageCount?: number;
  /** The total number of results (used to calculate page count if not set) */
  totalResults?: number;
  /** The number of results per page (used to calculate page count if not set) */
  resultsPerPage?: number;
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
  /** The classname for status in compact view */
  statusClassName?: string;
  /** The classname for current page */
  activeClassName?: string;
  /** Scroll to specific target */
  scrollTarget?: string | Element;
  /** Enable scrolling */
  scrollToTop?: boolean;
  /** Force compact view (otherwise it's automatic) */
  compact?: boolean;
}
