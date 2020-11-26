export interface PaginationProps {
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
}
