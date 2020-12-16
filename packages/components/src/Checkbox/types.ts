import * as React from 'react';

import { BoxProps } from '../Box';

interface Props extends BoxProps {
  /** The state when entering an invalid input */
  invalid?: boolean;
  /** Indeterminate state  */
  indeterminate?: boolean;
  /** The classname for label */
  labelClassName?: string;
  /** Specify the label's font size */
  fontSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export interface CheckboxProps extends Props, React.InputHTMLAttributes<HTMLInputElement> {}
