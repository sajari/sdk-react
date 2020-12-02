import { BoxProps } from '@sajari/react-components';

export interface ResultsPerPageProps extends Omit<BoxProps, 'className'> {
  label?: string;
  sizes?: number[];
  size?: 'sm' | 'md' | 'lg';
}
