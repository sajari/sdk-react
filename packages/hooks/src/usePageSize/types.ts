export interface UsePageSizeResult {
  /** The number of results per page */
  pageSize: number;
  /** Set the number of results per page */
  setPageSize: (size: number) => void;
}
