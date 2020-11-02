export type SortOption = {
  name: string;
  value: string;
};

export interface SortingProps {
  label?: string;
  options?: SortOption[];
}
