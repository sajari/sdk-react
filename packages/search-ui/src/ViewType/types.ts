import { BoxProps } from '@sajari/react-components';

export interface ViewTypeProps extends Omit<BoxProps, 'className'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}
