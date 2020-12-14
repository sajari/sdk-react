import React, { HTMLAttributes } from 'react';

import { BoxProps } from '../../Box';

export interface TabListProps extends BoxProps, Omit<HTMLAttributes<HTMLDivElement>, 'display'> {
  onKeyDown?: React.KeyboardEventHandler;
  onClick?: React.MouseEventHandler;
}
