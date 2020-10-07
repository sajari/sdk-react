import { HTMLAttributes } from 'react';

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  disabled?: boolean;
}
