import { BoxProps } from '@sajari/react-components';

export interface ViewTypeProps extends BoxProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}
