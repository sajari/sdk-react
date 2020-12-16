import * as React from 'react';

import { BoxProps } from '../Box';

interface Props extends BoxProps {
  /** The state when entering an invalid input */
  invalid?: boolean;
  labelClassName?: string;
  /** Specify the label's font size */
  fontSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export interface RadioProps extends Props, React.InputHTMLAttributes<HTMLInputElement> {}
