import { HTMLAttributes } from 'react';
import { Spacing } from '../hooks/use-spacing';
import { CheckboxProps } from '../Checkbox';

export interface Props {
  name?: string;
  defaultValue?: Array<CheckboxProps['value']>;
  value?: Array<CheckboxProps['value']>;
  onChange?: (value: Array<CheckboxProps['value']>) => void;
  spacing?: Spacing;
  inline?: boolean;
}

export interface CheckboxGroupProps extends Props, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {}
