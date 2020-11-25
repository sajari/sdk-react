import { HTMLAttributes } from 'react';

import { BoxProps } from '../Box';
import { CheckboxProps } from '../Checkbox';
import { Spacing } from '../hooks';

export interface Props extends BoxProps {
  name?: string;
  defaultValue?: Array<CheckboxProps['value']>;
  value?: Array<CheckboxProps['value']>;
  onChange?: (value: Array<CheckboxProps['value']>) => void;
  spacing?: Spacing;
  inline?: boolean;
}

export interface CheckboxGroupProps extends Props, Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {}
