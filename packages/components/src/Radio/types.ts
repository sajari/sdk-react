import React from 'react';

import { BoxProps } from '../Box';

interface Props extends BoxProps {
  /** The state when entering an invalid input */
  invalid?: boolean;
  labelClassName?: string;
}

export interface RadioProps extends Props, React.InputHTMLAttributes<HTMLInputElement> {}
