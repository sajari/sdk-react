import React from 'react';
import { Spacing } from '../hooks/use-spacing';

interface Props {
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
