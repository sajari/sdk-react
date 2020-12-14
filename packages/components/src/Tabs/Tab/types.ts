import { HTMLAttributes } from 'react';

import { BoxProps } from '../../Box';

export interface TabProps extends BoxProps, HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  disabled?: boolean;
  selectedClassName?: string;
}
