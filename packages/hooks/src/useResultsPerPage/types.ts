export interface UseResultsPerPageResult {
  /** The number of results per page */
  resultsPerPage: number;
  /** Set the number of results per page */
  setResultsPerPage: (size: number) => void;
}
