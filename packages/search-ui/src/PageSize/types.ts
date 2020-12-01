import { BoxProps } from '@sajari/react-components';

export interface PageSizeProps extends Omit<BoxProps, 'className'> {
  label?: string;
  sizes?: number[];
  size?: 'sm' | 'md' | 'lg';
}
