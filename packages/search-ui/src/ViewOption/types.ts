import { BoxProps } from '@sajari/react-components';

export interface ViewOptionProps extends Omit<BoxProps, 'className'> {
  id: string;
  /** Text label to render */
  label?: string;
  /** Is the child an input */
  renderAsLabel?: boolean;
  /** The size of the label */
  size?: 'sm' | 'md' | 'lg';
  /** The classname for container */
  containerClassName?: string;
  /** The classname for label */
  labelClassName?: string;
  /** Whether to render label and control inline */
  inline?: boolean;
}
