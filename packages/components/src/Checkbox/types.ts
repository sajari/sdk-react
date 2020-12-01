import React from 'react';

import { BoxProps } from '../Box';

interface Props extends BoxProps {
  /** The state when entering an invalid input */
  invalid?: boolean;
  /** Indeterminate state  */
  indeterminate?: boolean;
  /** The classname for label */
  labelClassName?: string;
}

export interface CheckboxProps extends Props, React.InputHTMLAttributes<HTMLInputElement> {}
