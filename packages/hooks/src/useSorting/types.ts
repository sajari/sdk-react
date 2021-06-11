export interface UseSortingResult {
  sorting: string;
  setSorting: (order: string, runSearch?: boolean) => void;
}
