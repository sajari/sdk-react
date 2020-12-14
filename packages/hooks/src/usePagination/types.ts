export interface UsePaginationResult {
  /** The number of pages */
  pageCount: number;
  /** The total number of results */
  totalResults: number;
  /** The number of results per page */
  resultsPerPage: number;
  /** The current page */
  page: number;
  /** A method for setting the page */
  setPage: (pageNum: number) => void;
  /** A boolean to determine if there is a next page */
  hasNext: boolean;
  /** A boolean to determine if there is a previous page */
  hasPrevious: boolean;
  /** Go to next page */
  nextPage: () => void;
  /** Go to the previous page */
  previousPage: () => void;
}
