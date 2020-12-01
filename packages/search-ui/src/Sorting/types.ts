import { BoxProps } from '@sajari/react-components';

export type SortOption = {
  name: string;
  value: string;
};

export interface SortingProps extends BoxProps {
  label?: string;
  options?: SortOption[];
  size?: 'sm' | 'md' | 'lg';
}
