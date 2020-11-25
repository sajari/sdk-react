import { BoxProps } from '@sajari/react-components';

export interface PageSizeProps extends BoxProps {
  label?: string;
  sizes?: number[];
  size?: 'sm' | 'md' | 'lg';
}
