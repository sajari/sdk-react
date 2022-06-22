export interface UseResultsPerPageResult {
  /** The default number of results per page */
  defaultResultsPerPage: number;
  /** The number of results per page */
  resultsPerPage: number;
  /** Set the number of results per page */
  setResultsPerPage: (size: number) => void;
}
