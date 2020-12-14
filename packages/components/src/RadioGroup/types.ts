import React from 'react';

import { BoxProps } from '../Box';
import { Spacing } from '../hooks';

interface Props extends BoxProps {
  name?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  spacing?: Spacing;
  inline?: boolean;
}

export interface RadioGroupProps
  extends Props,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {}
