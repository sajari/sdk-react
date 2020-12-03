import { BoxProps } from '@sajari/react-components';

export interface ResultsPerPageProps extends Omit<BoxProps, 'className'> {
  label?: string;
  options?: number[];
  size?: 'sm' | 'md' | 'lg';
}
